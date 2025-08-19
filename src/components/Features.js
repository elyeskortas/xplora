export default function Features() {
  const features = [
    {
      id: "star-quality",
      width: 38,
      height: 38,
      title: "Haute qualité",
      desc: "Chaque vinyle est sélectionné, nettoyé et vérifié pour une écoute optimale.",
    },
    {
      id: "fast-delivery",
      width: 30,
      height: 30,
      title: "Livraison rapide",
      desc: "Livraison rapide et fiable partout.",
    },
    {
      id: "best-guarantee",
      width: 60,
      height: 60,
      title: "Meilleure garantie",
      desc: "Garantie satisfait ou remboursé, commandez en toute confiance.",
    },
    {
      id: "audio-preview",
      width: 38,
      height: 38,
      title: "Écoute en ligne",
      desc: "Écoutez un extrait avant d’acheter.",
    },
  ];

  return (
    <section className="features py-5 bg-white">
      <div className="container">
        <div className="row text-center">
          {features.map(({ id, width, height, title, desc }) => (
            <div
              key={id}
              className="col-md-3 d-flex flex-column align-items-center justify-content-center text-center"
              style={{ minHeight: '250px' }}
            >
              <svg width={width} height={height} className="mb-3">
                <use xlinkHref={`#${id}`} />
              </svg>
              <h4 className="my-3">{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
