"use client"

import { useState, useEffect } from 'react'
import { useLocale } from '@/context/locale-context'

export default function BookingForm({ tourSlug }) {
  const { messages } = useLocale()
  const [state, setState] = useState({
    name: '', email: '', phone: '', country: '',
    adults: '', children: '', startDate: '',
    accommodation: '', extraInfo: '', contactPreference: '',
    phoneCode: ''
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const accomOptions = (messages?.accommodation_options || 'Economy,Mid-range,Superior,Luxury').split(',').map(s => s.trim()).filter(Boolean)
  const contactOptions = (messages?.contact_pref_options || 'Email,WhatsApp').split(',').map(s => s.trim()).filter(Boolean)

  // Load country dial codes
  const [countryCodes, setCountryCodes] = useState([])
  useEffect(() => {
    fetch('/countries.json')
      .then(r => r.json())
      .then(list => setCountryCodes(list))
      .catch(() => setCountryCodes([]))
  }, [])

  const phoneCountryOptions = countryCodes.length ? countryCodes.map(c => ({ code: c.dialCode, label: `${c.name} (${c.dialCode})` })) : [ { code: '+216', label: 'Tunisia (+216)' } ]

  const onChange = (e) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  // Ensure defaults match current locale options
  useEffect(() => {
    setState(prev => ({
      ...prev,
      accommodation: accomOptions.includes(prev.accommodation) ? prev.accommodation : (accomOptions[1] || accomOptions[0] || ''),
      contactPreference: contactOptions.includes(prev.contactPreference) ? prev.contactPreference : (contactOptions[0] || ''),
      phoneCode: prev.phoneCode || '+216'
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages?.accommodation_options, messages?.contact_pref_options])

  const requiredLabels = {
    name: messages?.name_label || 'Name',
    email: messages?.email_label || 'Email',
    phone: messages?.phone_label || 'Phone number',
    country: messages?.country_label || 'Country',
    adults: messages?.adults_label || 'Adults',
    startDate: messages?.start_date_label || 'Preferred start date',
    accommodation: messages?.accommodation_label || 'Accommodation'
  }

  function validate() {
    const nextErrors = {}
    Object.entries(requiredLabels).forEach(([key, label]) => {
      if (!String(state[key]).trim()) nextErrors[key] = `${label} *`
    })
    if (!String(state.phoneCode).trim()) nextErrors.phoneCode = (messages?.phone_code_label || 'Country code') + ' *'
    if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) nextErrors.email = (messages?.invalid_email || 'Invalid email')
    if (state.adults && Number(state.adults) < 1) nextErrors.adults = (messages?.adults_label || 'Adults')
    return nextErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sent) return
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setLoading(true)
    try {
      const payload = {
        ...state,
        phone: `${state.phoneCode || ''} ${state.phone || ''}`.trim(),
        tourSlug,
      }
      const res = await fetch('/api/booking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) setSent(true)
    } finally { setLoading(false) }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 flex items-start gap-3" role="status">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">✓</span>
        <div>
          <p className="font-semibold mb-1">{messages?.request_thanks || 'Thank you! We will contact you shortly.'}</p>
          <p className="text-sm opacity-80">{messages?.follow_up_note || 'Our team is preparing your itinerary. You can reply to the confirmation email to refine details.'}</p>
        </div>
      </div>
    )
  }

  // Field helper component
  const Field = ({ name, children, label, required }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}{required && <span className="text-red-500" aria-hidden>*</span>}
      </label>
      {children}
      {errors[name] && <p className="text-xs text-red-600">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Basic Info */}
      <fieldset className="grid md:grid-cols-2 gap-4">
        <Field name="name" label={requiredLabels.name} required>
          <input id="name" name="name" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={requiredLabels.name} value={state.name} onChange={onChange} autoComplete="name" />
        </Field>
        <Field name="email" label={requiredLabels.email} required>
          <input id="email" name="email" type="email" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={requiredLabels.email} value={state.email} onChange={onChange} autoComplete="email" />
        </Field>
      </fieldset>

      <fieldset className="grid md:grid-cols-2 gap-4">
        <Field name="phone" label={requiredLabels.phone} required>
          <div className="grid grid-cols-[140px,1fr] gap-2 items-start">
            <div>
              <select id="phoneCode" name="phoneCode" className="form-select focus:ring-2 focus:ring-primary/50" value={state.phoneCode} onChange={onChange}>
                {!state.phoneCode && <option value="" disabled>{messages?.phone_code_label || 'Country code'}</option>}
                {phoneCountryOptions.map(opt => (
                  <option key={opt.code + opt.label} value={opt.code}>{opt.label}</option>
                ))}
              </select>
              {errors.phoneCode && <p className="text-xs text-red-600 mt-1">{errors.phoneCode}</p>}
            </div>
            <input id="phone" name="phone" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={(messages?.phone_label || 'Phone number')} value={state.phone} onChange={onChange} autoComplete="tel" />
          </div>
        </Field>
        <Field name="country" label={requiredLabels.country} required>
          <input id="country" name="country" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={requiredLabels.country} value={state.country} onChange={onChange} autoComplete="country" />
        </Field>
      </fieldset>

      <fieldset className="grid md:grid-cols-3 gap-4">
        <Field name="adults" label={requiredLabels.adults} required>
          <input id="adults" name="adults" type="number" min="1" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={requiredLabels.adults} value={state.adults} onChange={onChange} />
        </Field>
        <Field name="children" label={messages?.children_label || 'Children (under 12)'}
          >
          <input id="children" name="children" type="number" min="0" className="form-control focus:ring-2 focus:ring-primary/50" placeholder={messages?.children_label || 'Children (under 12)'} value={state.children} onChange={onChange} />
        </Field>
        <Field name="startDate" label={requiredLabels.startDate} required>
          <input id="startDate" name="startDate" type="date" className="form-control focus:ring-2 focus:ring-primary/50" value={state.startDate} onChange={onChange} />
        </Field>
      </fieldset>

      <fieldset className="grid md:grid-cols-2 gap-4">
        <Field name="accommodation" label={requiredLabels.accommodation} required>
          <select id="accommodation" name="accommodation" className="form-select focus:ring-2 focus:ring-primary/50" value={state.accommodation} onChange={onChange}>
            {!state.accommodation && <option value="" disabled>{requiredLabels.accommodation}</option>}
            {accomOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        {contactOptions.length > 0 && (
          <Field name="contactPreference" label={messages?.contact_pref_label || 'Contact preference'}>
            <select id="contactPreference" name="contactPreference" className="form-select focus:ring-2 focus:ring-primary/50" value={state.contactPreference} onChange={onChange}>
              {!state.contactPreference && <option value="" disabled>{messages?.contact_pref_label || 'Contact preference'}</option>}
              {contactOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        )}
      </fieldset>

      <Field name="extraInfo" label={messages?.extra_info_label || 'Additional information (optional)'}
        >
        <textarea id="extraInfo" name="extraInfo" className="form-control focus:ring-2 focus:ring-primary/50" rows={4} placeholder={messages?.extra_info_label || 'Additional information (optional)'} value={state.extraInfo} onChange={onChange} />
      </Field>

      {tourSlug && <input type="hidden" name="tourSlug" value={tourSlug} />}

      <div className="flex flex-col gap-3">
        <button className="btn btn-primary flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading} aria-label={messages?.submit_request || 'Submit request'}>
          {loading && <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          <span>{loading ? ((messages?.submit_request || 'Submit request') + '…') : (messages?.submit_request || 'Submit request')}</span>
        </button>
        <p className="text-xs text-gray-500 leading-relaxed">
          {messages?.privacy_disclaimer || 'We only use your details to reply to this inquiry. No spam, no sharing with third parties.'}
        </p>
      </div>
    </form>
  )
}
