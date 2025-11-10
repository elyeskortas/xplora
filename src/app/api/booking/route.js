import dbConnect from '@/lib/db'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json()
    const {
      name, email, phone, country,
      tourSlug, adults, children, startDate,
      accommodation, extraInfo, contactPreference
    } = body

    const text = `New trip inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nTour: ${tourSlug || 'Custom'}\nAdults: ${adults}  Children: ${children}\nPreferred start date: ${startDate}\nAccommodation: ${accommodation}\nContact preference: ${contactPreference}\n\nAdditional info:\n${extraInfo || '-'}\n`
    const html = text.replace(/\n/g, '<br/>')

    // Always send via Email
    await sendEmail(html, tourSlug)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ ok: false, error: 'Booking failed' }), { status: 500 })
  }
}

async function sendEmail(html, tourSlug) {
  if (!process.env.BOOKING_RECEIVER_EMAIL) return
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.BOOKING_RECEIVER_EMAIL,
    subject: `New trip inquiry - ${tourSlug || 'Custom'}`,
    html
  })
}
