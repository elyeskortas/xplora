#!/usr/bin/env node
// scripts/migrate-descriptions.js
// Copies legacy `description` -> `description_en` for vinyls missing an English description.
// Usage (PowerShell):
// node .\scripts\migrate-descriptions.js

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI environment variable')
    process.exit(1)
  }

  // Debug: print the exact loaded URI (JSON stringified to show hidden characters)
  console.log('DEBUG: MONGODB_URI =', JSON.stringify(uri))

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

    console.log('Migration: setting description_en = description for documents missing description_en...')

    const filter = {
      $or: [
        { description_en: { $exists: false } },
        { description_en: null },
        { description_en: '' },
      ],
      description: { $exists: true, $ne: null, $ne: '' },
    }

    // Use aggregation pipeline update to copy the field value
    const updatePipeline = [{ $set: { description_en: '$description' } }]

    const result = await coll.updateMany(filter, updatePipeline)

    console.log('Matched:', result.matchedCount)
    console.log('Modified:', result.modifiedCount)
    console.log('Upserted:', result.upsertedCount)

    // Optionally list a few updated documents for verification
    const examples = await coll.find({ description_en: { $exists: true } }).limit(5).toArray()
    console.log('Examples (first 5 with description_en):')
    examples.forEach((d) => {
      console.log('-', d._id.toString(), '->', (d.description_en || '').slice(0, 80))
    })

    console.log('Migration completed.')
  } catch (err) {
    console.error('Migration error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
