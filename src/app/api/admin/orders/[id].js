import dbConnect from "@/lib/dbConnect"
import Order from "@/models/order"
import { verifyAdmin } from "@/lib/authMiddleware"

export default async function handler(req, res) {
  await dbConnect()
  await verifyAdmin(req, res)

  const { id } = req.query

  if (req.method === "PUT") {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).json(order)
  }
}