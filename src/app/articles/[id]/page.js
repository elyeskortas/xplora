import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createElement as h } from "react"

export const revalidate = 0

export default async function ArticlePage({ params }) {
  await connectToDB()
  const article = await Article.findOne({ id: params.id }, { _id: 0 }).lean()
  if (!article) return notFound()

  return h("main", { className: "container py-5" }, [
    h("h1", { className: "mb-3", key: "title" }, article.title),
    h(Image, {
      src: `/images/${article.image}`,
      alt: article.title,
      width: 1200,
      height: 800,
      style: { maxWidth: "600px", width: "100%", objectFit: "cover" },
      className: "mb-4",
      key: "image",
    }),
    h("div", {
      style: { whiteSpace: "pre-wrap", lineHeight: 1.6 },
      key: "content",
    }, article.content),
  ])
}