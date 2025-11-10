"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { useLocale } from '@/context/locale-context'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function ReviewsClient() {
  const { messages } = useLocale()
  const { data, error, isLoading, mutate } = useSWR('/api/reviews', fetcher)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '', tourSlug: '' })
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.comment) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        setForm({ name: '', rating: 5, comment: '', tourSlug: '' })
        mutate()
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {isLoading && <div>{messages?.loading || 'Loading...'}</div>}
        {error && <div className="text-red-600">{messages?.failed_to_load || 'Failed to load'}</div>}
        {(data || []).map((r) => (
          <article key={r._id} className="border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{r.name}</h3>
              <div className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
            </div>
            <p className="text-gray-700 mb-2">{r.comment}</p>
            <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()} {r.source ? `• ${r.source}` : ''}</div>
          </article>
        ))}
      </div>
      <aside className="lg:col-span-1">
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">{messages?.leave_review || 'Leave a review'}</h2>
          <form className="space-y-3" onSubmit={submit}>
            <div>
              <label className="block text-sm mb-1">{messages?.name_label || 'Name'}</label>
              <input className="form-control w-full" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm mb-1">{messages?.rating_label || 'Rating'}</label>
              <select className="form-select w-full" value={form.rating} onChange={e=>setForm({...form, rating:Number(e.target.value)})}>
                {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">{messages?.comment_label || 'Comment'}</label>
              <textarea className="form-control w-full" rows={4} value={form.comment} onChange={e=>setForm({...form, comment:e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={submitting}>{submitting ? (messages?.submitting || 'Submitting...') : (messages?.submit_review || 'Submit review')}</button>
          </form>
        </div>
      </aside>
    </div>
  )
}
