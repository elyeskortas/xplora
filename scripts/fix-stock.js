#!/usr/bin/env node
// scripts/fix-stock.js
// Set a default stock value for vinyls that currently have stock === 0

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

const DEFAULT_STOCK = 5 // change if you prefer another default

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

    // Broaden filter: match missing, numeric 0, string '0', null, or empty string
    const filter = { $or: [ { stock: { $exists: false } }, { stock: { $in: [0, '0', null, ''] } } ] }
    const update = { $set: { stock: DEFAULT_STOCK } }

    // diagnostic counts
    const total = await coll.countDocuments({})
    const missing = await coll.countDocuments({ stock: { $exists: false } })
    const zeroNum = await coll.countDocuments({ stock: 0 })
    const zeroStr = await coll.countDocuments({ stock: '0' })
    const nullCount = await coll.countDocuments({ stock: null })
    console.log(`Total docs: ${total}. stock missing: ${missing}, stock=0: ${zeroNum}, stock='0': ${zeroStr}, stock=null: ${nullCount}`)

    const res = await coll.updateMany(filter, update)
    console.log(`Updated ${res.modifiedCount} documents. Set stock = ${DEFAULT_STOCK} where missing/0/null/''.`)
  } catch (err) {
    console.error('Error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
