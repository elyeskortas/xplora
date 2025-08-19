"use client"
import { useAuth } from "../../../context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login?redirect=/profile")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-person-circle"></i> Mon Profil
              </h3>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Prénom:</strong>
                </div>
                <div className="col-sm-9">{user?.firstName}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Nom:</strong>
                </div>
                <div className="col-sm-9">{user?.lastName}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Email:</strong>
                </div>
                <div className="col-sm-9">{user?.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Rôle:</strong>
                </div>
                <div className="col-sm-9">
                  <span className={`badge ${user?.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                    {user?.role === "admin" ? "Administrateur" : "Utilisateur"}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Statut:</strong>
                </div>
                <div className="col-sm-9">
                  <span className={`badge ${user?.isVerified ? "bg-success" : "bg-warning"}`}>
                    {user?.isVerified ? "Vérifié" : "Non vérifié"}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">
                <i className="bi bi-pencil"></i> Modifier le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
