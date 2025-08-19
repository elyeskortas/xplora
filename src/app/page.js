'use client';

import { useCart } from "@/context/cart-context";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import NewArrival from "@/components/NewArrival";
import Collection from "@/components/Collection";
import BestSellers from "@/components/BestSellers";
import ProductList from '@/components/ProductList';

export default function HomePage() {
  const { addToCart, clearCart, cartItems } = useCart();

  return (
    <main>
      {/* Hero section */}
      <Hero />

      {/* Features section */}
      <Features />

      {/* Categories */}
      <Categories />

      {/* New Arrivals */}
      <NewArrival />

    

      {/* Collection spéciale */}
      <Collection />

      {/* Best sellers */}
      <BestSellers />

      {/* Section contact */}
      <section className="py-5 bg-secondary text-white" id="contact">
        <div className="container">
          <h2 className="text-center mb-4">Contactez-nous</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Nom" required />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" placeholder="Email" required />
            </div>
            <div className="col-12">
              <textarea className="form-control" rows={4} placeholder="Votre message" required></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-light mt-3">Envoyer</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">© 2025 Vinylia. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
