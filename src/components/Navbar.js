"use client"
import Link from "next/link"
import { useCart } from "../context/cart-context"
import { useWishlist } from "../context/wishlist-context"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect, useRef } from "react" // Importez useEffect et useRef
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { cartItems } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout, isAuthenticated, loading } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false) // Pour le dropdown utilisateur
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("") // État pour la barre de recherche
  const [liveSearchResults, setLiveSearchResults] = useState([]) // Nouveaux résultats de recherche en direct
  const [showLiveSearch, setShowLiveSearch] = useState(false) // Visibilité du dropdown de recherche
  const [liveSearchLoading, setLiveSearchLoading] = useState(false) // État de chargement pour la recherche en direct
  const debounceTimeoutRef = useRef(null) // Référence pour le timer de debounce
  const router = useRouter()

  const handleLogout = async () => {
    setLogoutLoading(true)
    const result = await logout()
    setDropdownOpen(false)
    setLogoutLoading(false)

    if (result.success) {
      console.log("Déconnexion réussie")
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Fermer le dropdown utilisateur si on clique ailleurs
  const handleClickOutside = () => {
    if (dropdownOpen) {
      setDropdownOpen(false)
    }
  }

  // Gérer la soumission du formulaire de recherche (pour la page de résultats complète)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("") // Réinitialiser la barre de recherche
      setShowLiveSearch(false) // Cacher les résultats en direct après une recherche complète
    }
  }

  // Effet pour la recherche en temps réel avec debounce
  useEffect(() => {
    // Annuler le timer précédent si l'utilisateur tape à nouveau
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Si la requête est trop courte ou vide, cacher les résultats
    if (searchQuery.trim().length < 2) {
      setLiveSearchResults([])
      setShowLiveSearch(false)
      setLiveSearchLoading(false)
      return
    }

    setLiveSearchLoading(true)
    setShowLiveSearch(true) // Afficher le dropdown dès que l'utilisateur commence à taper

    // Définir un nouveau timer de debounce
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/vinyls/search?query=${encodeURIComponent(searchQuery.trim())}`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setLiveSearchResults(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats de recherche en direct:", error)
        setLiveSearchResults([]) // Vider les résultats en cas d'erreur
      } finally {
        setLiveSearchLoading(false)
      }
    }, 300) // Délai de 300ms

    // Fonction de nettoyage pour annuler le timer si le composant est démonté ou la dépendance change
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [searchQuery]) // Déclenche cet effet à chaque changement de searchQuery

  // Gérer la perte de focus de la barre de recherche (pour cacher le dropdown)
  const handleSearchBlur = () => {
    // Utiliser un petit délai pour permettre le clic sur un élément du dropdown avant qu'il ne disparaisse
    setTimeout(() => {
      setShowLiveSearch(false)
    }, 150)
  }

  // Gérer le focus sur la barre de recherche (pour réafficher le dropdown si des résultats existent)
  const handleSearchFocus = () => {
    if (searchQuery.trim().length >= 2 && liveSearchResults.length > 0) {
      setShowLiveSearch(true)
    }
  }

  return (
    <>
      {/* Overlay pour fermer le dropdown utilisateur */}
      {dropdownOpen && (
        <div
          className="position-fixed w-100 h-100"
          style={{ top: 0, left: 0, zIndex: 999 }}
          onClick={handleClickOutside}
        />
      )}

      <nav className="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center w-100">
            <div className="col-auto">
              <Link href="/" className="navbar-brand text-dark">
                <img src="/images/vinylia.png" alt="Vinylia Logo" style={{ height: "100px" }} />
              </Link>
            </div>

            <div className="col-auto">
              <ul className="navbar-nav gap-3">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/vinyles" className="nav-link">
                    Nos vinyles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/articles" className="nav-link">
                    Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/apropos" className="nav-link">
                    À propos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact" className="nav-link">
                    Nous Contacter
                  </Link>
                </li>
                {/* AJOUT DU LIEN CHATBOT */}
                <li className="nav-item">
                  <Link href="/chatbot" className="nav-link">
                    <i className="bi bi-chat-dots"></i> Chatbot
                  </Link>
                </li>
<<<<<<< HEAD
                <Link href="/admin" className="nav-link">
  <i className="bi bi-speedometer2"></i> Dashboard
</Link>
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
                {/* FIN AJOUT DU LIEN CHATBOT */}
                <li className="nav-item">
                  <Link href="/wishlist" className="nav-link">
                    <i className="bi bi-heart"></i> Wishlist ({wishlist.length})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/panier" className="nav-link">
                    <i className="bi bi-cart"></i> Panier ({cartItems.length})
                  </Link>
                </li>

                {/* Section Authentification */}
                {loading ? (
                  <li className="nav-item">
                    <span className="nav-link">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Chargement...</span>
                      </div>
                    </span>
                  </li>
                ) : isAuthenticated ? (
                  <li className="nav-item dropdown position-relative">
                    <button
                      className="nav-link dropdown-toggle btn btn-link text-decoration-none text-uppercase"
                      onClick={toggleDropdown}
                      style={{ border: "none", background: "none" }}
                      disabled={logoutLoading}
                    >
                      <i className="bi bi-person-circle"></i> {user?.firstName}
                    </button>
                    {dropdownOpen && (
                      <ul className="dropdown-menu show position-absolute" style={{ right: 0, zIndex: 1000 }}>
                        <li>
                          <div className="dropdown-header">
                            <strong>
                              {user?.firstName} {user?.lastName}
                            </strong>
                            <br />
                            <small className="text-muted">{user?.email}</small>
                          </div>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link href="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                            <i className="bi bi-person"></i> Mon profil
                          </Link>
                        </li>
                        <li>
                          <Link href="/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                            <i className="bi bi-bag"></i> Mes commandes
                          </Link>
                        </li>
                        {user?.role === "admin" && (
                          <>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <Link href="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                <i className="bi bi-gear"></i> Administration
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={handleLogout} disabled={logoutLoading}>
                            {logoutLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Déconnexion...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-box-arrow-right"></i> Déconnexion
                              </>
                            )}
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link href="/auth/login" className="nav-link">
                        <i className="bi bi-box-arrow-in-right"></i> Connexion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/auth/register" className="nav-link">
                        <i className="bi bi-person-plus"></i> Inscription
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="col-auto">
              <form onSubmit={handleSearchSubmit} className="position-relative">
                {" "}
                {/* Ajout de position-relative */}
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Recherche..."
                    style={{ minWidth: "200px" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus} // Gérer le focus
                    onBlur={handleSearchBlur} // Gérer la perte de focus
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
                {/* Dropdown des résultats de recherche en direct */}
                {showLiveSearch && searchQuery.trim().length >= 2 && (
                  <div className="list-group position-absolute w-100 mt-1 shadow-lg" style={{ zIndex: 1001 }}>
                    {liveSearchLoading ? (
                      <div className="list-group-item text-center">
                        <div className="spinner-border spinner-border-sm" role="status"></div> Chargement...
                      </div>
                    ) : liveSearchResults.length > 0 ? (
                      liveSearchResults.map((vinyl) => (
                        <Link
                          key={vinyl.id || vinyl._id}
                          href={`/vinyles/${vinyl.id || vinyl._id}`}
                          className="list-group-item list-group-item-action d-flex align-items-center"
                          onClick={() => {
                            setSearchQuery("") // Vider la recherche après le clic
                            setShowLiveSearch(false) // Cacher le dropdown
                          }}
                        >
                          <img
                            src={`/images/${vinyl.image || vinyl.img}`}
                            alt={vinyl.title}
                            style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px" }}
                            onError={(e) => {
<<<<<<< HEAD
                              e.target.src = "/images/placeholder-vinyl.png"
=======
                              e.target.src = "/images/placeholder-vinyl.jpg"
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
                            }}
                          />
                          <div>
                            <h6 className="mb-0">{vinyl.title}</h6>
                            <small className="text-muted">${vinyl.price.toFixed(2)}</small>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="list-group-item text-muted">Aucun résultat trouvé.</div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
