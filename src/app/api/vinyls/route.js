import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("API: Récupération des vinyles...")

    let allVinyls = [...vinyls]
    console.log(`API: ${vinyls.length} vinyles statiques chargés`)

    try {
      await connectToDB()
      const dbVinyls = await Vinyl.find({})

      const dbVinylsWithId = dbVinyls.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
        img: vinyl.image || vinyl.img,
      }))

      allVinyls = [...allVinyls, ...dbVinylsWithId]
      console.log(`API: ${dbVinyls.length} vinyles de MongoDB ajoutés`)
    } catch (dbError) {
      console.log("API: Erreur MongoDB, fallback statique:", dbError.message)
    }

    return NextResponse.json(allVinyls)
  } catch (error) {
    console.error("API: Erreur GET vinyles:", error)
    return NextResponse.json(vinyls)
  }
}

export async function POST(request) {
  try {
    await connectToDB()
    const data = await request.json()

    const vinyl = new Vinyl(data)
    await vinyl.save()

    return NextResponse.json(
      { ...vinyl.toObject(), id: vinyl._id.toString() },
      { status: 201 }
    )
  } catch (error) {
    console.error("API: Erreur POST vinyle:", error)
    return NextResponse.json({ error: "Erreur création vinyle" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectToDB()
    const { id, ...updates } = await request.json()

    const vinyl = await Vinyl.findByIdAndUpdate(id, updates, { new: true })
    if (!vinyl) {
      return NextResponse.json({ error: "Vinyle non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ ...vinyl.toObject(), id: vinyl._id.toString(), image: vinyl.image || vinyl.img })
  } catch (error) {
    return NextResponse.json({ error: "Erreur mise à jour vinyle" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    await connectToDB()
    const { id } = await request.json()

    const deleted = await Vinyl.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "Vinyle non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ message: "Vinyle supprimé" })
  } catch (error) {
    console.error("API: Erreur DELETE vinyle:", error)
    return NextResponse.json({ error: "Erreur suppression vinyle" }, { status: 500 })
  }
}
