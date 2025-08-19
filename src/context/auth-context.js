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
      console.log("AuthContext: Vérification de l'authentification...")
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

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
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password, role) => {
    try {
      console.log("AuthContext: Tentative de connexion pour:", email)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, role }),
      })

      const data = await response.json()
      console.log("AuthContext: Réponse login:", response.status)

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Connexion réussie" }
      } else {
        return { success: false, message: data.message || "Erreur de connexion" }
      }
    } catch (error) {
      console.error("AuthContext: Erreur de connexion:", error)
      return { success: false, message: "Erreur de connexion" }
    }
  }

  const register = async (userData) => {
    try {
      console.log("AuthContext: Tentative d'inscription pour:", userData.email)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      console.log("AuthContext: Réponse register:", response.status)

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Inscription réussie" }
      } else {
        return { success: false, message: data.message || "Erreur d'inscription" }
      }
    } catch (error) {
      console.error("AuthContext: Erreur d'inscription:", error)
      return { success: false, message: "Erreur d'inscription" }
    }
  }

  const logout = async () => {
    try {
      console.log("AuthContext: Déconnexion...")
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      
      setUser(null)
      console.log("AuthContext: Déconnexion réussie")
      return { success: true }
    } catch (error) {
      console.error("AuthContext: Erreur lors de la déconnexion:", error)
      setUser(null) // Déconnecter quand même côté client
      return { success: false }
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
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
}