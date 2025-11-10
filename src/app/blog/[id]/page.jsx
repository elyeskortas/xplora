'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useLocale } from '@/context/locale-context'

import articlesEn from '@/data/articles'
import articlesFr from '@/data/articles.fr'
import articlesEs from '@/data/articles.es'
import articlesIt from '@/data/articles.it'

function getArticlesForLocale(locale) {
  switch (locale) {
    case 'fr': return articlesFr
    case 'es': return articlesEs
    case 'it': return articlesIt
    default: return articlesEn
  }
}

export default function BlogPostPage({ params }) {
  const { locale } = useLocale()
  const posts = getArticlesForLocale(locale)
  const post = posts.find(p => p.id === params.id)
  if (!post) return notFound()

  return (
    <main className="container mx-auto px-4 py-10">
      <article className="prose max-w-3xl">
        <h1 className="mb-4">{post.title}</h1>
        <div className="relative h-96 md:h-[28rem] lg:h-[34rem] mb-6 rounded-xl overflow-hidden">
          <Image src={`/images/${post.image}`} alt={post.title} fill className="object-cover" />
        </div>
        <div className="whitespace-pre-line text-gray-800 leading-relaxed">
          {post.content}
        </div>
      </article>
    </main>
  )
}
