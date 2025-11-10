import { useLocale } from '@/context/locale-context'

export default function Hero() {
  const { messages } = useLocale()
  return (
    <section id="billboard" className="bg-light py-5">
      <div className="container">
        <h1 className="section-title text-center mt-4 mb-5">{messages?.hero_title || 'Discover Tunisia with Xplora'}</h1>
        <div className="col-lg-8 mx-auto text-center mb-5">
          <p className="lead">
            {messages?.hero_description || 'Authentic circuits, private VIP trips, and unforgettable excursions across Tunisia. Book easily by email or WhatsApp in EN/FR/ES/IT.'}
          </p>
        </div>
      </div>
    </section>
  )
}
