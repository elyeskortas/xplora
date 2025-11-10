import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/context/locale-context'

export default function Categories() {
  const { messages } = useLocale()

  return (
    <section className="categories py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          {[
            { img: 'house.jpg', title: 'House', id: 'house' },
            { img: 'jazzandblues.jpg', title: 'Jazz & Blues', id: 'jazz-and-blues' },
            { img: 'techno.jpg', title: 'Techno', id: 'techno' },
          ].map(({ img, title, id }) => (
            <div className="col-md-4" key={id}>
              <div className="card">
                {/* Use a positioned container with fixed height and Image fill for correct aspect ratio */}
                <div style={{ position: 'relative', height: 200 }}>
                  <Image
                    src={`/images/${img}`}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title">{title}</h5>
                  <Link href={`/categories/${id}`} className="btn btn-dark text-uppercase mt-2">
                    {messages?.discover || 'Discover'}
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
