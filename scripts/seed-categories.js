#!/usr/bin/env node
// scripts/seed-categories.js
// Seed existing vinyls to set category_slug based on their category or default to 'all'

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI')
    process.exit(1)
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

    const allowed = ['all','exclusive','new-arrival','best-sellers','house','techno','beats','trance','pop-rock','hip-hop','equipment']

    const cursor = coll.find({})
    let count = 0
    while (await cursor.hasNext()) {
      const doc = await cursor.next()
      const cat = doc.category || ''
      const slug = String(cat).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
      const final = allowed.includes(slug) ? slug : 'all'
      const res = await coll.updateOne({ _id: doc._id }, { $set: { category_slug: final } })
      if (res.modifiedCount === 1) count++
    }

    console.log('Seed completed. Updated', count, 'documents.')
  } catch (err) {
    console.error('Error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
