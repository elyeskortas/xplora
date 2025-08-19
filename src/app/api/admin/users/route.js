// src/app/api/admin/users/route.js
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import User from "@/models/user"
import { hashPassword } from "@/lib/auth"
import { requireAdmin, badRequest } from "../_utils"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  await connectToDB()
  const users = await User.find().select("-password").sort({ createdAt: -1 })
  return NextResponse.json(users.map((u) => ({ ...u.toObject(), id: u._id.toString() })))
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return NextResponse.json({ message: error.message }, { status: error.status })

  const { firstName, lastName, email, password, role = "user", isVerified = true } = await request.json() || {}

  if (!firstName || !lastName || !email || !password) {
    return badRequest("Champs requis: firstName, lastName, email, password")
  }

  await connectToDB()
  const exists = await User.findOne({ email: email.toLowerCase().trim() })
  if (exists) return NextResponse.json({ message: "Email déjà utilisé" }, { status: 409 })

  const hashed = await hashPassword(password)
  const user = new User({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    password: hashed,
    role,
    isVerified,
  })
  await user.save()

  const plain = user.toObject()
  delete plain.password

  return NextResponse.json(
    { message: "Utilisateur créé", user: { ...plain, id: user._id.toString() } },
    { status: 201 },
  )
}