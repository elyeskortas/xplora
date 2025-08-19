import dbConnect from "@/lib/dbConnect"
import Order from "@/models/order"
import { verifyAdmin } from "@/lib/authMiddleware"

export default async function handler(req, res) {
  await dbConnect()
  await verifyAdmin(req, res)

  try {
    const orders = await Order.find({ status: { $ne: "cancelled" } })

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const totalOrders = orders.length
    const topVinyls = {}

    orders.forEach((order) => {
      order.items.forEach(({ vinylId, title, quantity }) => {
        if (!topVinyls[vinylId]) topVinyls[vinylId] = { title, quantity: 0 }
        topVinyls[vinylId].quantity += quantity
      })
    })

    const sorted = Object.entries(topVinyls)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5)

    res.status(200).json({
      totalRevenue,
      totalOrders,
      bestSellers: sorted.map(([id, data]) => ({ vinylId: id, ...data })),
    })
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
}