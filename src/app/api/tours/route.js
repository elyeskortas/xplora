import dbConnect from '@/lib/db'
import Tour from '@/models/tour'

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const limitParam = parseInt(searchParams.get('limit') || '50', 10)
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 200) : 50

  const query = {}
  if (type) query.type = type

  const tours = await Tour.find(query).sort({ createdAt: -1 }).limit(limit).lean()
  return new Response(JSON.stringify(tours), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export async function POST(req) {
  await dbConnect()
  const data = await req.json()
  const created = await Tour.create(data)
  return new Response(JSON.stringify(created), { status: 201, headers: { 'Content-Type': 'application/json' } })
}
