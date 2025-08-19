"use client"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"
import Image from "next/image"

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "Tunisie",
    phone: "",
  })

  const [notes, setNotes] = useState("")

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  useEffect(() => {
    console.log("Checkout: État utilisateur:", { isAuthenticated, user: !!user })
  }, [isAuthenticated, user])

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!shippingAddress.street.trim()) {
      setError("L'adresse est requise")
      return false
    }
    if (!shippingAddress.city.trim()) {
      setError("La ville est requise")
      return false
    }
    if (!shippingAddress.postalCode.trim()) {
      setError("Le code postal est requis")
      return false
    }
    if (!shippingAddress.phone.trim()) {
      setError("Le numéro de téléphone est requis")
      return false
    }
    return true
  }

  // Remplace la fonction handleSubmitOrder existante
const handleSubmitOrder = async (e) => {
  e.preventDefault()
  setError("")

  console.log("Checkout: Début de la soumission de commande")
  console.log("Checkout: Utilisateur authentifié:", isAuthenticated)
  console.log("Checkout: Données utilisateur:", user)

  if (!validateForm()) return

  // Garde défensive au cas où le contexte auth n’est pas encore hydraté
  if (!user || !user.email) {
    setError("Utilisateur non disponible. Veuillez vous reconnecter.")
    return
  }

  setLoading(true)

  try {
    const orderData = {
      userInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      items: cartItems.map((item) => ({
        vinylId: item.id,
        title: item.title,
        image: item.image || item.img, // Attention si déjà prefixé /images/
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      shippingAddress,
      totalAmount: Number(total),
      notes: notes.trim(),
      paymentMethod: "cash_on_delivery",
    }

    console.log("Checkout: Données de commande à envoyer:", {
      itemsCount: orderData.items.length,
      totalAmount: orderData.totalAmount,
      userEmail: orderData.userInfo.email,
    })

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    })

    console.log("Checkout: Réponse API (status):", res.status)

    const text = await res.text()
    let data = {}
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      data = { message: text } // si le serveur renvoie du texte brut
    }

    console.log("Checkout: Données de réponse:", data)

    if (res.ok && data?.order?._id) {
      console.log("Checkout: Commande créée avec succès")
      clearCart()
      router.push(`/order-confirmation/${data.order._id}`)
      return
    }

    console.error("Checkout: Erreur API:", { status: res.status, data })
    setError(
      data?.message || `Erreur lors de la création de la commande (HTTP ${res.status})`
    )
  } catch (err) {
    console.error("Checkout: Erreur lors de la soumission:", err)
    setError("Erreur de connexion. Veuillez réessayer.")
  } finally {
    setLoading(false)
  }
}

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="container py-5 text-center">
          <h2 className="mb-4">Votre panier est vide</h2>
          <p>Ajoutez des vinyles pour passer commande !</p>
          <Link href="/vinyles" className="btn btn-primary mt-3">
            Explorer les vinyles
          </Link>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container py-5">
        <h2 className="mb-4">Finaliser votre commande</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        )}

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSubmitOrder}>
              {/* Informations utilisateur */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-person"></i> Informations de facturation
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Prénom:</strong> {user?.firstName}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Nom:</strong> {user?.lastName}
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                </div>
              </div>

              {/* Adresse de livraison */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-geo-alt"></i> Adresse de livraison
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="street" className="form-label">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleAddressChange}
                      required
                      placeholder="123 Rue de la Musique"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city" className="form-label">
                        Ville *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                        placeholder="Paris"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="postalCode" className="form-label">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                        required
                        placeholder="75001"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country" className="form-label">
                        Pays *
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                        required
                      >
                        <option value="Tunisie">Tunisie</option>
                      </select>
                    </div> 
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleAddressChange}
                        required
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode de paiement */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-credit-card"></i> Mode de paiement
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cashOnDelivery"
                      checked
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="cashOnDelivery">
                      <i className="bi bi-cash"></i> Paiement à la livraison
                    </label>
                  </div>
                  <small className="text-muted">
                    Vous paierez en espèces ou par carte lors de la réception de votre commande.
                  </small>
                </div>
              </div>

              {/* Notes */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-chat-text"></i> Notes (optionnel)
                  </h5>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instructions spéciales pour la livraison..."
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle"></i> Confirmer la commande
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Résumé de la commande</h5>
              </div>
              <div className="card-body">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <Image
                        src={`/images/${item.image || item.img}`}
                        alt={item.title}
                        width={40}
                        height={40}
                        style={{ objectFit: "cover" }}
                        className="me-2"
                      />
                      <div>
                        <small className="fw-bold">{item.title}</small>
                        <br />
                        <small className="text-muted">Qté: {item.quantity}</small>
                      </div>
                    </div>
                    <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Sous-total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Livraison:</span>
                  <span className="text-success">Gratuite</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center fw-bold fs-5">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-3">
                  <small className="text-muted">
                    <i className="bi bi-info-circle"></i> Paiement à la livraison disponible
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
