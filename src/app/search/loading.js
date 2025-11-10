import React from 'react';
import { useLocale } from '@/context/locale-context'

export default function Loading() {
  const { messages } = useLocale()
  const text = messages?.searching || messages?.loading || 'Loading...'
  return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{messages?.loading || 'Loading...'}</span>
      </div>
      <p className="mt-3">{text}</p>
    </div>
  );
}
