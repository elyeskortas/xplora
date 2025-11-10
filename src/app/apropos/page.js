import React from "react";

export default function AboutLegacyPage() {
  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4">About</h1>
        <p className="lead text-center">
          This legacy page has been replaced by the new About Us in the travel site.
        </p>
        <div className="text-center mt-4">
          <a href="/about" className="btn btn-primary">Go to Tunisia Xplora About</a>
        </div>
      </div>

      {/* Footer removed, now global */}
    </>
  );
}