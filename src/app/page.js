'use client';

import { useLocale } from '@/context/locale-context'
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { messages } = useLocale()

  const features = [
    { icon: 'bi-geo-alt', title: messages.feature_local_guides_title, text: messages.feature_local_guides_desc },
    { icon: 'bi-calendar-check', title: messages.feature_flexible_title, text: messages.feature_flexible_desc },
    { icon: 'bi-shield-check', title: messages.feature_safe_title, text: messages.feature_safe_desc },
    { icon: 'bi-translate', title: messages.feature_languages_title, text: messages.feature_languages_desc },
  ];

  const cards = [
    { href: '/circuits/dia1', title: messages.home_card1_title, img: '/images/circuit1.jpg', desc: messages.home_card1_desc },
    { href: '/excursions', title: messages.home_card2_title, img: '/images/sousse.jpg', desc: messages.home_card2_desc },
    { href: '/excursions/la-goulette-cruise', title: messages.home_card3_title, img: '/images/goulette.jpeg', desc: messages.home_card3_desc },
  ];

  const homepageReviews = [
    { name: messages.home_review1_name, daysAgo: messages.home_review1_time, text: messages.home_review1_text },
    { name: messages.home_review2_name, daysAgo: messages.home_review2_time, text: messages.home_review2_text },
    { name: messages.home_review3_name, daysAgo: messages.home_review3_time, text: messages.home_review3_text },
  ]

  return (
    <main>
      {/* Video Hero */}
      <section className="relative h-[60vh] md:h-[72vh] overflow-hidden animate-fadeUp">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/trailer.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/circuit.jpg"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{messages.hero_title}</h1>
            <p className="text-lg opacity-95 mb-6">{messages.hero_description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/circuits" className="btn btn-primary">{messages.circuits}</Link>
              <Link href="/custom-trips" className="btn btn-outline-light">{messages.vip_private_trips || 'VIP Private Trips'}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Hero (image) */}
      <section className="py-16 bg-transparent animate-fadeUp">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{messages.hero_title}</h1>
            <p className="text-lg text-gray-600 mb-6">{messages.hero_description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/circuits" className="btn btn-primary">{messages.circuits}</Link>
              <Link href="/custom-trips" className="btn btn-outline-primary">{messages.vip_private_trips || 'VIP Private Trips'}</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/photo132.jpg" alt="Tunisia landscapes" fill style={{objectFit:'cover'}} priority className="img-zoom" />
            <div className="overlay-gradient" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 animate-fadeUp">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f)=> (
            <div key={f.title} className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-xl hover-lift">
              <i className={`bi ${f.icon} text-primary text-3xl`}></i>
              <h3 className="font-semibold mt-3 text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured samples (placeholders) */}
      <section className="py-16 bg-transparent animate-fadeUp">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{messages.popular_experiences}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((c)=> (
              <Link key={c.href} href={c.href} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition card-premium">
                <div className="relative h-80 overflow-hidden">
                  <Image src={c.img} alt={c.title} fill style={{objectFit:'cover'}} className="img-zoom" />
                  <div className="overlay-gradient" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-primary text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 animate-fadeUp">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">{messages.home_testimonials_title}</h2>
              <p className="text-gray-600">{messages.home_testimonials_lead}</p>
            </div>
            <Link href="/our-reviews" className="btn btn-outline-primary">{messages.see_more_testimonials || 'See More Testimonials'}</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {homepageReviews.map((r, i) => (
              <article key={i} className="rounded-2xl border p-6 bg-white/90 shadow-sm hover:shadow-md hover-lift">
                <p className="text-gray-800 mb-3">{r.text}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{r.name}</span>
                  <span>{r.daysAgo}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
