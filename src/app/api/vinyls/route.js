<<<<<<< HEAD
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import vinyls from "@/data/vinyls"
import { NextResponse } from "next/server"
=======
import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import vinyls from "@/data/vinyls.js" // <-- Chemin corrigé ici
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

export async function GET() {
  try {
    console.log("API: Récupération des vinyles...")

<<<<<<< HEAD
    let allVinyls = [...vinyls]
    console.log(`API: ${vinyls.length} vinyles statiques chargés`)

=======
    // Commencer avec les données statiques
    let allVinyls = [...vinyls]
    console.log(`API: ${vinyls.length} vinyles statiques chargés`)

    // Essayer d'ajouter les vinyles de la base de données
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    try {
      await connectToDB()
      const dbVinyls = await Vinyl.find({})

      const dbVinylsWithId = dbVinyls.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
<<<<<<< HEAD
        img: vinyl.image || vinyl.img,
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      }))

      allVinyls = [...allVinyls, ...dbVinylsWithId]
      console.log(`API: ${dbVinyls.length} vinyles de MongoDB ajoutés`)
    } catch (dbError) {
<<<<<<< HEAD
      console.log("API: Erreur MongoDB, fallback statique:", dbError.message)
    }

    return NextResponse.json(allVinyls)
  } catch (error) {
    console.error("API: Erreur GET vinyles:", error)
    return NextResponse.json(vinyls)
=======
      console.log("API: Erreur MongoDB, utilisation des données statiques uniquement:", dbError.message)
    }

    console.log(`API: Total ${allVinyls.length} vinyles retournés`)
    return Response.json(allVinyls)
  } catch (error) {
    console.error("API: Erreur lors de la récupération des vinyles:", error)
    // En cas d'erreur, retourner au moins les données statiques
    return Response.json(vinyls)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  }
}

export async function POST(request) {
  try {
    await connectToDB()
<<<<<<< HEAD
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
=======
    const body = await request.json()

    const newVinyl = new Vinyl(body)
    await newVinyl.save()

    return Response.json(
      {
        ...newVinyl.toObject(),
        id: newVinyl._id.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API: Erreur lors de la création du vinyle:", error)
    return Response.json({ error: "Erreur lors de la création du vinyle" }, { status: 500 })
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
