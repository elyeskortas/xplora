// src/app/profile/page.js
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [preview, setPreview] = useState(null)
  const router = useRouter()

  // Récupérer le profil utilisateur
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          router.push("/auth/login?redirect=/profile")
        }
      } catch (err) {
        console.error("Erreur récupération profil:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  // Récupérer les commandes de l’utilisateur
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders/user", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          setOrders(data.orders || [])
        }
      } catch (err) {
        console.error("Erreur récupération commandes:", err)
      } finally {
        setLoadingOrders(false)
      }
    }
    fetchOrders()
  }, [])

  // convertisseur image → base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  // mise à jour du profil
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)

    let avatarBase64 = user.avatar
    if (e.target.avatar.files[0]) {
      avatarBase64 = await fileToBase64(e.target.avatar.files[0])
    }

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      address: { street: e.target.address.value },
      password: e.target.password.value || undefined,
      avatar: avatarBase64,
    }

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok) {
        alert("✅ Profil mis à jour avec succès")
        setUser(data.user)
        setPreview(null)
      } else {
        alert("❌ Erreur: " + data.message)
      }
    } catch (error) {
      console.error("Erreur mise à jour profil:", error)
      alert("Erreur serveur")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container py-5">
      <h2 className="mb-4">Espace client</h2>

      {/* ====== Profil ====== */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          <img
            src={preview || user.avatar || "/images/default-avatar.png"}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-circle border"
          />
          <div>
            <h5>{user.firstName} {user.lastName}</h5>
            <p className="mb-0">{user.email}</p>
          </div>
        </div>
      </div>

      {/* ====== Formulaire édition profil ====== */}
      <form className="row g-3 mb-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Prénom</label>
          <input name="firstName" className="form-control" defaultValue={user.firstName} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nom</label>
          <input name="lastName" className="form-control" defaultValue={user.lastName} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" defaultValue={user.email} disabled />
        </div>
        <div className="col-md-6">
          <label className="form-label">Téléphone</label>
          <input name="phone" className="form-control" defaultValue={user.phone || ""} />
        </div>
        <div className="col-md-12">
          <label className="form-label">Adresse</label>
          <textarea name="address" className="form-control" defaultValue={user.address?.street || ""}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label">Nouveau mot de passe</label>
          <input name="password" className="form-control" type="password" placeholder="Laisser vide pour ne pas changer" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Photo de profil</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              if (e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0])
                setPreview(url)
              }
            }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success" disabled={updating}>
            {updating ? "Mise à jour..." : "Mettre à jour le profil"}
          </button>
        </div>
      </form>

      {/* ====== Historique des commandes ====== */}
      <h3 className="mb-3">Historique des commandes</h3>
      {loadingOrders ? (
        <p>Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    {order.items.map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-2 mb-1">
                        <img src={item.image} alt={item.title} width={40} height={40} />
                        <span>{item.title} x {item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td>{order.totalAmount.toFixed(2)} €</td>
                  <td>
                    <span className={`badge 
                      ${order.status === "pending" ? "bg-warning" :
                        order.status === "confirmed" ? "bg-info" :
                        order.status === "shipped" ? "bg-primary" :
                        order.status === "delivered" ? "bg-success" :
                        "bg-danger"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
