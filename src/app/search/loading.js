import React from 'react';

export default function Loading() {
  return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      <p className="mt-3">Chargement des résultats de recherche...</p>
    </div>
  );
}
