#!/usr/bin/env node
// scripts/list-stocks.js
// Print id, title and stock for all vinyls

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

    const docs = await coll.find({}).project({ title: 1, stock: 1, category: 1 }).toArray()
    if (!docs.length) {
      console.log('No vinyls found')
      return
    }

    console.log(`Found ${docs.length} vinyls:\n`)
    docs.forEach((d, i) => {
      console.log(`${i + 1}. ${d.title || '(no title)'} — stock: ${JSON.stringify(d.stock)} — category: ${d.category || 'N/A'} — _id: ${d._id}`)
    })
  } catch (err) {
    console.error('Error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
