<<<<<<< HEAD
// src/app/api/auth/profile/route.js
import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { hashPassword, validateEmail, validatePassword, verifyToken } from "@/lib/auth.js"
import { cookies } from "next/headers"

// ✅ Inscription (tu l’as déjà)
=======
import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { hashPassword, generateToken, validateEmail, validatePassword } from "@/lib/auth.js"
import { cookies } from "next/headers"

>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
export async function POST(request) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = await request.json()

<<<<<<< HEAD
    if (!firstName || !lastName || !email || !password) {
      return Response.json({ message: "Tous les champs sont requis" }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return Response.json({ message: "Email invalide" }, { status: 400 })
    }
    if (!validatePassword(password)) {
      return Response.json({ message: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
    }
=======
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

>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    if (password !== confirmPassword) {
      return Response.json({ message: "Les mots de passe ne correspondent pas" }, { status: 400 })
    }

    await connectToDB()

<<<<<<< HEAD
=======
    // Vérifier si l'utilisateur existe déjà
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "Un compte avec cet email existe déjà" }, { status: 400 })
    }

<<<<<<< HEAD
    const hashedPassword = await hashPassword(password)

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    })
    await user.save()

    return Response.json(
      {
        message: "Inscription réussie",
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
=======
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password)

    // Créer l'utilisateur
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    await user.save()

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
        message: "Inscription réussie",
        user: userResponse,
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return Response.json({ message: "Erreur serveur lors de l'inscription" }, { status: 500 })
  }
}
<<<<<<< HEAD

// ✅ Mise à jour du profil utilisateur connecté
export async function PUT(request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token") // ⚠️ on utilise le cookie "token" (déjà mis à la connexion)
    if (!token) {
      return Response.json({ message: "Non autorisé" }, { status: 401 })
    }

    const decoded = verifyToken(token.value)
    if (!decoded) {
      return Response.json({ message: "Token invalide" }, { status: 401 })
    }

    const body = await request.json()
    const updates = {}

    if (body.firstName) updates.firstName = body.firstName.trim()
    if (body.lastName) updates.lastName = body.lastName.trim()
    if (body.phone) updates.phone = body.phone
    if (body.address) updates.address = body.address
    if (body.avatar) updates.avatar = body.avatar

    // si utilisateur veut changer son mot de passe
    if (body.password) {
      if (!validatePassword(body.password)) {
        return Response.json({ message: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
      }
      updates.password = await hashPassword(body.password)
    }

    await connectToDB()
    const updated = await User.findByIdAndUpdate(decoded.userId, updates, { new: true }).select("-password")

    if (!updated) {
      return Response.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    return Response.json({
      message: "Profil mis à jour avec succès",
      user: {
        id: updated._id.toString(),
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        phone: updated.phone,
        avatar: updated.avatar,
        address: updated.address,
      },
    })
  } catch (error) {
    console.error("Erreur mise à jour profil:", error)
    return Response.json({ message: "Erreur serveur lors de la mise à jour du profil" }, { status: 500 })
  }
}
=======
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
