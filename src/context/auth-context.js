"use client"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
<<<<<<< HEAD
      console.log("AuthContext: Vérification de l'authentification...")
      const response = await fetch("/api/auth/me", {
=======
      const response = await fetch("/api/auth/me", {
        method: "GET",
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

<<<<<<< HEAD
      console.log("AuthContext: Réponse /auth/me:", response.status)

      if (response.ok) {
        const userData = await response.json()
        console.log("AuthContext: Utilisateur connecté:", userData.email)
        setUser(userData)
      } else {
        console.log("AuthContext: Utilisateur non connecté")
        setUser(null)
      }
    } catch (error) {
      console.error("AuthContext: Erreur lors de la vérification de l'authentification:", error)
      setUser(null)
=======
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else if (response.status === 401) {
        // 401 est normal quand l'utilisateur n'est pas connecté
        // Ne pas logger cette erreur
        setUser(null)
      } else {
        // Autres erreurs (500, etc.)
        console.error("Erreur lors de la vérification de l'authentification:", response.status)
      }
    } catch (error) {
      // Erreur réseau ou autre
      console.error("Erreur réseau lors de la vérification de l'authentification:", error)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  const login = async (email, password, role) => {
    try {
      console.log("AuthContext: Tentative de connexion pour:", email)
=======
  const login = async (email, password) => {
    try {
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
<<<<<<< HEAD
        body: JSON.stringify({ email, password, role }),
      })

      const data = await response.json()
      console.log("AuthContext: Réponse login:", response.status)
=======
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Connexion réussie" }
      } else {
        return { success: false, message: data.message || "Erreur de connexion" }
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("AuthContext: Erreur de connexion:", error)
=======
      console.error("Erreur de connexion:", error)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      return { success: false, message: "Erreur de connexion" }
    }
  }

  const register = async (userData) => {
    try {
<<<<<<< HEAD
      console.log("AuthContext: Tentative d'inscription pour:", userData.email)
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })

      const data = await response.json()
<<<<<<< HEAD
      console.log("AuthContext: Réponse register:", response.status)
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Inscription réussie" }
      } else {
        return { success: false, message: data.message || "Erreur d'inscription" }
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("AuthContext: Erreur d'inscription:", error)
=======
      console.error("Erreur d'inscription:", error)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      return { success: false, message: "Erreur d'inscription" }
    }
  }

  const logout = async () => {
    try {
<<<<<<< HEAD
      console.log("AuthContext: Déconnexion...")
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
<<<<<<< HEAD
      
      setUser(null)
      console.log("AuthContext: Déconnexion réussie")
      return { success: true }
    } catch (error) {
      console.error("AuthContext: Erreur lors de la déconnexion:", error)
      setUser(null) // Déconnecter quand même côté client
      return { success: false }
=======

      if (response.ok) {
        setUser(null)
        return { success: true, message: "Déconnexion réussie" }
      } else {
        // Même si la déconnexion côté serveur échoue, on déconnecte côté client
        setUser(null)
        return { success: true, message: "Déconnexion effectuée" }
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Déconnecter quand même côté client
      setUser(null)
      return { success: true, message: "Déconnexion effectuée" }
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

<<<<<<< HEAD
=======
  const refreshAuth = () => {
    checkAuth()
  }

>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
<<<<<<< HEAD
=======
    refreshAuth,
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider")
  }
  return context
<<<<<<< HEAD
}
=======
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
