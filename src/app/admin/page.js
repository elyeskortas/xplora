"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  // 📊 Stats
  const [stats, setStats] = useState(null)
  const [statsError, setStatsError] = useState("")

  // 👥 Utilisateurs
  const [users, setUsers] = useState([])
  const [usersError, setUsersError] = useState("")
  const [uForm, setUForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  })
  const [editingUserId, setEditingUserId] = useState(null)

  // 💿 Vinyles
  const [vinyls, setVinyls] = useState([])
  const [vinylsError, setVinylsError] = useState("")
  const [vForm, setVForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
    audioSample: "",
  })
  const [editingVinylId, setEditingVinylId] = useState(null)

  // 🚚 Chargement initial après auth
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login?redirect=/admin")
      } else if (!isAdmin) {
        router.push("/")
      } else {
        loadStats()
        loadUsers()
        loadVinyls()
      }
    }
  }, [loading, user, isAdmin, router])

  // ======= FETCHERS =======

  async function loadStats() {
    try {
      setStatsError("")
      const res = await fetch("/api/admin/stats", { credentials: "include" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur chargement stats")
      setStats(data)
    } catch (e) {
      setStatsError(e.message)
    }
  }

  async function loadUsers() {
    try {
      setUsersError("")
      const res = await fetch("/api/admin/users", { credentials: "include" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur chargement utilisateurs")
      setUsers(data)
    } catch (e) {
      setUsersError(e.message)
    }
  }

  async function loadVinyls() {
    try {
      setVinylsError("")
      const res = await fetch("/api/admin/vinyls", { credentials: "include" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur chargement vinyles")
      setVinyls(data)
    } catch (e) {
      setVinylsError(e.message)
    }
  }

  // ======= UTILISATEURS: CREATE / UPDATE / DELETE =======

  async function submitUser(e) {
    e.preventDefault()
    try {
      const method = editingUserId ? "PUT" : "POST"
      const url = editingUserId ? `/api/admin/users/${editingUserId}` : "/api/admin/users"

      // Ne pas envoyer password vide lors d'une modification
      const basePayload = {
        firstName: uForm.firstName,
        lastName: uForm.lastName,
        email: uForm.email,
        role: uForm.role,
      }
      const payload =
        editingUserId && !uForm.password
          ? basePayload
          : { ...basePayload, password: uForm.password }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur utilisateur")

      await loadUsers()
      resetUserForm()
    } catch (e) {
      alert(e.message)
    }
  }

  function editUser(u) {
    setEditingUserId(u.id)
    setUForm({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      role: u.role || "user",
      password: "", // volontairement vide en édition
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function deleteUser(id) {
    if (!confirm("Supprimer cet utilisateur ?")) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur suppression utilisateur")

      await loadUsers()
    } catch (e) {
      alert(e.message)
    }
  }

  function resetUserForm() {
    setEditingUserId(null)
    setUForm({ firstName: "", lastName: "", email: "", password: "", role: "user" })
  }

  // ======= VINYLES: CREATE / UPDATE / DELETE =======

  async function submitVinyl(e) {
    e.preventDefault()
    try {
      const payload = {
        ...vForm,
        price: Number(vForm.price || 0),
        stock: Number(vForm.stock || 0),
      }
      const method = editingVinylId ? "PUT" : "POST"
      const url = editingVinylId ? `/api/admin/vinyls/${editingVinylId}` : "/api/admin/vinyls"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur vinyle")

      await loadVinyls()
      resetVinylForm()
    } catch (e) {
      alert(e.message)
    }
  }

  function editVinyl(v) {
    setEditingVinylId(v.id)
    setVForm({
      title: v.title || "",
      price: v.price ?? "",
      category: v.category || "",
      image: v.image || v.img || "",
      description: v.description || "",
      stock: v.stock ?? "",
      audioSample: v.audioSample || v.soundcloud || "",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function deleteVinyl(id) {
    if (!confirm("Supprimer ce vinyle ?")) return
    try {
      const res = await fetch(`/api/admin/vinyls/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur suppression vinyle")

      await loadVinyls()
    } catch (e) {
      alert(e.message)
    }
  }

  function resetVinylForm() {
    setEditingVinylId(null)
    setVForm({
      title: "",
      price: "",
      category: "",
      image: "",
      description: "",
      stock: "",
      audioSample: "",
    })
  }

  // ======= UI =======

  if (loading || !isAdmin) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Administration</h2>

      {/* STATISTIQUES */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Commandes totales</h5>
              <p className="card-text fs-3">{stats ? stats.totalOrders : "-"}</p>
              {statsError && <div className="small text-warning">{statsError}</div>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Revenu généré</h5>
              <p className="card-text fs-3">
                {stats ? `$${Number(stats.totalRevenue || 0).toFixed(2)}` : "-"}
              </p>
              {statsError && <div className="small text-warning">{statsError}</div>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Produits populaires</h5>
              <ul className="list-unstyled mb-2">
                {stats?.bestSellers?.slice(0, 3).map((item, idx) => (
                  <li key={idx}>
                    {item.title} <span className="badge bg-light text-dark">{item.quantity}</span>
                  </li>
                )) || <li>-</li>}
              </ul>
              <div className="text-muted small">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* UTILISATEURS (EN HAUT) */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <strong>Utilisateurs</strong>
            </div>
            <div className="card-body">
              {/* Formulaire: création + édition */}
              <form className="row g-2" onSubmit={submitUser}>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Prénom"
                    value={uForm.firstName}
                    onChange={(e) => setUForm({ ...uForm, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Nom"
                    value={uForm.lastName}
                    onChange={(e) => setUForm({ ...uForm, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={uForm.email}
                    onChange={(e) => setUForm({ ...uForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    type="password"
                    placeholder={editingUserId ? "Mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                    value={uForm.password}
                    onChange={(e) => setUForm({ ...uForm, password: e.target.value })}
                    required={!editingUserId}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    value={uForm.role}
                    onChange={(e) => setUForm({ ...uForm, role: e.target.value })}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    {editingUserId ? "Mettre à jour" : "Créer l’utilisateur"}
                  </button>
                  {editingUserId && (
                    <button className="btn btn-outline-secondary" type="button" onClick={resetUserForm}>
                      Annuler
                    </button>
                  )}
                </div>
              </form>

              <hr />

              {/* Liste des utilisateurs */}
              {usersError && <div className="alert alert-warning py-2">{usersError}</div>}
              <ul className="list-group">
                {users.map((u) => (
                  <li key={u.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <div>
                      <strong>{u.firstName} {u.lastName}</strong> — {u.email} —{" "}
                      <span className={`badge ${u.role === "admin" ? "bg-danger" : "bg-secondary"}`}>
                        {u.role}
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => editUser(u)}>
                        Modifier
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u.id)}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
                {users.length === 0 && <li className="list-group-item">Aucun utilisateur</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* VINYLES */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <strong>Vinyles</strong>
            </div>
            <div className="card-body">
              {/* Formulaire: création + édition */}
              <form className="row g-2" onSubmit={submitVinyl}>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Titre"
                    value={vForm.title}
                    onChange={(e) => setVForm({ ...vForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6 col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    step="0.01"
                    placeholder="Prix"
                    value={vForm.price}
                    onChange={(e) => setVForm({ ...vForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6 col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Stock"
                    value={vForm.stock}
                    onChange={(e) => setVForm({ ...vForm, stock: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Catégorie (BestSellers | NewArrival | Rock ...)"
                    value={vForm.category}
                    onChange={(e) => setVForm({ ...vForm, category: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Image (URL ou fichier)"
                    value={vForm.image}
                    onChange={(e) => setVForm({ ...vForm, image: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <input
                    className="form-control"
                    placeholder="Audio sample (URL)"
                    value={vForm.audioSample}
                    onChange={(e) => setVForm({ ...vForm, audioSample: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={vForm.description}
                    onChange={(e) => setVForm({ ...vForm, description: e.target.value })}
                  />
                </div>
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-dark" type="submit">
                    {editingVinylId ? "Mettre à jour" : "Ajouter le vinyle"}
                  </button>
                  {editingVinylId && (
                    <button className="btn btn-outline-secondary" type="button" onClick={resetVinylForm}>
                      Annuler
                    </button>
                  )}
                </div>
              </form>

              <hr />

              {/* Liste des vinyles */}
              {vinylsError && <div className="alert alert-warning py-2">{vinylsError}</div>}
              <ul className="list-group">
                {vinyls.map((v) => (
                  <li key={v.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="me-2">
                      <strong>{v.title}</strong> — {Number(v.price).toFixed(2)} TND —{" "}
                      <span className="badge bg-secondary">{v.category || "N/A"}</span>{" "}
                      <span className="badge bg-light text-dark">Stock: {v.stock ?? 0}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => editVinyl(v)}>
                        Modifier
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteVinyl(v.id)}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
                {vinyls.length === 0 && <li className="list-group-item">Aucun vinyle</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}