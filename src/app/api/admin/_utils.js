// src/app/api/admin/_utils.js
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { connectToDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function requireAdmin() {
  const token = cookies().get("token")
  if (!token) return { error: { status: 401, message: "Non autorisé" } }

  const decoded = verifyToken(token.value)
  if (!decoded?.userId) return { error: { status: 401, message: "Token invalide" } }

  await connectToDB()
  const currentUser = await User.findById(decoded.userId).select("role email firstName lastName")
  if (!currentUser || currentUser.role !== "admin") {
    return { error: { status: 403, message: "Accès réservé aux administrateurs" } }
  }

  return { currentUser }
}

export function badRequest(message = "Requête invalide") {
  return NextResponse.json({ message }, { status: 400 })
}