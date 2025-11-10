'use client';

import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export default function PrivacyPolicyPage() {
  const { messages } = useLocale();
  return (
    <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        {messages?.privacy_title || messages?.privacy_policy || 'Privacy policy'}
      </h1>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.privacy_section1_title || 'Information we collect'}</h2>
        <p className="text-gray-700">
          {messages?.privacy_section1_text || 'We only collect information necessary to provide our services, such as your email for the newsletter or for travel inquiries.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.privacy_section2_title || 'How we use your information'}</h2>
        <p className="text-gray-700">
          {messages?.privacy_section2_text || 'Your information is used only to manage your inquiries, bookings and to send you updates if you subscribe to our newsletter.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.privacy_section3_title || 'Information sharing'}</h2>
        <p className="text-gray-700">
          {messages?.privacy_section3_text || 'We do not share your personal information with third parties, except to process bookings or if required by law.'}
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">{messages?.privacy_contact_title || 'Contact'}</h2>
        <p className="text-gray-700">
          {messages?.privacy_contact_text || 'For any questions about our privacy policy, please contact us.'} {" "}
          <Link href="/contact" className="text-primary underline font-medium">{messages?.contact || 'Contact us'}</Link>.
        </p>
      </section>

      <div className="text-center mt-8">
        <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
          {messages?.back_to_home || 'Back to home'}
        </Link>
      </div>
    </main>
  );
}
