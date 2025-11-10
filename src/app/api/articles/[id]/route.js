import { connectToDB } from "../../../../../lib/mongodb.js"
import Article from "../../../../../models/article.js"

export async function PUT(request, { params }) {
  try {
    await connectToDB()
    const { id } = params
    const body = await request.json()
    const { title, image, content } = body

    if (!title || !image || !content) {
      return Response.json({ message: "All fields are required" }, { status: 400 })
    }

    const article = await Article.findOneAndUpdate({ _id: id }, { title, image, content }, { new: true })

    if (!article) {
      return Response.json({ message: "Article not found" }, { status: 404 })
    }

    return Response.json(article)
  } catch (error) {
    return Response.json({ message: "Error updating article" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB()
    const { id } = params

    const article = await Article.findOneAndDelete({ _id: id })

    if (!article) {
      return Response.json({ message: "Article not found" }, { status: 404 })
    }

    return Response.json({ message: "Article deleted successfully" })
  } catch (error) {
    return Response.json({ message: "Error deleting article" }, { status: 500 })
  }
}
