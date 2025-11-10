"use client"
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/locale-context'

const fetcher = (url) => fetch(url).then(r => r.json())

const localizeDuration = (L, text) => {
  if (!text) return text
  const d = text.replace(/^(\d+)\s+days?$/i, (_, n) => {
    if (L === 'fr') return `${n} jours`
    if (L === 'es') return `${n} días`
    if (L === 'it') return `${n} giorni`
    return `${n} days`
  }).replace(/^(\d+)\s+hours?$/i, (_, n) => {
    if (L === 'fr') return `${n} heures`
    if (L === 'es') return `${n} horas`
    if (L === 'it') return `${n} ore`
    return `${n} hours`
  })
  return d
}

export default function CircuitsPage() {
  const { locale, messages } = useLocale()
  const L = locale || 'en'
  const { data, error, isLoading } = useSWR('/api/tours?type=circuit', fetcher)

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-4">{messages.circuits}</h1>

      {/* Intro paragraph with modern UI (no title) */}
      {messages?.circuits_intro_body && (
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-gray-200 p-6 md:p-8 shadow-sm">
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange-300/10 blur-2xl" aria-hidden="true" />
            <p className="text-gray-700 leading-relaxed md:text-lg whitespace-pre-line">
              {messages.circuits_intro_body}
            </p>
          </div>
        </section>
      )}

      {isLoading && (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse border rounded-2xl bg-white/60 p-4 h-72" />
          ))}
        </div>
      )}
      {error && <div className="text-red-600">{messages?.failed_to_load || 'Failed to load'}</div>}
      <div className="grid md:grid-cols-3 gap-8">
        {(data || []).map((t) => {
          const title = (t.i18n && t.i18n[L]?.title) || (t.i18n?.en?.title) || t.title
          const duration = localizeDuration(L, t.duration)
          return (
            <Link key={t.slug} href={`/tours/${t.slug}`} className="block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition shadow card-premium">
              <div className="relative h-80 overflow-hidden">
                <Image src={(t.images && t.images[0]) ? `/images/${t.images[0]}` : '/images/placeholder.png'} alt={title} fill style={{objectFit:'cover'}} className="img-zoom" />
                <div className="overlay-gradient" />
                {t.type && <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs rounded-full bg-black/70 text-white capitalize">{t.type}</span>}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
                {duration && <p className="text-sm text-gray-600">{duration}</p>}
                {t.cities?.length > 0 && <p className="text-xs text-gray-500 mt-2 truncate">{t.cities.join(' • ')}</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
