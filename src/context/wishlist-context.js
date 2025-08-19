"use client"
import { createContext, useContext, useState, useEffect } from "react"

const WishlistContext = createContext(undefined) // Initialiser avec undefined pour le type

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  // Charger la wishlist depuis le localStorage au montage du composant
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist")
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist))
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la wishlist depuis localStorage:", error)
      // En cas d'erreur (ex: JSON invalide), réinitialiser la wishlist
      setWishlist([])
    }
  }, [])

  // Sauvegarder la wishlist dans le localStorage chaque fois qu'elle change
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la wishlist dans localStorage:", error)
    }
  }, [wishlist])

  const addToWishlist = (item) => {
    setWishlist((prevItems) => {
      // Vérifier si l'article est déjà dans la wishlist
      if (!prevItems.some((i) => i.id === item.id)) {
        return [...prevItems, item]
      }
      return prevItems // Retourner l'état précédent si l'article existe déjà
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist doit être utilisé à l'intérieur d'un WishlistProvider")
  }
  return context
}
