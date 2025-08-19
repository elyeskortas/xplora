import vinyls from "@/data/vinyls"
import HeroVinylsClient from "./HeroVinylsClient"

export default function Hero() {
  // Par exemple, les vinyles Hero que tu veux afficher :
  const heroVinyls = vinyls.filter((v) =>
    ["utopia", "ocean-blvd", "the-record", "hackney-diamonds", "sos", "this-is-why"].includes(v.id),
  )
  return (
    <section id="billboard" className="bg-light py-5">
      <div className="container">
        {/* Texte, titres, etc. */}
        <h1 className="section-title text-center mt-4 mb-5">Explorez l’univers des vinyles authentiques</h1>
        {/* Changement ici : col-lg-8 mx-auto pour centrer la colonne */}
        <div className="col-lg-8 mx-auto text-center mb-5">
          <p className="lead">
            Une collection unique à écouter et commander en toute simplicité. Plongez dans l’ambiance rétro avec nos
            vinyles soigneusement sélectionnés. Écoutez des extraits en ligne avant de faire votre choix. Offrez-vous
            une expérience musicale vintage inoubliable.
          </p>
        </div>
        {/* Ici le composant client avec wishlist */}
        <HeroVinylsClient vinyls={heroVinyls} />
      </div>
    </section>
  )
}
