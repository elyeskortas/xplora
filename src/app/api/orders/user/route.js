import { NextResponse } from "next/server"
import { getUserOrders } from "@/lib/actions/orders"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")

    if (!token) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
    }

    const decoded = verifyToken(token.value)
    if (!decoded) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 })
    }

    const result = await getUserOrders(decoded.userId)

    if (result.success) {
      return NextResponse.json({ orders: result.orders })
    } else {
      return NextResponse.json({ message: "Erreur lors de la récupération des commandes" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erreur API commandes utilisateur:", error)
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
  }
}