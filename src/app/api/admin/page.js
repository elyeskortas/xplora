// C:\Users\MSI\vinylia\src\app\admin\page.js
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  const [vinyls, setVinyls] = useState([])
  const [users, setUsers] = useState([])

  const [vForm, setVForm] = useState({ title: "", price: "", category: "", image: "", description: "", stock: "", audioSample: "" })
  const [uForm, setUForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "user" })

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login?redirect=/admin")
      else if (!isAdmin) router.push("/")
      else {
        loadVinyls()
        loadUsers()
      }
    }
  }, [loading, user, isAdmin, router])

  const loadVinyls = async () => {
    const res = await fetch("/api/admin/vinyls", { credentials: "include" })
    if (res.ok) setVinyls(await res.json())
  }

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users", { credentials: "include" })
    if (res.ok) setUsers(await res.json())
  }

  const createVinyl = async (e) => {
    e.preventDefault()
    const payload = {
      ...vForm,
      price: Number(vForm.price || 0),
      stock: Number(vForm.stock || 0),
    }
    const res = await fetch("/api/admin/vinyls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setVForm({ title: "", price: "", category: "", image: "", description: "", stock: "", audioSample: "" })
      loadVinyls()
    }
  }

  const deleteVinyl = async (id) => {
    if (!confirm("Supprimer ce vinyle ?")) return
    const res = await fetch("/api/admin/vinyls", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    })
    if (res.ok) loadVinyls()
  }

  const createUser = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(uForm),
    })
    if (res.ok) {
      setUForm({ firstName: "", lastName: "", email: "", password: "", role: "user" })
      loadUsers()
    }
  }

  const deleteUser = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    })
    if (res.ok) loadUsers()
  }

  if (loading || !isAdmin) return (
    <div className="container py-5 text-center">
      <div className="spinner-border" role="status"><span className="visually-hidden">Chargement...</span></div>
    </div>
  )

  return (
    <div className="container py-5">
      <h2 className="mb-4">Administration</h2>

      <div className="row g-4">
        {/* Vinyles */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <strong>Vinyles</strong>
            </div>
            <div className="card-body">
              <form className="row g-2" onSubmit={createVinyl}>
                <div className="col-12 col-md-6">
                  <input className="form-control" placeholder="Titre" value={vForm.title} onChange={(e)=>setVForm({...vForm, title:e.target.value})} required />
                </div>
                <div className="col-6 col-md-3">
                  <input className="form-control" type="number" step="0.01" placeholder="Prix" value={vForm.price} onChange={(e)=>setVForm({...vForm, price:e.target.value})} required />
                </div>
                <div className="col-6 col-md-3">
                  <input className="form-control" type="number" placeholder="Stock" value={vForm.stock} onChange={(e)=>setVForm({...vForm, stock:e.target.value})} />
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control" placeholder="Catégorie (BestSellers | NewArrival | Rock ...)" value={vForm.category} onChange={(e)=>setVForm({...vForm, category:e.target.value})} />
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control" placeholder="Image (ex: daft_punk.jpg)" value={vForm.image} onChange={(e)=>setVForm({...vForm, image:e.target.value})} />
                </div>
                <div className="col-12">
                  <input className="form-control" placeholder="Audio sample (URL)" value={vForm.audioSample} onChange={(e)=>setVForm({...vForm, audioSample:e.target.value})} />
                </div>
                <div className="col-12">
                  <textarea className="form-control" placeholder="Description" value={vForm.description} onChange={(e)=>setVForm({...vForm, description:e.target.value})} />
                </div>
                <div className="col-12">
                  <button className="btn btn-dark w-100" type="submit"><i className="bi bi-plus-circle"></i> Ajouter le vinyle</button>
                </div>
              </form>

              <hr />
              <ul className="list-group">
                {vinyls.map((v) => (
                  <li key={v.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <div>
                      <strong>{v.title}</strong> — {v.price} TND — <span className="badge bg-secondary">{v.category || "N/A"}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteVinyl(v.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
                {vinyls.length === 0 && <li className="list-group-item">Aucun vinyle</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Utilisateurs */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <strong>Utilisateurs</strong>
            </div>
            <div className="card-body">
              <form className="row g-2" onSubmit={createUser}>
                <div className="col-12 col-md-6">
                  <input className="form-control" placeholder="Prénom" value={uForm.firstName} onChange={(e)=>setUForm({...uForm, firstName:e.target.value})} required />
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control" placeholder="Nom" value={uForm.lastName} onChange={(e)=>setUForm({...uForm, lastName:e.target.value})} required />
                </div>
                <div className="col-12">
                  <input className="form-control" type="email" placeholder="Email" value={uForm.email} onChange={(e)=>setUForm({...uForm, email:e.target.value})} required />
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control" type="password" placeholder="Mot de passe" value={uForm.password} onChange={(e)=>setUForm({...uForm, password:e.target.value})} required />
                </div>
                <div className="col-12 col-md-6">
                  <select className="form-select" value={uForm.role} onChange={(e)=>setUForm({...uForm, role:e.target.value})}>
                    <option value="user">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit"><i className="bi bi-person-plus"></i> Créer l’utilisateur</button>
                </div>
              </form>

              <hr />
              <ul className="list-group">
                {users.map((u) => (
                  <li key={u.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <div>
                      <strong>{u.firstName} {u.lastName}</strong> — {u.email} — <span className={`badge ${u.role === "admin" ? "bg-danger" : "bg-secondary"}`}>{u.role}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
                {users.length === 0 && <li className="list-group-item">Aucun utilisateur</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}