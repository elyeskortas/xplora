"use client"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function PanierPage() {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useCart()
  const { isAuthenticated } = useAuth()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x" style={{ fontSize: "4rem", color: "#6c757d" }}></i>
        <h2 className="mb-4 mt-3">Votre panier est vide</h2>
        <p>Ajoutez des vinyles pour commencer vos achats !</p>
        <Link href="/vinyles" className="btn btn-primary mt-3">
          <i className="bi bi-music-note-beamed"></i> Explorer les vinyles
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        <i className="bi bi-cart"></i> Votre Panier ({cartItems.length} articles)
      </h2>

      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3">
                  <Image
                    src={`/images/${item.image || item.img}`}
                    className="rounded-start"
                    alt={item.title}
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-primary fw-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-3 fw-bold fs-5">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                          title="Supprimer cet article"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-warning" onClick={clearCart}>
              <i className="bi bi-trash"></i> Vider le panier
            </button>
            <Link href="/vinyles" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left"></i> Continuer mes achats
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card sticky-top">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-receipt"></i> Résumé de la commande
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Sous-total ({cartItems.length} articles):</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Livraison:</span>
                <span className="text-success">Gratuite</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              {isAuthenticated ? (
                <Link href="/checkout" className="btn btn-success w-100 btn-lg">
                  <i className="bi bi-credit-card"></i> Passer commande
                </Link>
              ) : (
                <div>
                  <Link href="/auth/login?redirect=/checkout" className="btn btn-success w-100 btn-lg mb-2">
                    <i className="bi bi-box-arrow-in-right"></i> Se connecter pour commander
                  </Link>
                  <small className="text-muted d-block text-center">
                    Ou{" "}
                    <Link href="/auth/register" className="text-decoration-none">
                      créer un compte
                    </Link>
                  </small>
                </div>
              )}

              <div className="mt-3 p-3 bg-light rounded">
                <small className="text-muted">
                  <i className="bi bi-shield-check text-success"></i> Paiement sécurisé
                  <br />
                  <i className="bi bi-truck text-primary"></i> Livraison gratuite
                  <br />
                  <i className="bi bi-cash text-warning"></i> Paiement à la livraison disponible
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
