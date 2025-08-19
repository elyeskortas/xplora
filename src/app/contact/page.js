import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Contactez-nous</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <p className="lead text-center">
            Nous sommes là pour répondre à toutes vos questions et vous aider avec vos commandes.
            N&apos;hésitez pas à nous contacter via les méthodes ci-dessous.
          </p>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Service Client</h5>
              <p className="card-text">
                Pour toute question concernant une commande, un produit ou une assistance générale.
              </p>
              <ul className="list-unstyled">
                <li><i className="bi bi-envelope-fill me-2"></i> Email: <a href="mailto:support@vinylia.com">support@vinylia.com</a></li>
                <li><i className="bi bi-telephone-fill me-2"></i> Téléphone: +33 1 23 45 67 89 (Du lundi au vendredi, 9h-17h)</li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Presse & Partenariats</h5>
              <p className="card-text">
                Pour les demandes de presse, les collaborations ou les opportunités de partenariat.
              </p>
              <ul className="list-unstyled">
                <li><i className="bi bi-envelope-fill me-2"></i> Email: <a href="mailto:partenariats@vinylia.com">partenariats@vinylia.com</a></li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Adresse de notre bureau</h5>
              <p className="card-text">
                Vinylia HQ<br />
                Rue Gamaoun<br />
                4022 Akouda,Sousse
              </p>
              <p className="text-muted small">Veuillez noter que ce n&apos;est pas une boutique physique.</p>
            </div>
          </div>

          <div className="text-center mt-5">
            <p>Suivez-nous sur les réseaux sociaux pour les dernières nouvelles et mises à jour :</p>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com/vinylia" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-lg rounded-circle">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com/vinylia" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-lg rounded-circle">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com/vinylia" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-lg rounded-circle">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
