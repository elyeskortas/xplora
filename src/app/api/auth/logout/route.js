<<<<<<< HEAD
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Déconnexion réussie" })

    // Supprimer le cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
  }
}
=======
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Supprimer le cookie d'authentification
    cookieStore.delete("auth-token")

    return Response.json({ message: "Déconnexion réussie" }, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
    return Response.json({ message: "Erreur serveur lors de la déconnexion" }, { status: 500 })
  }
}
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
