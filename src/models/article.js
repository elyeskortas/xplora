import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema(
  {
    // Slug lisible, unique (ex: "vinyle-vintage")
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    image: { type: String, required: true }, // nom de fichier dans /public/images
    content: { type: String, required: true }, // texte/markdown
  },
  { timestamps: true },
)

const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema)

export default Article
