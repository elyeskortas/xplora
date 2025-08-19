"use client"
import { useEffect, useState } from "react"

export default function Toast({ message, type = "info", show, onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        onClose && onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  if (!visible) return null

  const getToastClass = () => {
    switch (type) {
      case "success":
        return "bg-success text-white"
      case "error":
        return "bg-danger text-white"
      case "warning":
        return "bg-warning text-dark"
      default:
        return "bg-info text-white"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return "bi-check-circle"
      case "error":
        return "bi-x-circle"
      case "warning":
        return "bi-exclamation-triangle"
      default:
        return "bi-info-circle"
    }
  }

  return (
    <div
      className={`toast show position-fixed ${getToastClass()}`}
      style={{
        top: "20px",
        right: "20px",
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <div className="toast-body d-flex align-items-center">
        <i className={`bi ${getIcon()} me-2`}></i>
        {message}
        <button
          type="button"
          className="btn-close btn-close-white ms-auto"
          onClick={() => {
            setVisible(false)
            onClose && onClose()
          }}
        ></button>
      </div>
    </div>
  )
}
