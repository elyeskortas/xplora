"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ArtistDashboard() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (!res.ok) return router.push('/auth/login?redirect=/artist')
      const data = await res.json()
      if (data.role !== 'artist') return router.push('/auth/login?redirect=/artist')
      setProfile(data)
    }
    load()
  }, [router])

  if (!profile) return <div className="container py-6">Loading...</div>

  return (
    <div className="container py-6">
      <h2 className="mb-4">Artist Account</h2>
      <div className="card p-4">
        <h4>{profile.artistProfile?.stageName || (profile.firstName + ' ' + profile.lastName)}</h4>
        <p>{profile.artistProfile?.bio}</p>
        <p><strong>Contact:</strong> {profile.artistProfile?.professionalContact || profile.email}</p>
        <p><strong>External links:</strong> {(profile.artistProfile?.externalLinks || []).join(', ')}</p>
      </div>
    </div>
  )
}
