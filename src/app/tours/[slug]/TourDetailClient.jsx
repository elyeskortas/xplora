"use client"

import Image from 'next/image'
import BookingForm from '@/app/custom-trips/booking-form'
import { useLocale } from '@/context/locale-context'
import { useState } from 'react'

function DayImage({ src, alt, heightClass = 'h-96' }) {
  const [fallback, setFallback] = useState(false)
  const finalSrc = fallback || !src ? '/images/placeholder.png' : `/images/${src}`
  return (
    <div className={`relative ${heightClass} w-full overflow-hidden`}>
      <Image
        src={finalSrc}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        onError={() => setFallback(true)}
        priority={false}
      />
    </div>
  )
}

export default function TourDetailClient({ tour }) {
  const { locale, messages } = useLocale()
  const L = locale || 'en'
  const i18n = (tour.i18n && tour.i18n[L]) || (tour.i18n && tour.i18n.en) || {}

  const title = i18n.title || tour.title
  const highlights = i18n.highlights || tour.highlights
  const pkgDays = i18n.packageDays?.length ? i18n.packageDays : tour.packageDays
  const durationText = i18n.duration || tour.duration

  // Localized includes/excludes with sensible fallbacks
  const defaultIncludes = String(messages?.price_includes_items || '')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
  const defaultExcludes = String(messages?.price_excludes_items || '')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

  const useDefaultPricing = tour.slug === 'gran-tour-oasi-tunisine-capodanno'

  // Per‑slug localized defaults (when tour data lacks i18n arrays)
  const slugDefaults = {
    'croisiere-la-goulette': {
      excludes: {
        en: ['Entrance fees', 'Meals and drinks', 'Transport if not specified'],
        fr: ['Frais d’entrée', 'Repas et boissons', 'Transports si non précisés'],
        es: ['Entradas', 'Comidas y bebidas', 'Transporte si no está especificado'],
        it: ['Biglietti d’ingresso', 'Pasti e bevande', 'Trasporti se non specificati']
      }
    },
    'cultural-tunisia-circuit': {
      excludes: {
        en: ['Drinks', 'Gratuities', 'Local hotel city taxes (payable on site)'],
        fr: ['Boissons', 'Pourboires', 'Taxes de séjour locales (à régler sur place)'],
        es: ['Bebidas', 'Propinas', 'Impuestos municipales hoteleros locales (pagaderos en destino)'],
        it: ['Bevande', 'Mance', 'Tasse di soggiorno locali (da pagare in loco)']
      }
    },
    'sahara-explora-3d-2n': {
      excludes: {
        en: ['4x4 desert excursion','Camel ride','Quad tour','Drinks'],
        fr: ['Excursion 4x4 dans le désert','Balade à dos de dromadaire','Tour en quad','Boissons'],
        es: ['Excursión 4x4 por el desierto','Paseo en camello','Ruta en quad','Bebidas'],
        it: ['Escursione 4x4 nel deserto','Giro in cammello','Tour in quad','Bevande']
      }
    }
  }
  const slugExcludes = slugDefaults[tour.slug]?.excludes?.[L] || null

  const includesLocalized = (Array.isArray(i18n.includes) && i18n.includes.length > 0)
    ? i18n.includes
    : (useDefaultPricing
        ? (defaultIncludes.length > 0 ? defaultIncludes : (Array.isArray(tour.includes) ? tour.includes : []))
        : (Array.isArray(tour.includes) ? tour.includes : []))

  const excludesLocalized = (Array.isArray(i18n.excludes) && i18n.excludes.length > 0)
    ? i18n.excludes
    : (useDefaultPricing
        ? (defaultExcludes.length > 0 ? defaultExcludes : (Array.isArray(tour.excludes) ? tour.excludes : []))
        : (slugExcludes || (Array.isArray(tour.excludes) ? tour.excludes : [])))

  const hero = (tour.images && tour.images[0]) ? tour.images[0] : null
  const heroSrc = tour.slug === 'croisiere-la-goulette' ? 'goulette.jpeg'
    : (tour.slug === 'journee-tunis-carthage-sidi-bou-said' ? 'photo134.jpg'
    : (tour.slug === 'demi-journee-eljem' ? 'photo138.jpg'
    : (tour.slug === 'demi-journee-kairouan' ? 'mosque.jpg' : hero)))

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <DayImage src={heroSrc} alt={title} heightClass="h-96" />
        <h1 className="text-3xl font-bold">{title}</h1>
        {durationText && <p className="text-gray-600">{durationText}</p>}
        {tour.cities?.length > 0 && <p className="text-sm text-gray-500">{tour.cities.join(' • ')}</p>}

        {highlights?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">{messages?.highlights || 'Highlights'}</h2>
            <ul className="list-disc pl-5 space-y-3">
              {highlights.map((h, i) => {
                const text = String(h || '')
                const lower = text.toLowerCase()
                const showSouk = lower.includes('medina') && (lower.includes('souk') || lower.includes('souks'))
                const showSidi = lower.includes('sidi bou')
                const isElJem = tour?.slug === 'demi-journee-eljem'
                const showElJemRoman = isElJem && (lower.includes('roman amph') || lower.includes('amphithéâtre') || lower.includes('anfiteatro'))
                const showElJemMuseum = isElJem && ((lower.includes('museum') || lower.includes('musée') || lower.includes('museo')) && (lower.includes('villa') || lower.includes('ruins') || lower.includes('ruines') || lower.includes('rovine')))
                const isKairouan = tour?.slug === 'demi-journee-kairouan'
                const showKairouanAghlabid = isKairouan && (lower.includes('aghlab') || lower.includes('aghlabid') || lower.includes('aglab'))
                const showKairouanMosque = isKairouan && (lower.includes('mosque') || lower.includes('mosquée') || lower.includes('mezquita') || lower.includes('moschea'))
                const showKairouanSidi = isKairouan && lower.includes('sidi sa')
                const isTunisCarthage = tour?.slug === 'journee-tunis-carthage-sidi-bou-said'
                const showCarthageRuins = isTunisCarthage && (lower.includes('carthage') || lower.includes('cartago') || lower.includes('cartagine'))
                const showAntonineBaths = isTunisCarthage && (lower.includes('antonine') || lower.includes('antonin') || lower.includes('antonino'))
                const showTunisMedina = isTunisCarthage && (lower.includes('tunis') && (lower.includes('medina') || lower.includes('médina')))
                const isSousse = tour?.slug === 'medina-of-sousse-history'
                const showKasbah = isSousse && lower.includes('kasbah')
                const showMuseum = isSousse && (lower.includes('archaeological museum') || lower.includes('musée') || lower.includes('museo'))
                const showSousseSouks = isSousse && (lower.includes('souks') || lower.includes('zocos') || lower.includes('souk'))
                const showRibat = isSousse && lower.includes('ribat')
                return (
                  <li key={i}>
                    {text}
                    {showSouk && (
                      <div className="mt-3">
                        <DayImage src="souk.png" alt="Souk" heightClass="h-72" />
                      </div>
                    )}
                    {showSidi && (
                      <div className="mt-3">
                        <DayImage src="sidi.jpg" alt="Sidi Bou Saïd" heightClass="h-72" />
                      </div>
                    )}
                    {showElJemRoman && (
                      <div className="mt-3">
                        <DayImage src="photo3.jpg" alt="El Jem Amphitheatre" heightClass="h-72" />
                      </div>
                    )}
                    {showElJemMuseum && (
                      <div className="mt-3">
                        <DayImage src="photo33.jpg" alt="El Jem Museum and Villa Ruins" heightClass="h-72" />
                      </div>
                    )}
                    {showKairouanAghlabid && (
                      <div className="mt-3">
                        <DayImage src="aghaleb.webp" alt="Aghlabid basins" heightClass="h-72" />
                      </div>
                    )}
                    {showKairouanMosque && (
                      <div className="mt-3">
                        <DayImage src="mosque.jpg" alt="Great Mosque of Kairouan" heightClass="h-72" />
                      </div>
                    )}
                    {showKairouanSidi && (
                      <div className="mt-3">
                        <DayImage src="sidisahbi.jpg" alt="Sidi Saheb mausoleum" heightClass="h-72" />
                      </div>
                    )}
                    {showCarthageRuins && (
                      <div className="mt-3">
                        <DayImage src="photo151.jpg" alt="Carthage ruins" heightClass="h-72" />
                      </div>
                    )}
                    {showAntonineBaths && (
                      <div className="mt-3">
                        <DayImage src="bath.jpg" alt="Antonine Baths" heightClass="h-72" />
                      </div>
                    )}
                    {showTunisMedina && (
                      <div className="mt-3">
                        <DayImage src="tuniss.jpg" alt="Tunis medina" heightClass="h-72" />
                      </div>
                    )}
                    {showKasbah && (
                      <div className="mt-3">
                        <DayImage src="kasbah.jpeg" alt="Kasbah" heightClass="h-72" />
                      </div>
                    )}
                    {showMuseum && (
                      <div className="mt-3">
                        <DayImage src="musee.jpg" alt="Archaeological Museum" heightClass="h-72" />
                      </div>
                    )}
                    {showSousseSouks && (
                      <div className="mt-3">
                        <DayImage src="sousse.webp" alt="Souks" heightClass="h-72" />
                      </div>
                    )}
                    {showRibat && (
                      <div className="mt-3">
                        <DayImage src="ribat.jpg" alt="Ribat" heightClass="h-72" />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {pkgDays?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">{messages?.itinerary || 'Itinerary'}</h2>
            <ol className="list-decimal pl-5 space-y-6">
              {pkgDays.map((d) => {
                const dayImage = tour.packageDays?.find(p => p.day === d.day)?.image
                return (
                  <li key={d.day}>
                    <span className="font-medium">{(messages?.day || 'Day')} {d.day}: {d.title}</span>
                    <div className="text-sm text-gray-700">{d.description}</div>
                    <div className="mt-3">
                      <DayImage src={dayImage} alt={`${messages?.day || 'Day'} ${d.day}`} heightClass="h-96" />
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}

        {(includesLocalized.length > 0 || excludesLocalized.length > 0) && (
          <section className="grid md:grid-cols-2 gap-6">
            {includesLocalized.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">{messages?.price_includes || 'Price includes'}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {includesLocalized.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </div>
            )}
            {excludesLocalized.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">{messages?.price_excludes || 'Price excludes'}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {excludesLocalized.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>

      <aside className="lg:col-span-1">
        <div className="p-4 border rounded-xl shadow-sm">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/images/photo2.jpg"
              alt=""
              fill
              className="object-cover opacity-30 pointer-events-none"
              priority={false}
            />
            <div className="relative p-3">
              <h2 className="text-xl font-semibold mb-3">{messages?.booking_title || 'Trip inquiry'}</h2>
              <BookingForm tourSlug={tour.slug} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
