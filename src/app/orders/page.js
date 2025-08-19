"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"
import Image from "next/image"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders/user", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      } else {
        setError("Erreur lors du chargement des commandes")
      }
    } catch (error) {
      console.error("Erreur:", error)
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
  const statusMap = {
    pending: { class: "bg-warning", text: "En attente" },
    confirmed: { class: "bg-info", text: "Confirmée" },
    shipped: { class: "bg-primary", text: "Expédiée" },
    delivered: { class: "bg-success", text: "Livrée" },
    cancelled: { class: "bg-danger", text: "Annulée" },
  }
  const statusInfo = statusMap[status] || { class: "bg-secondary", text: status }
  return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
}



  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container py-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-2">Chargement de vos commandes...</p>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container py-5">
        <h2 className="mb-4">Mes commandes</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x" style={{ fontSize: "4rem", color: "#6c757d" }}></i>
            <h4 className="mt-3">Aucune commande</h4>
            <p className="text-muted">Vous n&apos;avez pas encore passé de commande.</p>
            <Link href="/vinyles" className="btn btn-primary">
              Découvrir nos vinyles
            </Link>
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-12 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Commande #{order.orderNumber}</h6>
                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </small>
                    </div>
                    <div className="text-end">
                      {getStatusBadge(order.status)}
                      <div className="mt-1">
                        <strong>${order.totalAmount.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h6>Articles ({order.items.length})</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="d-flex align-items-center">
                              <Image
                                src={`/images/${item.image}`}
                                alt={item.title}
                                width={40}
                                height={40}
                                style={{ objectFit: "cover" }}
                                className="me-2"
                              />
                              <div>
                                <small className="fw-bold">{item.title}</small>
                                <br />
                                <small className="text-muted">x{item.quantity}</small>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="d-flex align-items-center">
                              <span className="text-muted">+{order.items.length - 3} autres</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <div className="mb-2">
                          <small className="text-muted">Livraison à:</small>
                          <br />
                          <small>
                            {order.shippingAddress.city}, {order.shippingAddress.country}
                          </small>
                        </div>
                        <Link href={`/order-confirmation/${order._id}`} className="btn btn-outline-primary btn-sm">
  Voir les détails
</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}