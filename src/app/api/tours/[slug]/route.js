import dbConnect from '@/lib/db'
import Tour from '@/models/tour'

export async function GET(_req, { params }) {
  await dbConnect()
  const { slug } = await params
  const tour = await Tour.findOne({ slug }).lean()
  if (!tour) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(tour), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
