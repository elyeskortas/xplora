// scripts/seed.js
import dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from '../src/lib/mongodb.js'
import Vinyl from '../src/models/vinyl.js'
import vinyls from '../src/data/vinyls.js'

async function seedDatabase() {
  try {
    await connectToDB()
    console.log('Connexion à MongoDB établie')

    // Nettoyage (évite les doublons en dev)
    await Vinyl.deleteMany({})
    console.log('Vinyles existants supprimés')

    // Harmonisation des données (image/img et audioSample/soundcloud)
    const normalizedVinyls = vinyls.map((v) => ({
      ...v,
      image: v.image || v.img,
      audioSample: v.audioSample || v.soundcloud,
    }))

    await Vinyl.insertMany(normalizedVinyls)
    console.log('Nouveaux vinyles insérés avec succès')

    process.exit(0)
  } catch (err) {
    console.error('Erreur lors de l’insertion :', err)
    process.exit(1)
  }
}

seedDatabase()
