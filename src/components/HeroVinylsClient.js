"use client";

import Link from "next/link";
import WishlistButton from "./WishlistButton";
import Image from "next/image";

export default function HeroVinylsClient({ vinyls }) {
  return (
    <div className="d-flex overflow-auto gap-4 py-4">
      {vinyls.map((vinyl) => {
        const vinylId = vinyl._id?.toString() || vinyl.id;

        return (
          <div
            key={vinylId}
            className="card"
            style={{ width: "300px", flexShrink: 0, position: "relative" }}
          >
            <Link
              href={`/vinyles/${vinylId}`}
              className="text-decoration-none text-dark"
            >
              <div className="card-img-container">
                <Image
  src={`/images/${vinyl.image}`}
  alt={vinyl.title}
  width={300}
  height={200}
  style={{ objectFit: "cover", width: "100%", height: "200px" }}
/>

              </div>
              <div className="card-body">
                <h5 className="card-title text-uppercase">{vinyl.title}</h5>
              </div>
            </Link>
            <WishlistButton vinyl={{ ...vinyl, id: vinylId }} />
          </div>
        );
      })}
    </div>
  );
}
