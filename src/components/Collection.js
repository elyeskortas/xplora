import Link from "next/link" // Importez Link

export default function Collection() {
  return (
    <section className="collection bg-light py-5">
      <div className="container">
        <h2 className="text-uppercase text-center mb-5">Collection</h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/images/the beatles.jpg" alt="The Beatles" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3>The Beatles – The Vinyl Collection 2025 Edition</h3>
            <p>Une édition limitée regroupant tous les albums studio remastérisés...</p>
            {/* Correction: Utilisation de Link au lieu de <a> */}
            <Link href="/vinyles?category=Collection" className="btn btn-dark mt-3">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
