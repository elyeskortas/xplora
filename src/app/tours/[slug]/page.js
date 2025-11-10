import Image from 'next/image'
import BookingForm from '@/app/custom-trips/booking-form'
import { LocaleContext } from '@/context/locale-context'
import TourDetailClient from './TourDetailClient'

async function getTour(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/tours/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params
  const tour = await getTour(slug)
  if (!tour) return <main className="container mx-auto px-4 py-10">Not found</main>

  return (
    <main className="container mx-auto px-4 py-10">
      <TourDetailClient tour={tour} />
    </main>
  )
}
