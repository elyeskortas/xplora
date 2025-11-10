import SearchClient from "./SearchClient"

export const metadata = {
  title: "Search results",
  description: "Search results",
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || ""
  return (
    <main className="container py-5">
      <SearchClient query={query} vinyls={[]} error={null} />
    </main>
  )
}
