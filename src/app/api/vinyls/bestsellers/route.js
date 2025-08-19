// C:\Users\MSI\vinylia\src\app\api\vinyls\bestsellers\route.js
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"

export async function GET() {
  try {
    console.log("API Bestsellers: Récupération des bestsellers...")

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
      allBestsellers = [...allBestsellers, ...dbBestsellersWithId]
    } catch (dbError) {
      console.log("API Bestsellers: Erreur MongoDB:", dbError.message)
    }

    console.log(`API Bestsellers: ${allBestsellers.length} bestsellers retournés`)
    return Response.json(allBestsellers)
  } catch (error) {
    console.error("API Bestsellers: Erreur:", error)
    const staticBestsellers = vinyls.filter((v) => v.category === "BestSellers")
    return Response.json(staticBestsellers)
  }
}
