#!/usr/bin/env node
// scripts/manual-translate-descriptions.js
// Manual editor for `description_en` for vinyls (no AI).
// Usage (PowerShell):
// node .\scripts\manual-translate-descriptions.js
// Ensure .env.local contains MONGODB_URI or set in environment.

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import readline from 'readline/promises'
import { stdin, stdout } from 'process'

dotenv.config({ path: '.env.local' })

const MAX_BATCH = Number(process.env.TRANSLATE_BATCH_SIZE || 50)

function short(s, n = 800) {
  if (!s) return ''
  return s.length > n ? s.slice(0, n) + '\n\n... (truncated)' : s
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI (set in .env.local or env)')
    process.exit(1)
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const rl = readline.createInterface({ input: stdin, output: stdout })

  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

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
    console.log(`Found ${docs.length} vinyl(s) to manually edit (limit ${MAX_BATCH}).`)
    if (docs.length === 0) {
      await rl.close()
      return
    }

    let updated = 0

    for (const doc of docs) {
      console.log('\n------------------------------------------------------------')
      console.log('Title :', doc.title || '(no title)')
      console.log('ID    :', String(doc._id))
      console.log('\nCurrent (French) description:\n')
      console.log(short(String(doc.description || '')))

      const hint = `Enter English translation for this vinyl:\n- Paste the translation and press Enter\n- Empty to skip, a single dot (.) to copy the French text into description_en\n- q to quit and save progress\nYour input:`
      const answer = await rl.question(`\n${hint}\n> `)

      if (!answer) {
        console.log('Skipped')
        continue
      }

      const trimmed = answer.trim()
      if (trimmed.toLowerCase() === 'q') {
        console.log('Quitting and saving progress...')
        break
      }

      let toSave = trimmed
      if (trimmed === '.') {
        toSave = String(doc.description || '')
      }

      if (!toSave) {
        console.log('No content to save, skipped')
        continue
      }

      const res = await coll.updateOne({ _id: doc._id }, { $set: { description_en: toSave } })
      if (res.modifiedCount === 1) {
        updated += 1
        console.log('Saved (ok)')
      } else {
        console.log('Saved (no-change or error)')
      }
    }

    console.log(`\nManual edit completed. Updated ${updated} document(s).`)
    await rl.close()
  } catch (err) {
    console.error('Error:', err.message || err)
    try { await rl.close() } catch (_) {}
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
