<<<<<<< HEAD
// C:\Users\MSI\vinylia\src\app\api\vinyls\newarrivals\route.js
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"
=======
import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import vinyls from "@/data/vinyls.js" // <-- Chemin corrigé ici
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

export async function GET() {
  try {
    console.log("API NewArrivals: Récupération des nouveautés...")

<<<<<<< HEAD
    const staticNewArrivals = vinyls.filter((v) => v.category === "NewArrival")
    let allNewArrivals = [...staticNewArrivals]

    try {
      await connectToDB()
      const dbNewArrivals = await Vinyl.find({ category: "NewArrival" })
      const dbNewArrivalsWithId = dbNewArrivals.map((v) => ({
        ...v.toObject(),
        id: v._id.toString(),
        img: v.image || v.img,
      }))
      allNewArrivals = [...allNewArrivals, ...dbNewArrivalsWithId]
      console.log(`API NewArrivals: ${dbNewArrivals.length} nouveautés de MongoDB ajoutées`)
    } catch (dbError) {
      console.log("API NewArrivals: Erreur MongoDB, fallback statique:", dbError.message)
=======
    // Filtrer les nouveautés des données statiques
    const staticNewArrivals = vinyls.filter((vinyl) => vinyl.category === "NewArrival")
    let allNewArrivals = [...staticNewArrivals]

    // Essayer d'ajouter les nouveautés de la base de données
    try {
      await connectToDB()
      const dbNewArrivals = await Vinyl.find({ category: "NewArrival" })

      const dbNewArrivalsWithId = dbNewArrivals.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
        img: vinyl.image || vinyl.img, // Compatibilité avec les deux noms de champs
      }))

      allNewArrivals = [...allNewArrivals, ...dbNewArrivalsWithId]
      console.log(`API NewArrivals: ${dbNewArrivals.length} nouveautés de MongoDB ajoutées`)
    } catch (dbError) {
      console.log("API NewArrivals: Erreur MongoDB, utilisation des données statiques uniquement:", dbError.message)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    }

    console.log(`API NewArrivals: Total ${allNewArrivals.length} nouveautés retournées`)
    return Response.json(allNewArrivals)
  } catch (error) {
<<<<<<< HEAD
    console.error("API NewArrivals: Erreur:", error)
    const staticNewArrivals = vinyls.filter((v) => v.category === "NewArrival")
    return Response.json(staticNewArrivals)
  }
}
=======
    console.error("API NewArrivals: Erreur lors de la récupération des nouveautés:", error)
    // Fallback sur les données statiques
    const staticNewArrivals = vinyls.filter((vinyl) => vinyl.category === "NewArrival")
    return Response.json(staticNewArrivals)
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
