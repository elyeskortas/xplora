<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import WishlistButton from "./WishlistButton";

export default function BestSellers() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
=======
"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import WishlistButton from "./WishlistButton"

export default function BestSellers() {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
<<<<<<< HEAD
        setLoading(true);
=======
        setLoading(true)
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
        const res = await fetch("/api/vinyls/bestsellers", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
<<<<<<< HEAD
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Erreur chargement bestsellers:", error);
        setError("Erreur lors du chargement des meilleures ventes");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=/";
      return;
=======
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        setProducts(data)
        setError(null)
      } catch (error) {
        console.error("Erreur chargement bestsellers:", error)
        setError("Erreur lors du chargement des meilleures ventes")
      } finally {
        setLoading(false)
      }
    }

    fetchBestSellers()
  }, [])

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=/"
      return
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    }

    const productWithId = {
      ...product,
      id: product._id?.toString() || product.id,
<<<<<<< HEAD
    };

    addToCart(productWithId);
  };
=======
    }

    addToCart(productWithId)
  }
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372

  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <h4 className="text-uppercase mb-4">Nos Meilleures Ventes</h4>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-2">Chargement des meilleures ventes...</p>
          </div>
        </div>
      </section>
<<<<<<< HEAD
    );
=======
    )
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="container">
          <h4 className="text-uppercase mb-4">Nos Meilleures Ventes</h4>
          <div className="alert alert-warning text-center">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        </div>
      </section>
<<<<<<< HEAD
    );
=======
    )
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  }

  if (products.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <h4 className="text-uppercase mb-4">Nos Meilleures Ventes</h4>
          <div className="text-center">
            <p>Aucune meilleure vente disponible pour le moment.</p>
          </div>
        </div>
      </section>
<<<<<<< HEAD
    );
=======
    )
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-uppercase mb-0">Nos Meilleures Ventes</h4>
          <Link href="/vinyles?category=BestSellers" className="btn btn-outline-dark btn-sm">
            Voir tout <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="d-flex gap-4 overflow-auto" style={{ paddingBottom: "1rem" }}>
          {products.map((product) => {
<<<<<<< HEAD
            const productId = product._id?.toString() || product.id;
            const productImage = product.img || product.image;

            return (
              <div
                key={productId}
=======
            const productId = product._id?.toString() || product.id
            const productImage = product.img || product.image

            return (
              <div
                key={productId} // Clé unique corrigée
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
                className="card product-card shadow-sm"
                style={{ minWidth: "250px", flexShrink: 0, position: "relative" }}
              >
                <Link href={`/vinyles/${productId}`} className="text-decoration-none text-dark">
                  <div className="card-img-container position-relative">
                    <img
                      src={`/images/${productImage}`}
                      alt={product.title}
                      className="card-img-top"
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      onError={(e) => {
<<<<<<< HEAD
                        e.target.src = "/images/placeholder-vinyl.png";
                      }}
                    />
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                      Best Seller
                    </span>
=======
                        e.target.src = "/images/placeholder-vinyl.jpg"
                      }}
                    />
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Best Seller</span>
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
                  </div>
                </Link>

                <WishlistButton vinyl={{ ...product, id: productId }} />

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-center" style={{ fontSize: "1rem" }}>
                      {product.title}
                    </h5>
                    <p className="card-text text-center fw-bold text-primary">${product.price.toFixed(2)}</p>
<<<<<<< HEAD
                    {product.stock && (
                      <p className="card-text text-center text-muted small">Stock: {product.stock}</p>
                    )}
=======
                    {product.stock && <p className="card-text text-center text-muted small">Stock: {product.stock}</p>}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
                  </div>

                  <div className="text-center mt-auto">
                    <button
                      className="btn btn-outline-dark btn-sm w-100"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? (
                        <>
                          <i className="bi bi-x-circle"></i> Rupture de stock
                        </>
                      ) : (
                        <>
                          <i className="bi bi-cart-plus"></i> Ajouter au panier
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            );
=======
            )
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
          })}
        </div>

        {!isAuthenticated && (
          <div className="alert alert-info mt-4">
            <i className="bi bi-info-circle"></i>
            <Link href="/auth/login" className="alert-link ms-2">
              Connectez-vous
            </Link>{" "}
            pour ajouter des articles à votre panier et accéder à toutes les fonctionnalités.
          </div>
        )}
      </div>
    </section>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
}
