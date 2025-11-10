#!/usr/bin/env node
// scripts/suggest-categories.js
// Print suggested category assignments for vinyls in the DB without modifying them.

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

function slugify(value) {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
}

const DEFAULT_ALLOWED = ['all','exclusive','new-arrival','best-sellers','house','techno','beats','trance','pop-rock','hip-hop','equipment']
const CATEGORIES_MAP = {
  'all': 'All',
  'exclusive': 'Exclusive',
  'new-arrival': 'New Arrival',
  'best-sellers': 'Best Sellers',
  'house': 'House',
  'techno': 'Techno',
  'beats': 'Beats',
  'trance': 'Trance',
  'pop-rock': 'Pop & Rock',
  'hip-hop': 'Hip-Hop',
  'equipment': 'Equipment',
}

const KEYWORDS = [
  ['techno', ['techno','rave','berghain','industrial','acid','bpm']],
  ['house', ['house','deep house','garage house','disco','four-to-the-floor']],
  ['trance', ['trance','psytrance','uplifting trance','goa']],
  ['beats', ['beats','lo-fi','lofi','instrumental','boom bap']],
  ['hip-hop', ['hip-hop','hip hop','hiphop','rap','mc ','kanye','jay-z','nas','dr dre','dr. dre']],
  ['pop-rock', ['pop','rock','indie','band','guitar','singer','nirvana','beatles','rolling','taylor','radiohead','coldplay','fleetwood']],
  ['equipment', ['turntable','needle','cartridge','mixer','headphone','technics','controller','platter']],
]

const EXTRA_KEYWORDS = {
  'jazz-blues': ['jazz','blues','miles davis','coltrane','billie holiday','bessie smith']
}

function chooseCategoryForDoc(doc, allowed, categoriesMap) {
  const text = `${doc.title || ''} ${doc.category || ''} ${doc.description || ''} ${(doc.artist || '')}`.toLowerCase()

  for (const [slug, kws] of Object.entries(EXTRA_KEYWORDS)) {
    for (const kw of kws) {
      if (text.includes(kw)) return { slug, name: categoriesMap[slug] || (slug === 'jazz-blues' ? 'Jazz & Blues' : slug) }
    }
  }

  for (const [slug, kws] of KEYWORDS) {
    for (const kw of kws) {
      if (text.includes(kw)) return { slug, name: categoriesMap[slug] || slug }
    }
  }

  if (doc.bestsellers) return { slug: 'best-sellers', name: categoriesMap['best-sellers'] }
  if (doc.newArrival) return { slug: 'new-arrival', name: categoriesMap['new-arrival'] }

  const c = doc.category || ''
  const s = slugify(c)
  if (allowed.includes(s)) return { slug: s, name: categoriesMap[s] }

  return { slug: 'all', name: categoriesMap['all'] }
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI')
    process.exit(1)
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

    const allowed = [...DEFAULT_ALLOWED]
    const categoriesMap = { ...CATEGORIES_MAP }

    const docs = await coll.find({}).toArray()
    if (!docs.length) {
      console.log('No vinyls found in the database.')
      return
    }

    console.log('\nSuggested category assignments:\n')
    const suggestions = docs.map((doc) => {
      const choice = chooseCategoryForDoc(doc, allowed, categoriesMap)
      return {
        id: doc._id.toString(),
        title: doc.title || '(no title)',
        currentCategory: doc.category || null,
        currentSlug: doc.category_slug || null,
        suggestedCategory: choice.name,
        suggestedSlug: choice.slug,
      }
    })

    suggestions.forEach((s, idx) => {
      console.log(`${idx + 1}. ${s.title}`)
      console.log(`   current: ${s.currentCategory || 'N/A'} (${s.currentSlug || 'N/A'})`)
      console.log(`   suggested: ${s.suggestedCategory} (${s.suggestedSlug})\n`)
    })

    console.log('Total vinyls:', suggestions.length)
    console.log('\nTo apply these suggestions run: node ./scripts/auto-assign-categories.js')
  } catch (err) {
    console.error('Error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
