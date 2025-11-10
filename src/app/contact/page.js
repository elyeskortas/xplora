'use client';

import React from "react";
import { useLocale } from '@/context/locale-context'

export default function ContactPage() {
  const { messages } = useLocale()
  return (
    <>
      <div className="container py-5">
        <h1 className="text-center mb-4">{messages?.contact_heading || 'Contact us'}</h1>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="lead text-center">
              {messages?.contact_lead || "We are happy to help you plan your trip or answer any questions."}
            </p>

            {/* Travel Inquiries Block */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">{messages?.travel_inquiries_title || 'Travel inquiries'}</h5>
                <p className="card-text">
                  {messages?.travel_inquiries_text || 'For tour details, availability and tailor-made requests.'}
                </p>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-envelope-fill me-2"></i> Email:{" "}
                    <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@xplora.tn'}`}>
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@xplora.tn'}
                    </a>
                  </li>
                  <li>
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp:{" "}
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_WHATSAPP?.replace(/\D/g, '') || '21600000000'}`}>
                      {process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '+216 00 000 000'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office Block */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">{messages?.office_title || 'Office'}</h5>
                <p className="card-text">
                  {messages?.office_text || 'Sousse, Tunisia'}
                </p>
                <p className="text-muted small">
                  {messages?.office_note || 'Visits by appointment only.'}
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="text-center mt-5">
              <p>{messages?.follow_us || 'Follow us on social media for the latest news and updates:'}</p>
              <div className="d-flex justify-content-center gap-3">
                <a
                  href="https://facebook.com/xplora.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-lg rounded-circle"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://instagram.com/xplora.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger btn-lg rounded-circle"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://twitter.com/xplora_tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-info btn-lg rounded-circle"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer removed, now global */}
    </>
  );
}