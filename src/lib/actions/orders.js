import { connectToDB } from "@/lib/mongodb"
import Order from "@/models/order"
import { sendOrderEmail } from "@/lib/email"

function generateOrderNumber() {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `VIN-${timestamp.slice(-6)}-${random}`
}

// 📦 Créer une commande + envoyer mail (sans blocage)
export async function createOrder(orderData) {
  try {
    await connectToDB()
    const orderNumber = generateOrderNumber()
    const orderDoc = new Order({ ...orderData, orderNumber })
    await orderDoc.save()

    const order = orderDoc.toObject()

    // 🎯 Tentative d’email — log seulement
    if (orderData?.userInfo?.email) {
      try {
        console.log("📨 Tentative d'envoi d'email à:", orderData.userInfo.email)
        await sendOrderEmail(orderData.userInfo.email, order)
        console.log("✅ Email envoyé avec succès")
      } catch (e) {
        console.error("❌ Email non envoyé (commande créée quand même):", e?.message || e)
      }
    }

    return { success: true, order }
  } catch (error) {
    console.error("❌ Erreur lors de la création de la commande:", error)
    return { success: false, message: "Erreur lors de la création de la commande" }
  }
}

// 📋 Liste de commandes pour un utilisateur
export async function getUserOrders(userId) {
  try {
    await connectToDB()
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean()
    return { success: true, orders }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des commandes:", error)
    return { success: false, orders: [] }
  }
}

// 🔍 Récupérer une commande par ID et user
export async function getOrderById(orderId, userId) {
  try {
    await connectToDB()
    const order = await Order.findOne({ _id: orderId, userId }).lean()

    if (!order) {
      return { success: false, message: "Commande non trouvée" }
    }

    return { success: true, order }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la commande:", error)
    return { success: false, message: "Erreur technique lors de la commande" }
  }
}