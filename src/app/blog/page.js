'use client'

import { useLocale } from "@/context/locale-context"
import Link from "next/link"
import Image from "next/image"

import articlesEn from "@/data/articles"
import articlesFr from "@/data/articles.fr"
import articlesEs from "@/data/articles.es"
import articlesIt from "@/data/articles.it"

function getArticlesForLocale(locale) {
  switch (locale) {
    case 'fr': return articlesFr
    case 'es': return articlesEs
    case 'it': return articlesIt
    default: return articlesEn
  }
}

export default function TravelBlogPage() {
  const { locale, messages } = useLocale()
  const posts = getArticlesForLocale(locale)

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{messages?.travel_blog || 'Travel Blog'}</h1>
      <p className="text-gray-600 mb-8">{messages?.blog_lead || 'Stories and tips from Tunisia.'}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md">
            <div className="relative h-72 md:h-80 lg:h-96">
              <Image src={`/images/${p.image}`} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{p.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{p.content}</p>
              <div className="mt-4">
                <Link href={`/blog/${p.id}`} className="text-primary hover:underline">{messages?.discover || 'Discover'}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
