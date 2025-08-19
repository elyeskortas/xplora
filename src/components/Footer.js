import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Vinylia</h5>
            <p>
              Votre destination ultime pour les vinyles de collection et les nouveautés.
              Plongez dans le son authentique.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Liens Rapides</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-white text-decoration-none">Accueil</Link></li>
              <li><Link href="/vinyles" className="text-white text-decoration-none">Collection</Link></li>
              <li><Link href="/articles" className="text-white text-decoration-none">Blog</Link></li>
              <li><Link href="/apropos" className="text-white text-decoration-none">À Propos</Link></li>
              <li><Link href="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contactez-nous</h5>
            <p><i className="bi bi-geo-alt-fill me-2"></i> Rue Gamaoun, 4022 Akouda, Sousse</p>
            <p><i className="bi bi-envelope-fill me-2"></i> info@vinylia.com</p>
            <p><i className="bi bi-phone-fill me-2"></i> +33 1 23 45 67 89</p>
            <div className="d-flex mt-3">
              <Link href="#" className="text-white me-3 fs-4"><i className="bi bi-facebook"></i></Link>
              <Link href="#" className="text-white me-3 fs-4"><i className="bi bi-twitter"></i></Link>
              <Link href="#" className="text-white me-3 fs-4"><i className="bi bi-instagram"></i></Link>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Vinylia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
