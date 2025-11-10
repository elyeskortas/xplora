import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/locale-context'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function ToursListingPage() {
  const { data, error, isLoading } = useSWR('/api/tours', fetcher)
  const { locale, messages } = useLocale()
  const L = locale || 'en'

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{messages?.all_tours || 'All tours'}</h1>
      {isLoading && <div>{messages?.loading || 'Loading...'}</div>}
      {error && <div className="text-red-600">{messages?.failed_to_load || 'Failed to load'}</div>}
      <div className="grid md:grid-cols-3 gap-6">
        {(data || []).map((t) => {
          const title = (t.i18n && t.i18n[L]?.title) || (t.i18n?.en?.title) || t.title
          const imgSrc = (t.slug === 'croisiere-la-goulette') ? '/images/goulette.jpeg' : ((t.images && t.images[0]) ? `/images/${t.images[0]}` : '/images/placeholder.png')
          return (
            <Link key={t.slug} href={`/tours/${t.slug}`} className="block border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md">
              <div className="relative h-80 overflow-hidden">
                <Image src={imgSrc} alt={title} fill style={{objectFit:'cover'}} className="img-zoom" />
                <div className="overlay-gradient" />
                {t.type && <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs rounded-full bg-black/70 text-white capitalize">{t.type}</span>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{title}</h3>
                {t.duration && <p className="text-sm text-gray-600">{t.duration}</p>}
                {t.cities?.length > 0 && <p className="text-xs text-gray-500 mt-1">{t.cities.join(' • ')}</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
