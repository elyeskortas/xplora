import Order from "@/models/order"
import { connectToDB } from "@/lib/mongodb"
import { sendStatusUpdateEmail } from "@/lib/email" // 👈 Ajouté

export async function PUT(req, { params }) {
  await connectToDB()

  const { status } = await req.json()

  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  )

  // 👇 Envoi email si client défini et email présent
  if (updated?.userInfo?.email) {
    await sendStatusUpdateEmail(updated.userInfo.email, updated)
  }

  return Response.json(updated)
}