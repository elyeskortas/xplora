// C:\Users\MSI\vinylia\src\app\vinyles\VinylListClient.js
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useWishlist } from "@/context/wishlist-context"
import { useAuth } from "@/context/auth-context"

const FALLBACK_CATEGORY = "General"

export default function VinylListClient({ vinyls: initialVinyls = [] }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { isAuthenticated, isAdmin } = useAuth()

  // Données locales
  const [vinyls, setVinyls] = useState(() =>
    (initialVinyls || []).map((v) => ({
      ...v,
      id: v._id?.toString?.() || v.id,
      image: v.image || v.img,
    }))
  )
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [sortKey, setSortKey] = useState("title") // title | price | stock | createdAt
  const [sortDir, setSortDir] = useState("asc") // asc | desc
  const [query, setQuery] = useState("")
  const [busyId, setBusyId] = useState(null)

  // Modale d’édition
  const [editOpen, setEditOpen] = useState(false)
  const [editVinyl, setEditVinyl] = useState(null)
  const [feedback, setFeedback] = useState(null)

  // Catégories disponibles
  const categories = useMemo(() => {
    const set = new Set(
      vinyls
        .map((v) => v.category)
        .filter(Boolean)
    )
    return ["Toutes", ...Array.from(set)]
  }, [vinyls])

  // Filtre + recherche + tri
  const visibleVinyls = useMemo(() => {
    let list = [...vinyls]

    if (selectedCategory !== "Toutes") {
      list = list.filter((v) => v.category === selectedCategory)
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (v) =>
          v.title?.toLowerCase().includes(q) ||
          v.description?.toLowerCase().includes(q)
      )
    }

    const dir = sortDir === "asc" ? 1 : -1
    list.sort((a, b) => {
      const av = valueForSort(a, sortKey)
      const bv = valueForSort(b, sortKey)
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1

      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir
      const as = String(av).toLowerCase()
      const bs = String(bv).toLowerCase()
      if (as < bs) return -1 * dir
      if (as > bs) return 1 * dir
      return 0
    })

    return list
  }, [vinyls, selectedCategory, query, sortKey, sortDir])

  function valueForSort(v, key) {
    switch (key) {
      case "price":
        return typeof v.price === "number" ? v.price : Number(v.price ?? NaN)
      case "stock":
        return typeof v.stock === "number" ? v.stock : Number(v.stock ?? NaN)
      case "createdAt":
        return v.createdAt ? new Date(v.createdAt).getTime() : null
      case "title":
      default:
        return v.title ?? ""
    }
  }

  function toggleWishlist(v) {
    const id = v._id?.toString?.() || v.id
    const inWishlist = wishlist.some((i) => i.id === id)
    if (inWishlist) removeFromWishlist(id)
    else addToWishlist({ ...v, id })
  }

  async function toggleBestSeller(v) {
    if (!isAdmin) return
    try {
      setBusyId(v.id)
      const newCategory = v.category === "BestSellers" ? FALLBACK_CATEGORY : "BestSellers"
      const payload = { id: v.id, category: newCategory }

      const res = await fetch("/api/vinyls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Échec de la mise à jour")
      const updated = await res.json()

      setVinyls((prev) => prev.map((x) => (x.id === v.id ? { ...x, ...updated } : x)))
      setFeedback({
        type: "success",
        text:
          newCategory === "BestSellers"
            ? "Ajouté aux BestSellers ✅"
            : "Retiré des BestSellers ✅",
      })
    } catch (e) {
      setFeedback({ type: "danger", text: "Impossible de modifier la catégorie." })
    } finally {
      setBusyId(null)
    }
  }

  function openEditModal(v) {
    if (!isAdmin) return
    setEditVinyl({
      ...v,
      price: v.price ?? 0,
      stock: v.stock ?? 0,
      image: v.image || v.img || "",
      audioSample: v.audioSample || v.soundcloud || "",
      category: v.category || "",
      description: v.description || "",
      title: v.title || "",
    })
    setEditOpen(true)
  }

  async function saveEdit(e) {
    e.preventDefault()
    if (!editVinyl) return
    try {
      setBusyId(editVinyl.id)
      const payload = {
        id: editVinyl.id,
        title: editVinyl.title?.trim(),
        price: Number(editVinyl.price || 0),
        stock: Number(editVinyl.stock || 0),
        image: editVinyl.image?.trim(),
        audioSample: editVinyl.audioSample?.trim(),
        category: editVinyl.category?.trim(),
        description: editVinyl.description?.trim(),
      }

      const res = await fetch("/api/vinyls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Échec de la mise à jour")
      const updated = await res.json()

      setVinyls((prev) => prev.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)))
      setFeedback({ type: "success", text: "Vinyle mis à jour ✅" })
      setEditOpen(false)
      setEditVinyl(null)
    } catch (e) {
      setFeedback({ type: "danger", text: "Impossible d’enregistrer les modifications." })
    } finally {
      setBusyId(null)
    }
  }

  function closeModal() {
    if (busyId) return
    setEditOpen(false)
    setEditVinyl(null)
  }

  function imgSrcFor(v) {
    const name = v.image || v.img || "placeholder-vinyl.png"
    return `/images/${name}`
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Nos vinyles</h2>

      {/* Feedback alert */}
      {feedback && (
        <div className={`alert alert-${feedback.type} d-flex align-items-center`} role="alert">
          <i className={`bi me-2 ${feedback.type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}></i>
          <div>{feedback.text}</div>
          <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={() => setFeedback(null)} />
        </div>
      )}

      {/* Toolbar: catégories + recherche + tri */}
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${selectedCategory === cat ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ms-auto d-flex gap-2 align-items-center">
          <input
            className="form-control form-control-sm"
            placeholder="Rechercher un vinyle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: 220 }}
          />
          <select className="form-select form-select-sm" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="title">Titre</option>
            <option value="price">Prix</option>
            <option value="stock">Stock</option>
            <option value="createdAt">Date (récents)</option>
          </select>
          <select className="form-select form-select-sm" value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* Sélecteur de catégorie (mobile friendly) */}
        <div className="w-100 d-md-none"></div>
        <select
          className="form-select form-select-sm d-md-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={`mob-${cat}`} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grid des vinyles */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {visibleVinyls.map((vinyl) => {
          const id = vinyl.id
          const inWishlist = wishlist.some((item) => item.id === id)
          const isBest = vinyl.category === "BestSellers"

          return (
            <div className="col" key={id}>
              <div className="card h-100 position-relative shadow-sm">
                <Link href={`/vinyles/${id}`} className="text-decoration-none text-dark">
                  <img
                    src={imgSrcFor(vinyl)}
                    className="card-img-top"
                    alt={vinyl.title}
                    style={{ height: 200, objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.src = "/images/placeholder-vinyl.png" }}
                  />
                </Link>

                {isBest && (
                  <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Best Seller</span>
                )}

                <button
                  onClick={() => toggleWishlist(vinyl)}
                  className={`btn btn-sm ${inWishlist ? "btn-danger" : "btn-outline-primary"}`}
                  style={{ position: "absolute", top: 10, right: 10 }}
                  aria-label={inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                >
                  {inWishlist ? "♥" : "♡"}
                </button>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{vinyl.title}</h5>
                  <p className="card-text mb-1">{typeof vinyl.price === "number" ? `${vinyl.price.toFixed(2)} TND` : `${Number(vinyl.price || 0).toFixed(2)} TND`}</p>
                  {vinyl.stock != null && <p className="card-text text-muted small mb-2">Stock: {vinyl.stock}</p>}
                  {vinyl.category && <span className="badge bg-secondary align-self-start">{vinyl.category}</span>}

                  {/* Actions Admin */}
                  {isAdmin && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => toggleBestSeller(vinyl)}
                        disabled={busyId === vinyl.id}
                        title={isBest ? "Retirer des BestSellers" : "Mettre en BestSeller"}
                      >
                        {busyId === vinyl.id ? (
                          <><span className="spinner-border spinner-border-sm me-1" />...</>
                        ) : isBest ? (
                          <>Retirer BestSeller</>
                        ) : (
                          <>Mettre BestSeller</>
                        )}
                      </button>

                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => openEditModal(vinyl)}
                      >
                        Éditer
              
                      </button>
                      <button
  className="btn btn-sm btn-outline-danger"
  onClick={() => {
    if (confirm("Supprimer ce vinyle ?")) {
      fetch("/api/vinyls", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: vinyl.id }),
      })
      .then((res) => {
        if (res.ok) {
          setVinyls((prev) => prev.filter((v) => v.id !== vinyl.id))
        } else {
          alert("Échec de suppression")
        }
      })
    }
  }}
>
  Supprimer
</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {visibleVinyls.length === 0 && (
          <div className="col-12">
            <div className="alert alert-light border text-center">
              Aucun vinyle ne correspond à vos filtres.
            </div>
          </div>
        )}
      </div>

      {/* Modale d’édition (contrôlée en React, sans JS Bootstrap) */}
      {editOpen && editVinyl && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={saveEdit}>
                <div className="modal-header">
                  <h5 className="modal-title">Modifier le vinyle</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Titre</label>
                      <input className="form-control"
                        value={editVinyl.title}
                        onChange={(e) => setEditVinyl({ ...editVinyl, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Prix</label>
                      <input type="number" step="0.01" className="form-control"
                        value={editVinyl.price}
                        onChange={(e) => setEditVinyl({ ...editVinyl, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Stock</label>
                      <input type="number" className="form-control"
                        value={editVinyl.stock}
                        onChange={(e) => setEditVinyl({ ...editVinyl, stock: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Catégorie</label>
                      <input className="form-control"
                        placeholder="BestSellers, NewArrival, Rock..."
                        value={editVinyl.category}
                        onChange={(e) => setEditVinyl({ ...editVinyl, category: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Image (fichier dans /public/images)</label>
                      <input className="form-control"
                        placeholder="ex: dark_side.jpg"
                        value={editVinyl.image}
                        onChange={(e) => setEditVinyl({ ...editVinyl, image: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Audio sample (URL)</label>
                      <input className="form-control"
                        placeholder="https://..."
                        value={editVinyl.audioSample}
                        onChange={(e) => setEditVinyl({ ...editVinyl, audioSample: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows={3}
                        value={editVinyl.description}
                        onChange={(e) => setEditVinyl({ ...editVinyl, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={closeModal} disabled={!!busyId}>Annuler</button>
                  <button type="submit" className="btn btn-dark" disabled={!!busyId}>
                    {busyId ? <><span className="spinner-border spinner-border-sm me-2" />Enregistrement...</> : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}