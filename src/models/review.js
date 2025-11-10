import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  source: { type: String, enum: ['site','google','tripadvisor','facebook','other'], default: 'site' },
  tourSlug: { type: String },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.models.Review || mongoose.model('Review', reviewSchema)
