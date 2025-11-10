import Link from 'next/link'
import Dia1BookingForm from './booking-form'
import { useLocale } from '@/context/locale-context'

export const metadata = { title: 'Grand Tunisia Circuit' }

export default function Dia1CircuitPage() {
  const { messages } = useLocale()
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{messages?.home_card1_title || 'Grand Tunisia Circuit'}</h1>

      <section className="space-y-6">
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 1</h2>
          <p>Llegada al aeropuerto internacional de Tunèz. Encuentro con el guía y traslado al hotel en Túnez capital... (full text provided by you will be inserted later).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 2</h2>
          <p>Medina / Museo del Bardo / Cartago / Sidi Bou Said... (content placeholder).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 3</h2>
          <p>Túnez / Hammamet / Sousse / Port El Kantaoui... (content placeholder).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 4</h2>
          <p>Port El Kantaoui / Kairouan / Tozeur... (content placeholder).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 5</h2>
          <p>Tozeur / Douz... (content placeholder).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 6</h2>
          <p>Douz / Matmata / El Jem / Sousse... (content placeholder).</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">{messages?.day || 'Day'} 7</h2>
          <p>Sousse / Aeropuerto de Túnez... (content placeholder).</p>
        </article>
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
