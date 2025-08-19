<<<<<<< HEAD
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
=======
import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { hashPassword, generateToken, validateEmail, validatePassword } from "@/lib/auth.js"
import { cookies } from "next/headers"

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = await request.json()

    // Validation des données
    if (!firstName || !lastName || !email || !password) {
      return Response.json({ message: "Tous les champs sont requis" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return Response.json({ message: "Email invalide" }, { status: 400 })
    }

    if (!validatePassword(password)) {
      return Response.json({ message: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return Response.json({ message: "Les mots de passe ne correspondent pas" }, { status: 400 })
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    }

    await connectToDB()

    // Vérifier si l'utilisateur existe déjà
<<<<<<< HEAD
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ message: "Un compte avec cet email existe déjà" }, { status: 409 })
=======
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "Un compte avec cet email existe déjà" }, { status: 400 })
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password)

    // Créer l'utilisateur
    const user = new User({
<<<<<<< HEAD
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
=======
      firstName,
      lastName,
      email,
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      password: hashedPassword,
    })

    await user.save()

    // Générer le token
    const token = generateToken(user._id)

<<<<<<< HEAD
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
=======
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
        message: "Inscription réussie",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return Response.json({ message: "Erreur serveur lors de l'inscription" }, { status: 500 })
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
