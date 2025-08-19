// src/app/api/admin/vinyls/[id]/route.js
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { requireAdmin, badRequest } from "../../_utils"
import Vinyl from "@/models/vinyl"

export async function GET(_req, { params }) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()
  const vinyl = await Vinyl.findById(params.id)
  if (!vinyl) return NextResponse.json({ message: "Vinyle introuvable" }, { status: 404 })
  return NextResponse.json({ ...vinyl.toObject(), id: vinyl._id.toString() })
}

export async function PUT(req, { params }) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  const updates = await req.json()
  if (updates?.price != null && typeof updates.price !== "number") {
    return badRequest("price doit être un number")
  }

  await connectToDB()
  const updated = await Vinyl.findByIdAndUpdate(params.id, updates, { new: true, runValidators: true })
  if (!updated) return NextResponse.json({ message: "Vinyle introuvable" }, { status: 404 })
  return NextResponse.json({ ...updated.toObject(), id: updated._id.toString() })
}

export async function DELETE(_req, { params }) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()
  const deleted = await Vinyl.findByIdAndDelete(params.id)
  if (!deleted) return NextResponse.json({ message: "Vinyle introuvable" }, { status: 404 })
  return NextResponse.json({ success: true })
}