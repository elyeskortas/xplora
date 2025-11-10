import { useLocale } from '@/context/locale-context'

export default function Features() {
  const { messages } = useLocale()
  const features = [
    {
      id: "star-quality",
      title: messages?.feature_quality_title || "Expert guides",
      desc: messages?.feature_quality_desc || "Local certified guides for an authentic Tunisia experience.",
    },
    {
      id: "fast-delivery",
      title: messages?.feature_delivery_title || "Easy booking",
      desc: messages?.feature_delivery_desc || "Book by email or WhatsApp. Fast confirmations.",
    },
    {
      id: "best-guarantee",
      title: messages?.feature_guarantee_title || "VIP private trips",
      desc: messages?.feature_guarantee_desc || "Tailor-made itineraries with premium vehicles and drivers.",
    },
    {
      id: "audio-preview",
      title: messages?.feature_preview_title || "Multilingual support",
      desc: messages?.feature_preview_desc || "Service available in EN / FR / ES / IT.",
    },
  ];

  return (
    <section className="features py-5 bg-white">
      <div className="container">
        <div className="row text-center">
          {features.map(({ id, title, desc }) => (
            <div
              key={id}
              className="col-6 col-md-3 d-flex flex-column align-items-center justify-content-start text-center mb-4"
              style={{ minHeight: "250px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <svg
                  className="text-primary"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="currentColor"
                >
                  <use xlinkHref={`#${id}`} />
                </svg>
              </div>
              <h4 className="my-2">{title}</h4>
              <p className="text-muted small px-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}