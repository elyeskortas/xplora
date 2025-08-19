import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import User from "@/models/user"
import { hashPassword, generateToken, validateEmail, validatePassword } from "@/lib/auth"

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Validation des données
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Email invalide" }, { status: 400 })
    }

    if (!validatePassword(password)) {
      return NextResponse.json({ message: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
    }

    await connectToDB()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ message: "Un compte avec cet email existe déjà" }, { status: 409 })
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password)

    // Créer l'utilisateur
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    })

    await user.save()

    // Générer le token
    const token = generateToken(user._id)

    const response = NextResponse.json({
      message: "Inscription réussie",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    })

    // Définir le cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
  }
}
