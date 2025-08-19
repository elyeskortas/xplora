import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"
import Link from "next/link"
import Image from "next/image"
import { createElement as h } from "react"

export const revalidate = 0

export default async function ArticlesPage() {
  await connectToDB()
  const articles = await Article.find({}, { _id: 0, id: 1, title: 1, image: 1 }).sort({ createdAt: -1 }).lean()

  return h("main", { className: "container py-5" }, [
    h("h1", { className: "mb-4", key: "title" }, "Nos Articles"),
    h("div", { className: "row", key: "list" }, articles.map((a) =>
      h("div", { className: "col-md-4 mb-4", key: a.id }, [
        h("div", { className: "card h-100" }, [
          h(Image, {
            src: `/images/${a.image}`,
            alt: a.title,
            className: "card-img-top",
            width: 600,
            height: 400,
            style: { objectFit: "cover", height: "200px" },
          }),
          h("div", { className: "card-body" }, [
            h("h5", { className: "card-title" }, a.title),
            h(Link, {
              href: `/articles/${a.id}`,
              className: "btn btn-primary mt-2",
            }, "Lire l'article"),
          ]),
        ]),
      ])
    )),
  ])
}
