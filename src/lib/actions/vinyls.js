import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import vinyls from "@/data/vinyls.js" // <-- Chemin corrigé ici

export async function getVinylById(id) {
  try {
    console.log("Recherche du vinyle avec ID:", id)

    // D'abord, chercher dans les données statiques
    const staticVinyl = vinyls.find((v) => v.id === id)
    if (staticVinyl) {
      console.log("Vinyle trouvé dans les données statiques:", staticVinyl.title)
      return staticVinyl
    }

    // Ensuite, chercher dans MongoDB si l'ID ressemble à un ObjectId
    if (id.length === 24) {
      try {
        await connectToDB()
        const dbVinyl = await Vinyl.findById(id)
        if (dbVinyl) {
          console.log("Vinyle trouvé dans MongoDB:", dbVinyl.title)
          return {
            ...dbVinyl.toObject(),
            id: dbVinyl._id.toString(),
          }
        }
      } catch (dbError) {
        console.log("Erreur MongoDB (normal si pas un ObjectId valide):", dbError.message)
      }
    }

    console.log("Aucun vinyle trouvé pour l'ID:", id)
    return null
  } catch (error) {
    console.error("Erreur lors de la récupération du vinyle:", error)
    return null
  }
}

export async function getAllVinyls() {
  try {
    // Combiner les données statiques et de la base de données
    let allVinyls = [...vinyls]

    // Ajouter les vinyles de la base de données
    try {
      await connectToDB()
      const dbVinyls = await Vinyl.find({})

      const dbVinylsWithId = dbVinyls.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
      }))

      allVinyls = [...allVinyls, ...dbVinylsWithId]
    } catch (dbError) {
      console.log("Erreur MongoDB, utilisation des données statiques uniquement:", dbError.message)
    }

    return allVinyls
  } catch (error) {
    console.error("Erreur lors de la récupération des vinyles:", error)
    return vinyls // Fallback sur les données statiques
  }
}
