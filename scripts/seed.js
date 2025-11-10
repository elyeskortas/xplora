// scripts/seed.js
import dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from '../src/lib/mongodb.js'
import Vinyl from '../src/models/vinyl.js'
import vinyls from '../src/data/vinyls.js'
import fs from 'fs'
import path from 'path'

async function seedDatabase() {
  try {
    await connectToDB()
    console.log('Connexion à MongoDB établie')

    // Insert or update vinyls from the static data file (safe seed)
    const normalizedVinyls = vinyls.map((v) => ({
      ...v,
      image: v.image || v.img,
      audioSample: v.audioSample || v.soundcloud,
    }))

    let inserted = 0
    for (const v of normalizedVinyls) {
      const existing = await Vinyl.findOne({ $or: [{ title: v.title }, { img: v.img }, { image: v.image }] })
      if (existing) {
        // update fields if necessary
        await Vinyl.updateOne({ _id: existing._id }, { $set: v })
      } else {
        await Vinyl.create(v)
        inserted++
      }
    }
    console.log(`${inserted} new vinyl(s) inserted or updated.`)

    // Write log
    try {
      const outLog = path.join(process.cwd(), 'scripts', 'seed-log.txt')
      fs.appendFileSync(outLog, `Seed run at ${new Date().toISOString()} - inserted ${inserted}\n`)
    } catch (err) {
      console.error('Failed to write seed log:', err.message)
    }

    process.exit(0)
  } catch (err) {
    console.error('Erreur lors de l’insertion :', err)
    process.exit(1)
  }
}

seedDatabase()
