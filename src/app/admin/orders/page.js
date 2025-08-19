"use client"
import { useEffect, useState } from "react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("/api/admin/orders", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
  }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    )
  }

  const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

  return (
    <div className="container py-5">
      <h2 className="mb-4">Commandes client</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{order.userInfo.firstName} {order.userInfo.lastName}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <span className={`badge bg-${order.status === "delivered" ? "success" : "warning"}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="form-select"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}