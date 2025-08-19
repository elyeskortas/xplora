"use client"
import { useWishlist } from "@/context/wishlist-context"
import { useAuth } from "@/context/auth-context"

export default function WishlistButton({ vinyl }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const vinylId = vinyl._id?.toString() || vinyl.id
  const inWishlist = wishlist.some((item) => item.id === vinylId)

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=" + encodeURIComponent(window.location.pathname)
      return
    }

    const vinylWithId = {
      ...vinyl,
      id: vinylId,
    }

    if (inWishlist) {
      removeFromWishlist(vinylId)
    } else {
      addToWishlist(vinylWithId)
    }
  }

  return (
    <button
      onClick={handleWishlistClick}
      className={`btn btn-sm position-absolute ${inWishlist ? "btn-danger" : "btn-outline-danger"}`}
      style={{
        top: "10px",
        right: "10px",
        zIndex: 10,
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
    >
      <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}`}></i>
    </button>
  )
}
