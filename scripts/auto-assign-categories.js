#!/usr/bin/env node
// scripts/auto-assign-categories.js
// Attempt to automatically assign proper categories (category + category_slug)
// for vinyl documents that currently have category_slug set to 'all' or missing.

import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

const DEFAULT_ALLOWED = ['all','exclusive','new-arrival','best-sellers','house','techno','beats','trance','pop-rock','hip-hop','equipment']

// mapping of slug => display name
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

// keyword heuristics: list of [slug, keywords[]]
const KEYWORDS = [
  ['techno', ['techno','bpm','rave','industrial','berghain','dj t']] ,
  ['house', ['house','deep house','garage house','house music','liquid','disco','house-'] ],
  ['trance', ['trance','psytrance','uplifting trance','goa'] ],
  ['beats', ['beats','lo-fi','lofi','beats','instrumental hip hop','boom bap'] ],
  ['hip-hop', ['hip-hop','hip hop','hiphop','rap','mc ','dj shadow','kanye','jay-z','nas','dr dre','dr. dre'] ],
  ['pop-rock', ['pop','rock','indie','band','guitar','singer','nirvana','beatles','rolling','taylor','radiohead','coldplay','fleetwood'] ],
  ['equipment', ['turntable','needle','cartridge','mixer','headphone','technics','strobe','dj controller','platter'] ],
]

// detect jazz/blues and create a new category if found
const EXTRA_KEYWORDS = {
  'jazz-blues': ['jazz','blues','miles davis','coltrane','john coltrane','billie holiday','bessie smith']
}

function slugify(value) {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
}

function chooseCategoryForDoc(doc, allowed, categoriesMap) {
  const text = `${doc.title || ''} ${doc.category || ''} ${doc.description || ''} ${(doc.artist || '')}`.toLowerCase()

  // check extra categories first (jazz-blues)
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

  // fallback rules
  if (doc.bestsellers) return { slug: 'best-sellers', name: categoriesMap['best-sellers'] }
  if (doc.newArrival) return { slug: 'new-arrival', name: categoriesMap['new-arrival'] }

  // if category field already looks like a known slug or name, use it
  const c = doc.category || ''
  const s = slugify(c)
  if (allowed.includes(s)) return { slug: s, name: categoriesMap[s] }

  // default fallback to 'all'
  return { slug: 'all', name: categoriesMap['all'] }
}

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI in .env.local')
    process.exit(1)
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const db = client.db()
    const coll = db.collection('vinyls')

    // Build allowed list and categories map (allow dynamic addition)
    const allowed = [...DEFAULT_ALLOWED]
    const categoriesMap = { ...CATEGORIES_MAP }

    // fetch target docs: those with category_slug 'all' or missing
    const cursor = coll.find({ $or: [ { category_slug: { $exists: false } }, { category_slug: 'all' } ] })

    const updates = []
    while (await cursor.hasNext()) {
      const doc = await cursor.next()
      const choice = chooseCategoryForDoc(doc, allowed, categoriesMap)

      // if choice slug is new, add to allowed and categoriesMap
      if (!allowed.includes(choice.slug)) {
        allowed.push(choice.slug)
        categoriesMap[choice.slug] = choice.name || choice.slug
        console.log('Added new category:', choice.slug, '->', choice.name)
      }

      // set human-readable category (name) and category_slug
      const newCategory = choice.name || choice.slug
      const newSlug = choice.slug

      // perform update
      const res = await coll.updateOne({ _id: doc._id }, { $set: { category: newCategory, category_slug: newSlug } })
      updates.push({ id: doc._id.toString(), title: doc.title || '', old: doc.category || null, newCategory: newCategory, newSlug, modified: res.modifiedCount })
    }

    console.log('\nAuto-assign completed. Summary:')
    updates.forEach((u) => console.log(`- ${u.title} => ${u.newCategory} (${u.newSlug}) ${u.modified ? 'UPDATED' : 'UNCHANGED'}`))
    console.log('\nTotal processed:', updates.length)
  } catch (err) {
    console.error('Error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

main()
