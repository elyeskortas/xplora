// C:\Users\MSI\vinylia\src\app\api\vinyls\newarrivals\route.js
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"

export async function GET() {
  try {
    console.log("API NewArrivals: Récupération des nouveautés...")

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
    }

    console.log(`API NewArrivals: Total ${allNewArrivals.length} nouveautés retournées`)
    return Response.json(allNewArrivals)
  } catch (error) {
    console.error("API NewArrivals: Erreur:", error)
    const staticNewArrivals = vinyls.filter((v) => v.category === "NewArrival")
    return Response.json(staticNewArrivals)
  }
}
