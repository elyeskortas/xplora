'use client';

import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export default function TermsOfUsePage() {
  const { messages } = useLocale();
  return (
    <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        {messages?.terms_title || messages?.terms_of_use || 'Terms of use'}
      </h1>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_section1_title || 'Use of the site'}</h2>
        <p className="text-gray-700">
          {messages?.terms_section1_text || 'You agree to use this site only for lawful purposes and not to infringe the rights of other users or Tunisia Xplora.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_section2_title || 'Intellectual property'}</h2>
        <p className="text-gray-700">
          {messages?.terms_section2_text || 'All content on this site (texts, images, logos and designs) is the property of Tunisia Xplora or its partners and is protected by intellectual property laws.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_section3_title || 'Liability'}</h2>
        <p className="text-gray-700">
          {messages?.terms_section3_text || 'Tunisia Xplora cannot be held liable for any direct or indirect damages resulting from the use of this site.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_contact_title || 'Contact'}</h2>
        <p className="text-gray-700">
          {messages?.terms_contact_text || 'For any questions about these terms, please contact us.'} {" "}
          <Link href="/contact" className="text-primary underline font-medium">{messages?.contact || 'Contact us'}</Link>.
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_activities_title || 'Activities — pickup and process'}</h2>
        <p className="text-gray-700">{messages?.terms_activities_text || 'We provide round-trip pickup from your accommodation to the activity location.'}</p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_language_note_title || 'Guiding and language'}</h2>
        <p className="text-gray-700">{messages?.terms_language_note_text || 'The escort may not speak your language perfectly; their role is safety and logistics (routes, techniques, organization).'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_cancellation_title || 'Cancellation and refunds'}</h2>
        <p className="text-gray-700">{messages?.terms_cancellation_text || 'Activities may be canceled due to weather or force majeure; they will be rescheduled under the same conditions or refunded 100% if rescheduling is not possible. Each booking commits costs (vehicle, licensed driver/guide) that may be non-recoverable upon cancellation.'}</p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_min_participants_title || 'Minimum participants'}</h2>
        <p className="text-gray-700">{messages?.terms_min_participants_text || 'Some activities require a minimum group size; if not met, the agency may cancel and offer an alternative or a refund.'}</p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_client_cancel_title || 'Client cancellation'}</h2>
        <p className="text-gray-700">{messages?.terms_client_cancel_text || 'One-day excursions: cancel up to 48h before departure. Two-day excursions: cancel up to 72h before departure.'}</p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_multi_day_cancel_title || '3+ day excursions'}</h2>
        <p className="text-gray-700">{messages?.terms_multi_day_cancel_text || 'All confirmations are final because partners (accommodation, guides, restaurants, etc.) are booked; non-refundable except force majeure.'}</p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.terms_modifications_title || 'Agency modifications'}</h2>
        <p className="text-gray-700">{messages?.terms_modifications_text || 'We may adjust dates or itineraries due to adverse weather or force majeure; you\'ll be informed as soon as possible and offered alternatives.'}</p>
      </section>

      <div className="text-center mt-8">
        <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
          {messages?.back_to_home || 'Back to home'}
        </Link>
      </div>
    </main>
  );
}
