import { getVinylById } from "@/lib/actions/vinyls"
import VinylDetailsClient from "./VinylDetailsClient"
import vinyls from "@/data/vinyls.js"
import Link from "next/link" // Importez Link

export function generateStaticParams() {
  // Générer les routes statiques basées sur tes données
  return vinyls.map((v) => ({ id: v.id }))
}

export default async function VinylPage({ params }) {
  const resolvedParams = await params
  console.log("params =", resolvedParams)

  const id = resolvedParams?.id

  if (!id || id === "undefined" || id === "null") {
    return (
      <main className="container py-5">
        <h1>Erreur</h1>
        <p>ID non valide ou non défini: {id}</p>
        {/* Correction: Utilisation de Link au lieu de <a> */}
        <Link href="/vinyles" className="btn btn-primary">
          Retour à la liste
        </Link>
      </main>
    )
  }

  try {
    const vinyl = await getVinylById(id)

    if (!vinyl) {
      return (
        <main className="container py-5">
          <h1>Vinyle non trouvé</h1>
          <p>Aucun vinyle trouvé pour l&apos;ID: {id}</p> {/* Correction: &apos; */}
          {/* Correction: Utilisation de Link au lieu de <a> */}
          <Link href="/vinyles" className="btn btn-primary">
            Retour à la liste
          </Link>
        </main>
      )
    }

    // Assurez-vous que l'ID est correctement défini
    const vinylWithId = {
      ...vinyl,
      id: vinyl._id?.toString() || vinyl.id,
    }

    return (
      <main className="container py-5">
        <VinylDetailsClient vinyl={vinylWithId} />
      </main>
    )
  } catch (error) {
    console.error("Erreur lors du chargement du vinyle:", error)
    return (
      <main className="container py-5">
        <h1>Erreur</h1>
        <p>Une erreur est survenue lors du chargement du vinyle.</p>
        {/* Correction: Utilisation de Link au lieu de <a> */}
        <Link href="/vinyles" className="btn btn-primary">
          Retour à la liste
        </Link>
      </main>
    )
  }
}
