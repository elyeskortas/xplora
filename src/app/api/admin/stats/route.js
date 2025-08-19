import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import Order from "@/models/order"
import { verifyToken } from "@/lib/auth"
import User from "@/models/user"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if (!token) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
    }

    const decoded = verifyToken(token.value)
    if (!decoded) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 })
    }

    await connectToDB()
    const adminUser = await User.findById(decoded.userId).select("role")
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({ message: "Accès refusé (admin requis)" }, { status: 403 })
    }

    // Récupérer les commandes valides
    const orders = await Order.find({ status: { $ne: "cancelled" } })

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)
    const totalOrders = orders.length

    const topVinyls = {}
    orders.forEach((order) => {
      order.items.forEach(({ vinylId, title, quantity }) => {
        if (!topVinyls[vinylId]) topVinyls[vinylId] = { title, quantity: 0 }
        topVinyls[vinylId].quantity += quantity
      })
    })

    const bestSellers = Object.entries(topVinyls)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5)
      .map(([id, data]) => ({ vinylId: id, ...data }))

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      bestSellers,
    })
  } catch (error) {
    console.error("Erreur stats admin:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}