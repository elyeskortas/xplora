import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"

export async function GET() {
  await connectToDB()
  const articles = await Article.find({})
  return Response.json(articles)
}