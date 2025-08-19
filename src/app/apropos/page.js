import React from 'react';

export default function AboutPage() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">À Propos de Vinylia</h1>
      <p className="lead text-center">
        Bienvenue chez Vinylia, votre destination ultime pour les amateurs de vinyles.
      </p>
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Notre Histoire</h2>
          <p>
            Vinylia est née d&apos;une passion profonde pour la musique et le format vinyle.
            Fondée en [Année de fondation], notre mission a toujours été de créer un espace
            où les collectionneurs et les nouveaux venus peuvent découvrir des trésors musicaux,
            des classiques intemporels aux dernières nouveautés. Nous croyons en la magie
            de tenir un album entre ses mains, de lire les notes de pochette et de vivre
            une expérience d&apos;écoute authentique.
          </p>
        </div>
        <div className="col-md-6">
          <h2>Notre Engagement</h2>
          <p>
            Nous nous engageons à offrir une sélection de vinyles de haute qualité,
            soigneusement curatée pour garantir une expérience d&apos;écoute exceptionnelle.
            Chaque vinyle est inspecté pour s&apos;assurer qu&apos;il répond à nos standards.
            Nous nous efforçons également de fournir un service client irréprochable,
            avec des livraisons rapides et un support attentif pour toutes vos questions.
            Chez Vinylia, la musique est plus qu&apos;un simple son, c&apos;est une expérience.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h3>Rejoignez la Communauté Vinylia</h3>
          <p>
            Suivez-nous sur les réseaux sociaux et inscrivez-vous à notre newsletter
            pour rester informé des nouvelles arrivées, des offres spéciales et des événements.
            Partagez votre passion pour le vinyle avec nous !
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#" className="btn btn-outline-dark"><i className="bi bi-facebook"></i></a>
            <a href="#" className="btn btn-outline-dark"><i className="bi bi-instagram"></i></a>
            <a href="#" className="btn btn-outline-dark"><i className="bi bi-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}
