"use client"
import { useEffect, useState } from "react"

export default function StatsPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setStats(data))
  }, [])

  if (!stats) return <p>Chargement des statistiques...</p>

  return (
    <div className="container py-5">
      <h2 className="mb-4">Statistiques de vente</h2>

      <ul className="list-group mb-4">
        <li className="list-group-item">Nombre de commandes : <strong>{stats.totalOrders}</strong></li>
        <li className="list-group-item">Revenu total : <strong>${stats.totalRevenue.toFixed(2)}</strong></li>
      </ul>

      <h5 className="mb-3">Meilleures ventes</h5>
      <ul className="list-group">
        {stats.bestSellers.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            {item.title}
            <span className="badge bg-primary rounded-pill">{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}