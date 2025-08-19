import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import staticVinyls from "@/data/vinyls.js"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return Response.json({ message: "Paramètre de recherche 'query' manquant" }, { status: 400 })
    }

    console.log(`API Search: Recherche pour "${query}" (commence par)`)

    const lowerCaseQuery = query.toLowerCase()

    // Recherche dans les données statiques (commence par)
    const staticResults = staticVinyls.filter(
      (vinyl) =>
        vinyl.title
          .toLowerCase()
          .startsWith(lowerCaseQuery) || // <-- Modifié ici
        vinyl.description.toLowerCase().startsWith(lowerCaseQuery) || // <-- Modifié ici
        vinyl.category.toLowerCase().startsWith(lowerCaseQuery), // <-- Modifié ici
    )

    let dbResults = []
    try {
      await connectToDB()
      // Recherche dans MongoDB (titre, description, catégorie)
      // Utilisation de ^ pour "commence par" dans le regex
      dbResults = await Vinyl.find({
        $or: [
          { title: { $regex: `^${query}`, $options: "i" } }, // <-- Modifié ici
          { description: { $regex: `^${query}`, $options: "i" } }, // <-- Modifié ici
          { category: { $regex: `^${query}`, $options: "i" } }, // <-- Modifié ici
        ],
      })

      // Convertir les _id en id string pour la cohérence
      dbResults = dbResults.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
        img: vinyl.image || vinyl.img,
      }))
      console.log(`API Search: ${dbResults.length} résultats trouvés dans MongoDB`)
    } catch (dbError) {
      console.log("API Search: Erreur MongoDB, recherche limitée aux données statiques:", dbError.message)
    }

    // Combiner les résultats et supprimer les doublons (basé sur l'ID unique)
    const combinedResultsMap = new Map()
    staticResults.forEach((vinyl) => combinedResultsMap.set(vinyl.id, vinyl))
    dbResults.forEach((vinyl) => combinedResultsMap.set(vinyl.id, vinyl))

    const finalResults = Array.from(combinedResultsMap.values())

    console.log(`API Search: Total ${finalResults.length} résultats retournés`)
    return Response.json(finalResults)
  } catch (error) {
    console.error("API Search: Erreur lors de la recherche:", error)
    return Response.json({ message: "Erreur serveur lors de la recherche" }, { status: 500 })
  }
}
