'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/context/locale-context'

export default function AboutPage() {
  const { messages } = useLocale()
  const [imgSrc, setImgSrc] = useState('/images/ali.jpg')

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
          {messages?.about || 'About us'}
        </h1>
        <p className="mt-2 text-gray-600">
          {messages?.feature_local_guides_desc || 'Licensed guides with 20+ years of experience across Tunisia.'}
        </p>
      </header>

      {/* Main content */}
      <section className="max-w-5xl mx-auto grid gap-8 md:grid-cols-5 items-start">
        {/* Guide image */}
        <div className="md:col-span-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10 aspect-[4/3]">
            <Image
              src={imgSrc}
              alt={messages?.about_guide_heading || 'Guide Ali'}
              fill
              className="object-cover"
              onError={() => setImgSrc('/images/default-avatar.png')}
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Guide text */}
        <div className="md:col-span-3">
          {messages?.about_guide_heading && (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              {messages.about_guide_heading}
            </h2>
          )}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow p-5 md:p-6 border border-gray-100">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {messages?.about_guide_body || messages?.feature_local_guides_desc || 'Licensed guides with 20+ years of experience across Tunisia.'}
            </div>
            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/custom-trips"
                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2.5 text-white font-medium shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                aria-label={messages?.request_this_trip || 'Request this trip'}
              >
                {messages?.request_this_trip || 'Request this trip'}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                {messages?.contact || 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto mt-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">{messages?.feature_local_guides_title || 'Local licensed guides'}</div>
            <p className="mt-1 text-sm text-gray-600">{messages?.feature_local_guides_desc || '20+ years experience across all Tunisia.'}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">{messages?.feature_flexible_title || 'Flexible dates'}</div>
            <p className="mt-1 text-sm text-gray-600">{messages?.feature_flexible_desc || 'Private group tours, daily departures.'}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">{messages?.feature_safe_title || 'Safe & comfortable'}</div>
            <p className="mt-1 text-sm text-gray-600">{messages?.feature_safe_desc || 'Trusted drivers and carefully selected hotels.'}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
