#!/usr/bin/env node
// scripts/translate-descriptions.js
// Translate existing `description` (assumed French) -> `description_en` using OpenAI.
// Requires OPENAI_API_KEY in environment or in .env.local
// Usage (PowerShell):
// $env:OPENAI_API_KEY="sk-..."; node .\scripts\translate-descriptions.js
// or ensure OPENAI_API_KEY is set in .env.local and run:
// node .\scripts\translate-descriptions.js

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

const RATE_MS = Number(process.env.TRANSLATE_RATE_MS || 500) // delay between requests
const MAX_BATCH = Number(process.env.TRANSLATE_BATCH_SIZE || 50) // limit docs processed

async function translateText(text) {
  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY
  const HF_MODEL = process.env.HUGGINGFACE_MODEL || process.env.HF_MODEL

  // Try Hugging Face Inference API first (if key+model provided)
  if (HF_API_KEY && HF_MODEL) {
    try {
      const hfEndpoint = `https://api-inference.huggingface.co/models/${encodeURIComponent(HF_MODEL)}`
      const resp = await fetch(hfEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { temperature: 0.2, max_new_tokens: 400 },
        }),
      })

      if (!resp.ok) {
        const txt = await resp.text().catch(() => '')
        throw new Error(`HuggingFace error: ${resp.status} ${txt}`)
      }

      const data = await resp.json()
      let out = ''

      if (Array.isArray(data)) {
        const first = data[0]
        if (typeof first === 'string') out = first
        else if (first && typeof first === 'object') {
          out = first.generated_text || first.summary_text || first.text || JSON.stringify(first)
        } else {
          out = String(first)
        }
      } else if (typeof data === 'string') {
        out = data
      } else if (data && typeof data === 'object') {
        out = data.generated_text || data.text || JSON.stringify(data)
      } else {
        out = String(data)
      }

      if (out) return String(out).trim()
      return String(JSON.stringify(data)).slice(0, 1000)
    } catch (err) {
      console.warn('Hugging Face translate failed, falling back to OpenAI:', err.message || err)
      // continue to OpenAI fallback
    }
  }

  // Fallback: OpenAI
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) {
    throw new Error('No translation provider available (set HUGGINGFACE_API_KEY or OPENAI_API_KEY)')
  }

  const system = `You are a helpful translator. Translate the input French text into clear, natural, idiomatic American English. Keep the translation concise and preserve names, punctuation and album titles exactly.`
  const user = `Translate to English (do not add anything):\n\n${text}`

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      max_tokens: 400,
    }),
  })

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '')
    throw new Error(`OpenAI error: ${resp.status} ${txt}`)
  }

  const data = await resp.json()
  const out = data?.choices?.[0]?.message?.content || ''
  return out.trim()
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI (set in .env.local or env)')
    process.exit(1)
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

    // find documents that have a legacy description but no description_en
    // or where description_en is identical to description (copied but still French)
    const cursor = coll.find({
      description: { $exists: true, $ne: null, $ne: '' },
      $or: [
        { description_en: { $exists: false } },
        { description_en: null },
        { description_en: '' },
        { $expr: { $eq: ["$description", "$description_en"] } },
      ],
    }).limit(MAX_BATCH)

    const docs = await cursor.toArray()
    console.log(`Found ${docs.length} vinyl(s) to translate (limit ${MAX_BATCH}).`)
    if (docs.length === 0) return

    for (const doc of docs) {
      try {
        console.log('\nTranslating:', doc._id.toString(), doc.title)
        const source = String(doc.description || '')
        const translated = await translateText(source)
        console.log('=>', translated)

        const res = await coll.updateOne({ _id: doc._id }, { $set: { description_en: translated } })
        console.log('Updated:', res.modifiedCount === 1 ? 'ok' : 'no-change')

        await sleep(RATE_MS)
      } catch (err) {
        console.error('Translate error for', doc._id.toString(), err.message || err)
        // continue with next doc
        await sleep(RATE_MS)
      }
    }

    console.log('\nTranslation batch completed.')
  } catch (err) {
    console.error('Migration error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
