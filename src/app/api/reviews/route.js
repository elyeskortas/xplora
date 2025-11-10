import dbConnect from '@/lib/db'
import Review from '@/models/review'

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200)
  const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(limit).lean()
  return new Response(JSON.stringify(reviews), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export async function POST(req) {
  await dbConnect()
  const data = await req.json()
  const created = await Review.create(data)
  return new Response(JSON.stringify(created), { status: 201, headers: { 'Content-Type': 'application/json' } })
}
