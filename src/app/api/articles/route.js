import { connectToDB } from "@/lib/mongodb"
import Article from "@/models/article"

export async function GET() {
  try {
    await connectToDB()
    const articles = await Article.find({}).sort({ createdAt: -1 })
    return Response.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return Response.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectToDB()
    const body = await request.json()
    const { id, title, image, content } = body

    if (!id || !title || !image || !content) {
      return Response.json({ message: "All fields are required" }, { status: 400 })
    }

    // Vérifier si l'ID existe déjà
    const existingArticle = await Article.findOne({ id })
    if (existingArticle) {
      return Response.json({ message: "An article with this ID already exists" }, { status: 400 })
    }

    const article = new Article({ id, title, image, content })
    await article.save()

    return Response.json(article, { status: 201 })
  } catch (error) {
    return Response.json({ message: "Error creating article" }, { status: 500 })
  }
}
