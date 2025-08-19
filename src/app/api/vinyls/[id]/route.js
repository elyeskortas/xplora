import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"

export async function GET(_request, { params }) {
  try {
    await connectToDB()

    const vinyl = await Vinyl.findById(params.id)
    if (!vinyl) {
      return NextResponse.json({ message: "Vinyle introuvable" }, { status: 404 })
    }

    return NextResponse.json({
      ...vinyl.toObject(),
      id: vinyl._id.toString(),
      img: vinyl.image || vinyl.img,
    })
  } catch (error) {
    console.error("API: Erreur récupération vinyle:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}