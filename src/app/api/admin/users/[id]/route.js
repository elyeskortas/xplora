// src/app/api/admin/users/[id]/route.js
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import User from "@/models/user"
import { requireAdmin, badRequest } from "../../_utils"

const SAFE_PROJECTION = "-password"

export async function GET(_req, { params }) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()
  const user = await User.findById(params.id).select(SAFE_PROJECTION)
  if (!user) return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 })
  return NextResponse.json({ ...user.toObject(), id: user._id.toString() })
}

export async function PUT(req, { params }) {
  const { error, currentUser } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  const updates = await req.json()

  // Optionnel: empêcher un admin de se rétrograder lui-même
  if (String(currentUser._id) === String(params.id) && updates?.role === "user") {
    return NextResponse.json({ message: "Impossible de rétrograder votre propre rôle" }, { status: 400 })
  }

  await connectToDB()

  // Si email présent, normaliser
  if (updates?.email) {
    updates.email = updates.email.toLowerCase().trim()
  }
  if (updates?.firstName) updates.firstName = updates.firstName.trim()
  if (updates?.lastName) updates.lastName = updates.lastName.trim()

  try {
    const updated = await User.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    }).select(SAFE_PROJECTION)

    if (!updated) return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 })
    return NextResponse.json({ ...updated.toObject(), id: updated._id.toString() })
  } catch (e) {
    if (e?.code === 11000 && e?.keyPattern?.email) {
      return NextResponse.json({ message: "Email déjà utilisé" }, { status: 409 })
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(_req, { params }) {
  const { error, currentUser } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()

  // Ne pas supprimer son propre compte
  if (String(currentUser._id) === String(params.id)) {
    return NextResponse.json({ message: "Impossible de supprimer votre propre compte" }, { status: 400 })
  }

  // Option: protéger un super admin
  const superEmail = process.env.SUPERADMIN_EMAIL
  if (superEmail) {
    const target = await User.findById(params.id)
    if (target?.email === superEmail) {
      return NextResponse.json({ message: "Super admin protégé" }, { status: 403 })
    }
  }

  const deleted = await User.findByIdAndDelete(params.id)
  if (!deleted) return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 })
  return NextResponse.json({ success: true })
}