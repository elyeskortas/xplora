// src/app/api/admin/vinyls/route.js
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import Vinyl from "@/models/vinyl"
import { requireAdmin, badRequest } from "../_utils"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()
  const vinyls = await Vinyl.find().sort({ createdAt: -1 })
  return NextResponse.json(vinyls.map((v) => ({ ...v.toObject(), id: v._id.toString() })))
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  const payload = await request.json()

  if (!payload?.title || !payload?.price) {
    return badRequest("Champs requis: title et price")
  }
  if (typeof payload.price !== "number") {
    return badRequest("price doit être un number")
  }

  await connectToDB()
  const v = new Vinyl(payload)
  await v.save()

  return NextResponse.json(
    { message: "Vinyle ajouté", vinyl: { ...v.toObject(), id: v._id.toString() } },
    { status: 201 },
  )
}