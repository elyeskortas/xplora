"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from '@/context/locale-context'

export default function SearchClient({ query, vinyls, error }) {
  const router = useRouter();
  const { messages } = useLocale()

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        {messages?.search_results_heading || `Search results for "${query}"`}
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}

      {!query && (
        <div className="alert alert-info" role="alert">
          {messages?.enter_search_term || 'Please enter a search term in the navigation bar.'}
        </div>
      )}

      {query && !error && (
        <div className="alert alert-warning" role="alert">
          {messages?.no_results || `No results found for "${query}".`}
        </div>
      )}

      <div className="text-center mt-4">
        <Link href="/" className="btn btn-primary">{messages?.back_to_home || 'Back to home'}</Link>
      </div>
    </div>
  );
}
