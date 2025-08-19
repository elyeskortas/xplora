import { NextResponse } from "next/server"
import { createOrder } from "@/lib/actions/orders"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request) {
  try {
    console.log("API Orders: Début de la requête POST")
    
    const cookieStore = await cookies()
    console.log("API Orders: Tous les cookies reçus:", cookieStore.getAll());
    const token = cookieStore.get("token")

    console.log("API Orders: Token trouvé:", !!token)

    if (!token) {
      console.log("API Orders: Aucun token trouvé")
      return NextResponse.json({ message: "Non autorisé - Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token.value)
    console.log("API Orders: Token décodé:", !!decoded)

    if (!decoded) {
      console.log("API Orders: Token invalide")
      return NextResponse.json({ message: "Token invalide" }, { status: 401 })
    }

    const orderData = await request.json()
    console.log("API Orders: Données de commande reçues:", {
      itemsCount: orderData.items?.length,
      totalAmount: orderData.totalAmount,
      hasShippingAddress: !!orderData.shippingAddress
    })

    // Validation des données
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json({ message: "Aucun article dans la commande" }, { status: 400 })
    }

    if (!orderData.shippingAddress) {
      return NextResponse.json({ message: "Adresse de livraison requise" }, { status: 400 })
    }

    if (!orderData.totalAmount || orderData.totalAmount <= 0) {
      return NextResponse.json({ message: "Montant total invalide" }, { status: 400 })
    }

    // Ajouter l'ID utilisateur
    orderData.userId = decoded.userId

    console.log("API Orders: Création de la commande pour l'utilisateur:", decoded.userId)

    const result = await createOrder(orderData)

    if (result.success) {
      console.log("API Orders: Commande créée avec succès:", result.order.orderNumber)
      return NextResponse.json({
        message: "Commande créée avec succès",
        order: result.order,
      })
    } else {
      console.error("API Orders: Erreur lors de la création:", result.message)
      return NextResponse.json({ message: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("API Orders: Erreur complète:", error)
    return NextResponse.json({ 
      message: "Erreur interne du serveur",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}