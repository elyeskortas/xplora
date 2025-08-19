import SearchClient from "./SearchClient"

export const metadata = {
  title: "Résultats de recherche - Vinylia",
  description: "Découvrez les vinyles correspondant à votre recherche sur Vinylia.",
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || ""
  let vinyls = []
  let error = null

  if (query) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      const res = await fetch(`${baseUrl}/api/vinyls/search?query=${encodeURIComponent(query)}`, {
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
})


      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      vinyls = await res.json()
    } catch (err) {
      console.error("Erreur lors de la récupération des résultats de recherche:", err)
      error = "Une erreur est survenue lors de la recherche. Veuillez réessayer."
    }
  }

  return (
    <main className="container py-5">
      <SearchClient query={query} vinyls={vinyls} error={error} />
    </main>
  )
}
