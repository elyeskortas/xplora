'use client'
import Link from 'next/link'
import Dia1BookingForm from './booking-form'
import { useLocale } from '@/context/locale-context'

export default function Dia1Content() {
  const { messages } = useLocale()
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{messages?.home_card1_title || 'Grand Tunisia Circuit'}</h1>

      <section className="space-y-6">
        {[1,2,3,4,5,6,7].map(day => (
          <article key={day}>
            <h2 className="text-xl font-semibold mb-2">{(messages?.day || 'Day')} {day}</h2>
            <p>Content placeholder for day {day}.</p>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link href="#booking" className="btn btn-primary">{messages?.request_this_trip || 'Request this trip'}</Link>
      </div>

      <section id="booking" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{messages?.booking_title || 'Trip inquiry'}</h2>
        <div className="max-w-2xl"><Dia1BookingForm /></div>
      </section>
    </main>
  )
}
