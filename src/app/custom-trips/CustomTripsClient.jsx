"use client"

// Removed Image import because we no longer render inline images on this page
import BookingForm from './booking-form'
import { useLocale } from '@/context/locale-context'

export default function CustomTripsClient() {
  const { messages } = useLocale()
  return (
    <main className="min-h-screen">
      {/* Hero without per-section background image (uses global site background) */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-3">{messages.custom_hero_title}</h1>
          <p className="text-white/95 text-lg md:text-xl max-w-2xl">{messages.custom_hero_sub}</p>
        </div>
      </section>

      {/* Intro text only (removed side photo) */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-3">{messages.custom_intro_title}</h2>
          <p className="text-gray-700 mb-4">{messages.custom_intro_p1}</p>
          <p className="text-gray-700 mb-4">{messages.custom_intro_p2}</p>
          <p className="text-gray-700 mb-4">{messages.custom_intro_p3}</p>
          <p className="text-gray-700">{messages.custom_intro_cta}</p>
        </div>
      </section>

      {/* How it works without per-section background image (uses global site background) */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h2 className="text-3xl font-bold text-center mb-10">{messages.how_it_works_title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <div className="text-4xl font-extrabold mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">{messages.hiw_step1_title}</h3>
              <p className="text-white/90 text-sm">{messages.hiw_step1_desc}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <div className="text-4xl font-extrabold mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">{messages.hiw_step2_title}</h3>
              <p className="text-white/90 text-sm">{messages.hiw_step2_desc}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <div className="text-4xl font-extrabold mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">{messages.hiw_step3_title}</h3>
              <p className="text-white/90 text-sm">{messages.hiw_step3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking section without per-section background image (uses global site background) */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/95 rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{messages.booking_section_title}</h2>
            <p className="text-gray-600 mb-6 text-center">{messages.booking_section_subtitle}</p>
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  )
}
