<<<<<<< HEAD
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
=======
import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { verifyPassword, generateToken, validateEmail } from "@/lib/auth.js"
import { cookies } from "next/headers"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Validation des données
    if (!email || !password) {
      return Response.json({ message: "Email et mot de passe requis" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return Response.json({ message: "Email invalide" }, { status: 400 })
    }

    await connectToDB()

    // Trouver l'utilisateur
    const user = await User.findOne({ email })
    if (!user) {
      return Response.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return Response.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Générer le token
    const token = generateToken(user._id)

    // Définir le cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    })

    // Retourner les données utilisateur (sans le mot de passe)
    const userResponse = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    }

    return Response.json(
      {
        message: "Connexion réussie",
        user: userResponse,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return Response.json({ message: "Erreur serveur lors de la connexion" }, { status: 500 })
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
