"use client"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import Link from "next/link" // Assurez-vous que Link est importé
import Image from "next/image"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0)
    return (
      <main className="container py-5 text-center">
        <h2 className="mb-4">Votre wishlist est vide</h2>
        <p>Ajoutez des vinyles pour les retrouver ici !</p>
        <Link href="/vinyles" className="btn btn-primary mt-3">
          Explorer les vinyles
        </Link>
      </main>
    )

  return (
    <main className="container py-5">
      <h2 className="mb-4">Ma Wishlist</h2>
      <div className="row">
        {wishlist.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={`/images/${p.image}`} className="card-img-top" alt={p.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p>${p.price.toFixed(2)}</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-dark me-2" onClick={() => addToCart(p)}>
                    Ajouter au panier
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => removeFromWishlist(p.id)}>
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
