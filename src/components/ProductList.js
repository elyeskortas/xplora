"use client";
import { useState, useEffect } from "react";
import Filters from "./Filters";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = ({ search, genre, maxPrice }) => {
    let res = [...products];
    if (search) res = res.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (genre) res = res.filter((p) => p.genre === genre);
    if (!isNaN(maxPrice)) res = res.filter((p) => p.price <= maxPrice);
    setFiltered(res);
  };

  return (
    <div>
      <Filters onFilter={handleFilter} />
      <div className="row">
        {filtered.length === 0 && <p>Aucun produit trouvé.</p>}
        {filtered.map((p) => (
          <div key={p.id} className="col-md-4 mb-4 d-flex">
            <div className="card product-card w-100">
              {/* ✅ Image contenue dans une zone fixe */}
              <div className="card-img-container">
                <img src={p.image} alt={p.title} />
              </div>

              {/* ✅ Contenu vertical avec boutons alignés */}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-center">{p.title}</h5>
                  <p className="card-text text-center">
                    {p.genre} · ${p.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-center mt-auto">
                  <button
                    className="btn btn-outline-dark me-2 mb-2"
                    onClick={() => addToCart(p)}
                  >
                    Ajouter au panier
                  </button>
                  {wishlist.some((i) => i.id === p.id) ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => removeFromWishlist(p.id)}
                    >
                      ♥ Retirer
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => addToWishlist(p)}
                    >
                      ♡ Wishlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}