import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"

export const revalidate = 0

export async function GET(_, { params }) {
  const { id } = params
  await connectToDB()
  const article = await Article.findOne({ id }, { _id: 0 }).lean()
  if (!article) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
  return Response.json(article)
}