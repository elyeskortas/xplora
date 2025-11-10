// scripts/add-newarrival.js
import dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from '../src/lib/mongodb.js'
import Vinyl from '../src/models/vinyl.js'

async function main() {
  try {
    await connectToDB()
    console.log('Connected to MongoDB')

    // Add `newArrival: false` to documents that don't have the field yet
    const result = await Vinyl.updateMany({ newArrival: { $exists: false } }, { $set: { newArrival: false } })

    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`)
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

main()
