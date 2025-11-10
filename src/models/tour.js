import mongoose from "mongoose"

const daySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
  image: String,
}, { _id: false })

const reviewSchema = new mongoose.Schema({
  author: String,
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
}, { _id: false })

const i18nDaySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
}, { _id: false })

const i18nSchema = new mongoose.Schema({
  title: String,
  highlights: [String],
  itinerary: String,
  details: String,
  packageDays: [i18nDaySchema],
}, { _id: false })

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ["circuit", "excursion", "day-tour", "custom"], required: true },
  duration: String,
  cities: [String],
  fromPrice: Number,
  languages: { type: [String], default: ["en", "fr", "it", "es"] },
  highlights: [String],
  itinerary: String,
  details: String,
  includes: [String],
  excludes: [String],
  packageDays: [daySchema],
  images: [String],
  availability: String,
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  i18n: {
    en: i18nSchema,
    fr: i18nSchema,
    it: i18nSchema,
    es: i18nSchema,
  }
}, { timestamps: true })

const Tour = mongoose.models.Tour || mongoose.model("Tour", tourSchema)
export default Tour
