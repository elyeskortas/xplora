"use client"

import { useMemo, useState, useEffect, useCallback } from 'react'
import { useLocale } from '@/context/locale-context'
import Image from 'next/image'

export default function GalleryPage() {
  const { messages } = useLocale()
  const images = useMemo(() => Array.from({ length: 194 }, (_, i) => i + 1), [])
  const [active, setActive] = useState(null) // number | null
  const [touchStart, setTouchStart] = useState(null)

  const len = images.length
  const next = useCallback(() => setActive((p) => (p == null ? 1 : p >= len ? 1 : p + 1)), [len])
  const prev = useCallback(() => setActive((p) => (p == null ? len : p <= 1 ? len : p - 1)), [len])
  const close = useCallback(() => setActive(null), [])
  const onBackdrop = (e) => { if (e.target === e.currentTarget) close() }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return close()
      if (e.key === 'ArrowRight') return next()
      if (e.key === 'ArrowLeft') return prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, next, prev])

  const onTouchStart = (e) => setTouchStart(e.changedTouches?.[0]?.clientX ?? null)
  const onTouchEnd = (e) => {
    if (touchStart == null) return
    const x = e.changedTouches?.[0]?.clientX ?? 0
    const delta = x - touchStart
    if (Math.abs(delta) > 50) {
      if (delta < 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  return (
    <main className="min-h-screen">
      {/* Hero header */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white drop-shadow">
            {messages?.gallery_title || 'Gallery'}
          </h1>
          <p className="text-white/90 max-w-2xl">
            {messages?.gallery_subtitle || 'Discover Tunisia through our lens — dunes, coastlines, medinas and authentic moments.'}
          </p>
        </div>
      </section>

      {/* Uniform grid */}
      <section className="pb-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" role="list" aria-label={messages?.gallery_title || 'Gallery'}>
            {images.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setActive(n)}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition hover:-translate-y-1 bg-white/60 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-zoom-in"
                aria-label={`${messages?.gallery_open_photo || 'Open photo'} ${n}`}
                role="listitem"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={`/images/photo${n}.jpg`}
                    alt={`Gallery photo ${n}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="bi bi-zoom-in text-white text-2xl"></i>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onBackdrop}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-[92vw] h-[78vh] max-w-6xl">
            {/* Counter */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white/95 text-xs md:text-sm bg-black/40 px-3 py-1 rounded-full shadow border border-white/10"
                 aria-live="polite">
              {active} / {len}
            </div>
            {/* Image (click to advance) */}
            <Image
              src={`/images/photo${active}.jpg`}
              alt={`Gallery photo ${active}`}
              fill
              sizes="92vw"
              className="object-contain cursor-pointer"
              priority
              onClick={next}
            />
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 rounded-full p-3 md:p-4 bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/25 hover:scale-105 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={messages?.gallery_prev_label || 'Previous image'}
              title={`${messages?.gallery_prev_label || 'Previous image'} (←)`}
            >
              <i className="bi bi-chevron-left text-2xl md:text-3xl"></i>
            </button>
            {/* Next */}
            <button
              type="button"
              onClick={next}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 rounded-full p-3 md:p-4 bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/25 hover:scale-105 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={messages?.gallery_next_label || 'Next image'}
              title={`${messages?.gallery_next_label || 'Next image'} (→)`}
            >
              <i className="bi bi-chevron-right text-2xl md:text-3xl"></i>
            </button>
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full p-2.5 md:p-3 bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/25 hover:scale-105 transition"
              aria-label={messages?.gallery_close_label || 'Close'}
              title={`${messages?.gallery_close_label || 'Close'} (Esc)`}
            >
              <i className="bi bi-x-lg text-lg md:text-xl"></i>
            </button>
            {/* Keyboard hints */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/95 text-[11px] md:text-sm bg-black/40 px-3 py-1.5 rounded-full shadow border border-white/10 select-none">
              {messages?.gallery_keyboard_hints || '← Prev • → Next • Esc Close'}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
