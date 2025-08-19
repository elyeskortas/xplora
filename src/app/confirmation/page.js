"use client"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="mb-4 text-success">🎉 Commande confirmée !</h1>
      <p>
        Merci pour votre achat chez <strong>Vinylia</strong>.
      </p>
      <p>Un e-mail de confirmation vous a été envoyé.</p>
      <Link href="/" className="btn btn-primary mt-4">
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
