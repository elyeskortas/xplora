// scripts/seed.js
<<<<<<< HEAD
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
=======

import dotenv from 'dotenv';
dotenv.config();

import { connectToDB } from '../lib/mongodb.js'; // attention : ajoute .js si tu exécutes avec node
import Vinyl from '../models/vinyl.js';
import vinyls from '../data/vinyls.js';


async function seedDatabase() {
  try {
    await connectToDB();
    console.log('Connexion à MongoDB établie');

    // Supprimer les données existantes (optionnel mais conseillé pour éviter les doublons)
    await Vinyl.deleteMany({});
    console.log('Vinyles existants supprimés');

    // Insérer les nouveaux vinyles
    await Vinyl.insertMany(vinyls);
    console.log('Nouveaux vinyles insérés avec succès');

    process.exit(0); // sortir proprement
  } catch (err) {
    console.error('Erreur lors de l’insertion :', err);
    process.exit(1);
  }
}

seedDatabase();
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
