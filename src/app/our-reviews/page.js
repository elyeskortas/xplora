import ReviewsClient from './reviews-client'

export const metadata = { title: 'Our Reviews' }

export default function OurReviewsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Our Reviews</h1>
      <ReviewsClient />
    </main>
  )
}
