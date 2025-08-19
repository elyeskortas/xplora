import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"
import User from "@/models/user"

export async function GET() {
  try {
    const cookieStore = await cookies() // ✅ await ici !
    const token = cookieStore.get("token")

    if (!token) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
    }

    const decoded = verifyToken(token.value)
    if (!decoded) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 })
    }

    await connectToDB()
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Erreur API /auth/me:", error)
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
  }
}
