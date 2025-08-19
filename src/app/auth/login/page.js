"use client"
import { useState } from "react"
import { useAuth } from "@/context/auth-context" // Chemin corrigé
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

<<<<<<< HEAD
    const result = await login(formData.email, formData.password, "user")
=======
    const result = await login(formData.email, formData.password)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

    if (result.success) {
      router.push("/")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img src="/images/vinylia.png" alt="Vinylia" style={{ height: "60px" }} />
                <h2 className="mt-3">Connexion</h2>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock"></i> Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Votre mot de passe"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Connexion...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i> Se connecter
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Pas encore de compte ?{" "}
                  <Link href="/auth/register" className="text-decoration-none">
                    S&apos;inscrire
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
