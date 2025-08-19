<<<<<<< HEAD
  "use client";

  import Link from "next/link";
  import { useCart } from "@/context/cart-context";
  import { useAuth } from "@/context/auth-context";
  import { useWishlist } from "@/context/wishlist-context";

  export default function SearchClient({ query, vinyls, error }) {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const handleAddToCart = (product) => {
      if (!isAuthenticated) {
        window.location.href = "/auth/login?redirect=/";
        return;
      }
      const productWithId = {
        ...product,
        id: product._id?.toString() || product.id,
      };
      addToCart(productWithId);
    };

    const handleWishlistClick = (e, vinyl) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        window.location.href = "/auth/login?redirect=" + encodeURIComponent(window.location.pathname);
        return;
      }

      const vinylId = vinyl._id?.toString() || vinyl.id;
      const vinylWithId = {
        ...vinyl,
        id: vinylId,
      };

      const inWishlist = wishlist.some((item) => item.id === vinylId);

      if (inWishlist) {
        removeFromWishlist(vinylId);
      } else {
        addToWishlist(vinylWithId);
      }
    };

    return (
      <div className="container py-5">
        <h2 className="mb-4">
          Résultats de recherche pour &quot;{query}&quot;
          {query && vinyls.length > 0 && <span className="text-muted ms-2">({vinyls.length} trouvés)</span>}
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        )}

        {!query && (
          <div className="alert alert-info" role="alert">
            Veuillez entrer un terme de recherche dans la barre de navigation.
          </div>
        )}

        {query && !error && vinyls.length === 0 && (
          <div className="alert alert-warning" role="alert">
            Aucun vinyle trouvé pour &quot;{query}&quot;.
          </div>
        )}

        {vinyls.length > 0 && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {vinyls.map((vinyl) => {
              const vinylId = vinyl._id?.toString() || vinyl.id;
              const productImage = vinyl.img || vinyl.image;
              const inWishlist = wishlist.some((item) => item.id === vinylId);

              return (
                <div className="col" key={vinylId}>
                  <div className="card product-card h-100 shadow-sm position-relative">
                    <Link href={`/vinyles/${vinylId}`} className="text-decoration-none text-dark">
                      <div className="card-img-container">
                        <img
                          src={`/images/${productImage}`}
                          className="card-img-top"
                          alt={vinyl.title}
                          style={{ height: "200px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-vinyl.png";
                          }}
                        />
                      </div>
                    </Link>

                    {/* Bouton Wishlist */}
                    <button
                      onClick={(e) => handleWishlistClick(e, vinyl)}
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

                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title text-center" style={{ fontSize: "1rem" }}>
                          {vinyl.title}
                        </h5>
                        <p className="card-text text-center fw-bold text-primary">${vinyl.price.toFixed(2)}</p>
                        {vinyl.stock && (
                          <p className="card-text text-center text-muted small">Stock: {vinyl.stock}</p>
                        )}
                      </div>
                      <div className="text-center mt-auto">
                        <button
                          className="btn btn-outline-dark btn-sm w-100"
                          onClick={() => handleAddToCart(vinyl)}
                          disabled={vinyl.stock === 0}
                        >
                          {vinyl.stock === 0 ? (
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
                </div>
              );
            })}
          </div>
        )}

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
    );
  }
=======
"use client"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useWishlist } from "@/context/wishlist-context" // Assurez-vous d'importer useWishlist

export default function SearchClient({ query, vinyls, error }) {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist() // Utilisez useWishlist

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=/"
      return
    }
    const productWithId = {
      ...product,
      id: product._id?.toString() || product.id,
    }
    addToCart(productWithId)
  }

  const handleWishlistClick = (e, vinyl) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=" + encodeURIComponent(window.location.pathname)
      return
    }

    const vinylId = vinyl._id?.toString() || vinyl.id
    const vinylWithId = {
      ...vinyl,
      id: vinylId,
    }

    const inWishlist = wishlist.some((item) => item.id === vinylId)

    if (inWishlist) {
      removeFromWishlist(vinylId)
    } else {
      addToWishlist(vinylWithId)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        Résultats de recherche pour &quot;{query}&quot;
        {query && vinyls.length > 0 && <span className="text-muted ms-2">({vinyls.length} trouvés)</span>}
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}
      {!query && (
        <div className="alert alert-info" role="alert">
          Veuillez entrer un terme de recherche dans la barre de navigation.
        </div>
      )}
      {query && !error && vinyls.length === 0 && (
        <div className="alert alert-warning" role="alert">
          Aucun vinyle trouvé pour &quot;{query}&quot;.
        </div>
      )}
      {vinyls.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {vinyls.map((vinyl) => {
            const vinylId = vinyl._id?.toString() || vinyl.id
            const productImage = vinyl.img || vinyl.image
            const inWishlist = wishlist.some((item) => item.id === vinylId)
            return (
              <div className="col" key={vinylId}>
                <div className="card product-card h-100 shadow-sm position-relative">
                  <Link href={`/vinyles/${vinylId}`} className="text-decoration-none text-dark">
                    <div className="card-img-container">
                      <img
                        src={`/images/${productImage}`}
                        className="card-img-top"
                        alt={vinyl.title}
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/images/placeholder-vinyl.jpg"
                        }}
                      />
                    </div>
                  </Link>
                  {/* Bouton Wishlist */}
                  <button
                    onClick={(e) => handleWishlistClick(e, vinyl)}
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
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-center" style={{ fontSize: "1rem" }}>
                        {vinyl.title}
                      </h5>
                      <p className="card-text text-center fw-bold text-primary">${vinyl.price.toFixed(2)}</p>
                      {vinyl.stock && <p className="card-text text-center text-muted small">Stock: {vinyl.stock}</p>}
                    </div>
                    <div className="text-center mt-auto">
                      <button
                        className="btn btn-outline-dark btn-sm w-100"
                        onClick={() => handleAddToCart(vinyl)}
                        disabled={vinyl.stock === 0}
                      >
                        {vinyl.stock === 0 ? (
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
              </div>
            )
          })}
        </div>
      )}
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
  )
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
