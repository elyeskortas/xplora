<<<<<<< HEAD
// C:\Users\MSI\vinylia\src\app\api\vinyls\bestsellers\route.js
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"
=======
import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import vinyls from "@/data/vinyls.js"
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

export async function GET() {
  try {
    console.log("API Bestsellers: Récupération des bestsellers...")

<<<<<<< HEAD
    const staticBestsellers = vinyls.filter((v) => v.category === "BestSellers")
    let allBestsellers = [...staticBestsellers]

    try {
      await connectToDB()
      const dbBestsellers = await Vinyl.find({ category: "BestSellers" })
      const dbBestsellersWithId = dbBestsellers.map((v) => ({
        ...v.toObject(),
        id: v._id.toString(),
        img: v.image || v.img,
      }))
=======
    // Filtrer les bestsellers des données statiques
    const staticBestsellers = vinyls.filter((vinyl) => vinyl.category === "BestSellers")
    let allBestsellers = [...staticBestsellers]

    // Essayer d'ajouter les bestsellers de la base de données
    try {
      await connectToDB()
      const dbBestsellers = await Vinyl.find({ category: "BestSellers" })

      const dbBestsellersWithId = dbBestsellers.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
      }))

>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      allBestsellers = [...allBestsellers, ...dbBestsellersWithId]
    } catch (dbError) {
      console.log("API Bestsellers: Erreur MongoDB:", dbError.message)
    }

    console.log(`API Bestsellers: ${allBestsellers.length} bestsellers retournés`)
    return Response.json(allBestsellers)
  } catch (error) {
    console.error("API Bestsellers: Erreur:", error)
<<<<<<< HEAD
    const staticBestsellers = vinyls.filter((v) => v.category === "BestSellers")
    return Response.json(staticBestsellers)
  }
}
=======
    // Fallback sur les données statiques
    const staticBestsellers = vinyls.filter((vinyl) => vinyl.category === "BestSellers")
    return Response.json(staticBestsellers)
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
