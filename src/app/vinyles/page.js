// C:\Users\MSI\vinylia\src\app\vinyles\page.js
import VinylListClient from "./VinylListClient"

export default async function VinylList() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/vinyls`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const vinyls = await res.json()
    return <VinylListClient vinyls={vinyls} />
  } catch (error) {
    console.error("Erreur lors du chargement des vinyles:", error)
    return (
      <div className="container py-5">
        <h2 className="mb-4">Nos vinyles</h2>
        <p>Erreur lors du chargement des vinyles. Veuillez réessayer plus tard.</p>
      </div>
    )
  }
}
