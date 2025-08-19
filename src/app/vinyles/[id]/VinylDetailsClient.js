"use client"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import Link from "next/link" // Importez Link

export default function VinylDetailsClient({ vinyl }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    // Assurez-vous que le vinyle a un ID valide
    const vinylWithId = {
      ...vinyl,
      id: vinyl.id || vinyl._id?.toString(),
    }

    addToCart(vinylWithId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/images/${vinyl.image}`}
            alt={vinyl.title}
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h1>{vinyl.title}</h1>
          <p className="my-3">{vinyl.description}</p>
          <p>
            <strong>Prix :</strong> ${vinyl.price.toFixed(2)}
          </p>
          <p>
            <strong>Catégorie :</strong> {vinyl.category}
          </p>
          <p>
            <strong>Stock disponible :</strong> {vinyl.stock}
          </p>

          <button
  onClick={handleAddToCart}
  disabled={added || vinyl.stock === 0}
  className={`btn ${added ? "btn-success" : "btn-primary"} me-2`}
>
  {added
    ? "Ajouté au panier !"
    : vinyl.stock === 0
    ? "Rupture de stock"
    : "Ajouter au panier"}
</button>


          {/* Correction: Utilisation de Link au lieu de <a> */}
          <Link href="/vinyles" className="btn btn-outline-secondary">
            Retour à la liste
          </Link>
        </div>
      </div>

      {vinyl.soundcloud && (
        <div className="my-4">
          <h3>Écoute un extrait :</h3>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={vinyl.soundcloud}
            title={`Extrait ${vinyl.title}`}
          />
        </div>
      )}
    </>
  )
}
