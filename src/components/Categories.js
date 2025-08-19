import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
  return (
    <section className="categories py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          {[
            { img: 'RockandIndie-.png', title: 'Rock & Indie', id: 'rock' },
            { img: 'jazzandblues.jpg', title: 'Jazz & Blues', id: 'jazz' },
            { img: 'ElectroandLo-fi.png', title: 'Électro & Lo-fi', id: 'electro' },
          ].map(({ img, title, id }) => (
            <div className="col-md-4" key={title}>
              <div className="card">
                <Image
  src={`/images/${img}`}
  alt={title}
  width={300}
  height={200}
  className="img-fluid"
/>

                <div className="card-body text-center">
                  <h5 className="card-title">{title}</h5>
                  <Link href={`/vinyles#${id}`} className="btn btn-dark text-uppercase mt-2">
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}