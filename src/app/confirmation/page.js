"use client"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="mb-4 text-success">🎉 Order confirmed!</h1>
      <p>
        Thank you for your purchase at <strong>Tunisia Xplora</strong>.
      </p>
      <p>A confirmation email has been sent.</p>
      <Link href="/" className="btn btn-primary mt-4">
        Back to home
      </Link>
    </div>
  )
}
