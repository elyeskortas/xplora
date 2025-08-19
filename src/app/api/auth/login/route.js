import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import User from "@/models/user"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    console.log(request.body)
    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis" }, { status: 400 })
    }

    await connectToDB()
    const user = await User.findOne({ email: email.toLowerCase(), role: role })

    if (!user) {
      return NextResponse.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const token = generateToken(user._id)

    const response = NextResponse.json({
      message: "Connexion réussie",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    })

    // Définir le cookie avec les bonnes options
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
  }
  
}