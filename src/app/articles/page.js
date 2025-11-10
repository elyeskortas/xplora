import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"
import Link from "next/link"
import Image from "next/image"
// Removed: import Footer from "@/components/Footer" // réutilisation du footer
import { useLocale } from '@/context/locale-context'

export const revalidate = 0

export default async function ArticlesPage({ searchParams }) {
  await connectToDB()
  const articles = await Article.find(
    {},
    { _id: 0, id: 1, title: 1, image: 1 }
  )
    .sort({ createdAt: -1 })
    .lean()

  // Note: server component cannot use hooks; pass messages via searchParams or render static English headings
  const heading = "Articles" // keep English default for SSR

  return (
    <>
      <main className="container py-5">
        <h1 className="mb-4">{heading}</h1>
        <div className="row">
          {articles.map((a) => (
            <div className="col-md-4 mb-4" key={a.id}>
              <div className="card h-100">
                <Image
                  src={`/images/${a.image}`}
                  alt={a.title}
                  className="card-img-top"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{a.title}</h5>
                  <Link
                    href={`/articles/${a.id}`}
                    className="btn btn-primary mt-2"
                  >
                    {"Read article"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer removed, now global */}
    </>
  )
}