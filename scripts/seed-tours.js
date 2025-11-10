// Seed sample tours for Tunisia Xplora
import 'dotenv/config'
import { connectToDB } from '../src/lib/mongodb.js'
import Tour from '../src/models/tour.js'

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

function buildI18nFromBase(t) {
  const base = {
    title: t.title,
    highlights: t.highlights || [],
    itinerary: t.itinerary || '',
    details: t.details || '',
    packageDays: (t.packageDays || []).map(d => ({ day: d.day, title: d.title, description: d.description }))
  }
  return {
    en: base,
    fr: base,
    it: base,
    es: base,
  }
}

async function main() {
  await connectToDB()

  const tours = [
    {
      title: 'Grand Tunisia Circuit (7 days)',
      slug: 'dia1',
      type: 'circuit',
      duration: '7 days',
      cities: ['Tunis','Carthage','Sidi Bou Saïd','Hammamet','Sousse','Kairouan','Tozeur','Douz','Matmata','El Jem'],
      fromPrice: null,
      languages: ['en','fr','it','es'],
      highlights: ['Medina of Tunis','Bardo Museum','Carthage & Antonine Baths','Sidi Bou Saïd','Sahara dunes','El Jem amphitheatre'],
      itinerary: 'A week across Tunisia from the capital to the Sahara and the coast.',
      details: 'Drafted from your Spanish text; translate later into FR/IT/ES as needed.',
      includes: [],
      excludes: [],
      packageDays: [
        { day: 1, title: 'Arrival in Tunis', description: 'Arrival at Tunis International Airport. Meet your guide and transfer to the hotel in Tunis. Depending on arrival time, dinner and overnight at Hotel El Belvedere Fourati 4* or similar.', image: 'photo72.jpg' },
        { day: 2, title: 'Tunis Medina – Bardo Museum – Carthage – Sidi Bou Saïd', description: 'Breakfast then walking tour in the old medina alleys with typical architecture and souks. Continue to the National Bardo Museum (Ottoman-era palace) to see one of the world’s finest Roman mosaic collections. Lunch included at La Goulette seaside area with typical cuisine. Visit Carthage: Byrsa Hill (birthplace of the city) and the Antonine Baths (2nd-century Roman public baths). End with a stroll in the blue-and-white artists’ village of Sidi Bou Saïd on the hill overlooking the sea. Return to Tunis; dinner à la carte in a medina restaurant (Dar el Jeld or similar) and overnight at Hotel El Belvedere Fourati 4* or similar.', image: 'photo153.jpg' },
        { day: 3, title: 'Tunis – Hammamet – Sousse – Port El Kantaoui', description: 'Breakfast and departure to Hammamet for free time by the sea and in the town center. Continue to Sousse for free time in the medina with its colorful souk. Included lunch in a typical local restaurant. Afternoon arrival at Port El Kantaoui marina for a relaxed walk and drinks. Check-in at hotel in the Port El Kantaoui area. Dinner and overnight at Iberostar Diar El Andalous 4* or similar.', image: 'kantaoui.jpg' },
        { day: 4, title: 'Port El Kantaoui – Kairouan – Tozeur (via mountain oases & desert set)', description: 'Breakfast and departure to Kairouan, the first Arab city in North Africa and fourth holiest city in Islam. Visit the Aghlabid water basins (9th century), the Great Mosque with its 400+ columns, and the Barber’s Mausoleum (Sidi Saheb). Stop at a carpet workshop; Kairouan is Tunisia’s handicraft capital. Included lunch en route. Continue by 4x4 to the mountain oases of Chebika and Tamerza, cross desert and a salt lake, and stop at a Star Wars set. Arrival in Tozeur; dinner and overnight at El Mouradi Tozeur 4* or similar.', image: 'photo102.jpg' },
        { day: 5, title: 'Tozeur – Douz', description: 'Breakfast then short visit to Nefta with a carriage ride through one of the largest and most beautiful palm groves in southern Tunisia. Continue to Tozeur old town to explore its particular brick architecture and center. After included lunch, head to Douz (gateway to the desert) crossing the spectacular Chott El Jerid salt lake (approx. 250 km long and 20 km wide). Optional quad biking or camel ride over the dunes upon arrival. Dinner under Bedouin tents in the desert. Overnight at El Mouradi Douz 4* or similar.', image: 'photo107.jpg' },
        { day: 6, title: 'Douz – Matmata – El Jem – Sousse', description: 'Breakfast and departure to the Berber village of Matmata to visit a troglodyte house (typical underground dwellings). Continue to El Jem (ancient Thysdrus). Included lunch in town, then visit the third largest Roman amphitheatre in the world (2nd century AD) towering over the city. Continue to Port El Kantaoui in Sousse. Later, dinner à la carte at a restaurant in the marina. Overnight at Iberostar Diar El Andalous 4* or similar.', image: 'photo127.jpg' },
        { day: 7, title: 'Sousse – Tunis Airport', description: 'Breakfast, transfer to Tunis airport and end of services.', image: 'photo171.jpg' },
      ],
      images: ['circuit1.jpg'],
      availability: 'All year',
      rating: 5,
      i18n: {
        fr: {
          title: 'Circuit Grand Tunisie (7 jours)',
          highlights: ['Médina de Tunis','Musée du Bardo','Carthage & Thermes d\'Antonin','Sidi Bou Saïd','Dunes du Sahara','Amphithéâtre d\'El Jem'],
          packageDays: [
            { day: 1, title: 'Arrivée à Tunis', description: 'Arrivée à l\'aéroport international de Tunis. Accueil par votre guide et transfert à l\'hôtel à Tunis. Selon l\'heure d\'arrivée, dîner et nuit à l\'Hôtel El Belvedere Fourati 4* ou similaire.' },
            { day: 2, title: 'Médina de Tunis – Musée du Bardo – Carthage – Sidi Bou Saïd', description: 'Petit‑déjeuner puis promenade dans les ruelles de la médina avec son architecture typique et ses souks. Poursuite au Musée National du Bardo (palais ottoman) pour admirer l\'une des plus belles collections de mosaïques romaines au monde. Déjeuner inclus à La Goulette en bord de mer. Visite de Carthage : colline de Byrsa et Thermes d\'Antonin. Fin de journée à Sidi Bou Saïd, le village bleu et blanc surplombant la mer. Retour à Tunis ; dîner à la carte dans un restaurant de la médina (Dar el Jeld ou similaire) et nuit à l\'Hôtel El Belvedere Fourati 4* ou similaire.' },
            { day: 3, title: 'Tunis – Hammamet – Sousse – Port El Kantaoui', description: 'Petit‑déjeuner et départ pour Hammamet pour du temps libre au bord de la mer et en centre‑ville. Continuation vers Sousse pour du temps libre dans la médina et son souk coloré. Déjeuner inclus dans un restaurant local. Arrivée l\'après‑midi à la marina de Port El Kantaoui pour une promenade. Installation à l\'hôtel dans la zone de Port El Kantaoui. Dîner et nuit à l\'Iberostar Diar El Andalous 4* ou similaire.' },
            { day: 4, title: 'Port El Kantaoui – Kairouan – Tozeur (via oasis de montagne & décor désert)', description: 'Petit‑déjeuner et départ pour Kairouan, première ville arabe d\'Afrique du Nord et 4e ville sainte de l\'Islam. Visite des bassins aghlabides (IXe s.), de la Grande Mosquée (400+ colonnes) et du mausolée du Barbier (Sidi Saheb). Arrêt dans un atelier de tapis. Déjeuner inclus en route. Poursuite en 4x4 vers les oasis de montagne de Chebika et Tamerza, traversée du désert et d\'un lac salé, arrêt sur un décor de Star Wars. Arrivée à Tozeur ; dîner et nuit à El Mouradi Tozeur 4* ou similaire.' },
            { day: 5, title: 'Tozeur – Douz', description: 'Petit‑déjeuner puis courte visite de Nefta avec balade en calèche dans un des plus grands palmeraies du sud tunisien. Continuation vers la vieille ville de Tozeur pour découvrir son architecture en brique. Après le déjeuner inclus, route vers Douz en traversant le spectaculaire Chott El Jerid. En option : quad ou dromadaire sur les dunes. Dîner sous des tentes bédouines dans le désert. Nuit à El Mouradi Douz 4* ou similaire.' },
            { day: 6, title: 'Douz – Matmata – El Jem – Sousse', description: 'Petit‑déjeuner et départ pour le village berbère de Matmata pour visiter une maison troglodyte. Continuation vers El Jem (ancienne Thysdrus). Déjeuner inclus en ville puis visite du 3e plus grand amphithéâtre romain du monde (IIe s.). Route vers Port El Kantaoui à Sousse. Dîner à la marina. Nuit à l\'Iberostar Diar El Andalous 4* ou similaire.' },
            { day: 7, title: 'Sousse – Aéroport de Tunis', description: 'Petit‑déjeuner, transfert à l\'aéroport de Tunis et fin de nos services.' }
          ]
        },
        es: {
          title: 'Gran Circuito de Túnez (7 días)',
          highlights: ['Medina de Túnez','Museo del Bardo','Cartago y Termas de Antonino','Sidi Bou Saïd','Dunas del Sahara','Anfiteatro de El Djem'],
          packageDays: [
            { day: 1, title: 'Llegada a Túnez', description: 'Llegada al Aeropuerto Internacional de Túnez. Encuentro con el guía y traslado al hotel en Túnez. Según la hora de llegada, cena y noche en Hotel El Belvedere Fourati 4* o similar.' },
            { day: 2, title: 'Medina de Túnez – Museo del Bardo – Cartago – Sidi Bou Saïd', description: 'Desayuno y paseo por los callejones de la medina con arquitectura típica y zocos. Continuación al Museo Nacional del Bardo (palacio otomano) para ver una de las mejores colecciones de mosaicos romanos del mundo. Almuerzo incluido en La Goulette. Visita de Cartago: colina de Byrsa y Termas de Antonino. Final en Sidi Bou Saïd, el pueblo azul y blanco sobre el mar. Regreso a Túnez; cena a la carta en la medina (Dar el Jeld o similar) y noche en Hotel El Belvedere Fourati 4* o similar.' },
            { day: 3, title: 'Túnez – Hammamet – Susa – Port El Kantaoui', description: 'Desayuno y salida a Hammamet para tiempo libre junto al mar y en el centro. Continuación a Susa para tiempo libre en la medina y su colorido zoco. Almuerzo incluido en restaurante local. Por la tarde llegada a la marina de Port El Kantaoui para un paseo. Alojamiento en la zona. Cena y noche en Iberostar Diar El Andalous 4* o similar.' },
            { day: 4, title: 'Port El Kantaoui – Kairuán – Tozeur (oasis de montaña y decorado del desierto)', description: 'Desayuno y salida hacia Kairuán, primera ciudad árabe del Norte de África y cuarta ciudad santa del Islam. Visita a los estanques aglabíes (siglo IX), la Gran Mezquita y el mausoleo del Barbero (Sidi Saheb). Parada en taller de alfombras. Almuerzo incluido en ruta. Continuación en 4x4 a las oasis de Chebika y Tamerza, cruce del desierto y de un lago salado, y parada en un set de Star Wars. Llegada a Tozeur; cena y noche en El Mouradi Tozeur 4* o similar.' },
            { day: 5, title: 'Tozeur – Douz', description: 'Desayuno y breve visita a Nefta con paseo en coche de caballos por uno de los mayores palmerales del sur de Túnez. Continuación al casco antiguo de Tozeur. Tras el almuerzo incluido, salida hacia Douz cruzando el espectacular Chott El Jerid. Opcional: quad o camello por las dunas. Cena bajo tiendas beduinas en el desierto. Noche en El Mouradi Douz 4* o similar.' },
            { day: 6, title: 'Douz – Matmata – El Djem – Susa', description: 'Desayuno y salida al pueblo bereber de Matmata para visitar una casa troglodita. Continuación a El Djem (antigua Thysdrus). Almuerzo incluido y visita al tercer anfiteatro romano más grande del mundo. Continuación a Port El Kantaoui en Susa. Cena en la marina. Noche en Iberostar Diar El Andalous 4* o similar.' },
            { day: 7, title: 'Susa – Aeropuerto de Túnez', description: 'Desayuno, traslado al aeropuerto de Túnez y fin de los servicios.' }
          ]
        },
        it: {
          title: 'Grand Tour della Tunisia (7 giorni)',
          highlights: ['Medina di Tunisi','Museo del Bardo','Cartagine e Terme di Antonino','Sidi Bou Saïd','Dune del Sahara','Anfiteatro di El Jem'],
          packageDays: [
            { day: 1, title: 'Arrivo a Tunisi', description: 'Arrivo all\'Aeroporto Internazionale di Tunisi. Incontro con la guida e trasferimento in hotel a Tunisi. In base all\'orario di arrivo, cena e pernottamento presso Hotel El Belvedere Fourati 4* o simile.' },
            { day: 2, title: 'Medina di Tunisi – Museo del Bardo – Cartagine – Sidi Bou Saïd', description: 'Colazione e passeggiata nei vicoli della medina con architettura tipica e souk. Proseguimento al Museo Nazionale del Bardo (palazzo ottomano) per ammirare una delle migliori collezioni di mosaici romani. Pranzo incluso a La Goulette. Visita di Cartagine: collina di Byrsa e Terme di Antonino. Fine a Sidi Bou Saïd, il villaggio blu e bianco sul mare. Rientro a Tunisi; cena à la carte nella medina (Dar el Jeld o simile) e pernottamento.' },
            { day: 3, title: 'Tunisi – Hammamet – Sousse – Port El Kantaoui', description: 'Colazione e partenza per Hammamet per tempo libero sul mare e in centro. Proseguimento per Sousse per tempo libero nella medina e nel souk. Pranzo incluso in ristorante locale. Arrivo nel pomeriggio alla marina di Port El Kantaoui per una passeggiata. Sistemazione in hotel nella zona. Cena e pernottamento presso Iberostar Diar El Andalous 4* o simile.' },
            { day: 4, title: 'Port El Kantaoui – Kairouan – Tozeur (oasi di montagna e set del deserto)', description: 'Colazione e partenza per Kairouan, prima città araba del Nord Africa e quarta città santa dell\'Islam. Visita alle cisterne aghlabidi, alla Grande Moschea e al mausoleo del Barbiere (Sidi Saheb). Sosta in un laboratorio di tappeti. Pranzo incluso lungo il percorso. Proseguimento in 4x4 verso le oasi di montagna di Chebika e Tamerza, attraversando deserto e un lago salato, con sosta su un set di Star Wars. Arrivo a Tozeur; cena e pernottamento a El Mouradi Tozeur 4* o simile.' },
            { day: 5, title: 'Tozeur – Douz', description: 'Colazione e breve visita a Nefta con giro in carrozza tra una delle più grandi palme del sud della Tunisia. Proseguimento verso la città vecchia di Tozeur. Dopo il pranzo incluso, partenza per Douz attraversando l\'imponente Chott El Jerid. Opzionale: quad o cammello sulle dune. Cena sotto tende beduine nel deserto. Pernottamento a El Mouradi Douz 4* o simile.' },
            { day: 6, title: 'Douz – Matmata – El Jem – Sousse', description: 'Colazione e partenza per il villaggio berbero di Matmata per visitare una casa troglodita. Proseguimento per El Jem (antica Thysdrus). Pranzo incluso e visita al terzo anfiteatro romano più grande del mondo. Proseguimento per Port El Kantaoui a Sousse. Cena alla marina. Pernottamento a Iberostar Diar El Andalous 4* o simile.' },
            { day: 7, title: 'Sousse – Aeroporto di Tunisi', description: 'Colazione, trasferimento all\'aeroporto di Tunisi e fine dei servizi.' }
          ]
        }
      },
    },

    // NEW: Sahara Explora circuit (3 days / 2 nights)
    {
      title: 'Sahara Explora: 3 days / 2 nights',
      slug: 'sahara-explora-3d-2n',
      type: 'circuit',
      duration: '3 days',
      cities: ['Tunis','Hammamet','Sousse','Monastir','Kairouan','Tozeur','Nefta','Chebika','Tamerza','Ong Jmel','Douz','Matmata','El Jem'],
      fromPrice: null,
      languages: ['en','fr','es','it'],
      highlights: [
        'Kairouan Great Mosque',
        'Aghlabid Basins & Sidi Saheb',
        'Chebika & Tamerza mountain oases',
        'Ong Jmel (Star Wars set)',
        'Nefta palm grove',
        'Chott el Jerid salt lake',
        'Douz Sahara dunes (camel/quad)',
        'Matmata troglodyte houses',
        'El Jem Roman amphitheatre'
      ],
      itinerary: 'Departure from Tunis / Hammamet / Sousse / Monastir. A 3‑day journey through Kairouan’s Islamic heritage, Atlas oases and Star Wars set by 4x4, Nefta palm grove, Douz dunes (camel/quad), Berber Matmata and the El Jem amphitheatre.',
      details: 'Includes licensed guide, tourist transport and meals (breakfast, lunch, dinner). Entrance fees included. Optional extras: 4x4 desert loop, camel ride, quad, drinks.',
      includes: [
        '2 nights in 4* accommodation (or desert camp on request)',
        'Licensed professional guide',
        'Comfortable tourist transport with driver',
        'Breakfast, lunch and dinner throughout the tour',
        'Entrance fees to monuments and sites'
      ],
      excludes: ['4x4 desert excursion','Camel ride','Quad tour','Drinks'],
      packageDays: [
        { day: 1, title: 'Departure • Kairouan • Tozeur', description: 'Visit Kairouan: Aghlabid Basins, Sidi Saheb (Barber’s Mausoleum) and the Great Mosque. Lunch en route. Nefta palm grove carriage ride and old town. Arrival in Tozeur; dinner and overnight (4*).', image: 'kairouan.jpg' },
        { day: 2, title: 'Chebika • Ong Jmel • Douz', description: '4x4 to Atlas mountain oases (Chebika, Tamerza), cross the desert to Ong Jmel (Star Wars set). Lunch under the palms. Traverse Chott el Jerid to Douz. Optional sunset camel ride or quad. Dinner and overnight (4* / Bedouin tents in season).', image: 'photo102.jpg' },
        { day: 3, title: 'Douz • Matmata • El Jem • Return', description: 'Discover Berber troglodyte houses in Matmata; lunch en route; visit El Jem amphitheatre; return to departure city.', image: 'photo138.jpg' }
      ],
      images: ['photo17.jpg'],
      availability: 'All year',
      rating: 5,
      i18n: {
        en: {
          title: 'Sahara Explora: 3 days / 2 nights',
          highlights: [
            'Kairouan Great Mosque',
            'Aghlabid Basins & Sidi Saheb',
            'Chebika & Tamerza mountain oases',
            'Ong Jmel (Star Wars set)',
            'Nefta palm grove',
            'Chott el Jerid salt lake',
            'Douz Sahara dunes (camel/quad)',
            'Matmata troglodyte houses',
            'El Jem Roman amphitheatre'
          ],
          itinerary: 'Departure from Tunis / Hammamet / Sousse / Monastir. 3-day journey through Kairouan’s Islamic heritage, Atlas oases by 4x4 and the Star Wars set at Ong Jmel, Nefta palm grove, Douz dunes (camel/quad), Berber Matmata and the Roman amphitheatre of El Jem.',
          details: 'Includes licensed guide, tourist transport and meals (breakfast, lunch, dinner). Entrance fees included. Optional extras: 4x4 desert loop, camel ride, quad, drinks.',
          packageDays: [
            { day: 1, title: 'Departure • Kairouan • Tozeur', description: 'Visit Kairouan: Aghlabid Basins, Sidi Saheb (Barber’s Mausoleum) and the Great Mosque. Lunch en route. Nefta palm grove carriage ride and old town. Arrival in Tozeur; dinner and overnight (4*).' },
            { day: 2, title: 'Chebika • Ong Jmel • Douz', description: '4x4 to Atlas mountain oases (Chebika, Tamerza), cross the desert to Ong Jmel (Star Wars set). Lunch under the palms. Traverse Chott el Jerid to Douz. Optional sunset camel ride or quad. Dinner and overnight (4* / Bedouin tents in season).' },
            { day: 3, title: 'Douz • Matmata • El Jem • Return', description: 'Discover Berber troglodyte houses in Matmata; lunch en route; visit El Jem amphitheatre; return to departure city.' }
          ]
        },
        fr: {
          title: 'Sahara Explora : 3 jours et 2 nuitées',
          highlights: [
            'Grande Mosquée de Kairouan',
            'Bassins aghlabides et Sidi Saheb',
            'Oasis de montagne Chebika & Tamerza',
            'Ong Jmel (décor de Star Wars)',
            'Palmeraie de Nefta',
            'Chott el Jerid (lac salé)',
            'Dunes du Sahara à Douz (dromadaire/quad)',
            'Maisons troglodytes de Matmata',
            'Amphithéâtre romain d\'El Jem'
          ],
          itinerary: 'Départ de Tunis / Hammamet / Sousse / Monastir. Circuit de 3 jours à travers le patrimoine islamique de Kairouan, les oasis de l’Atlas en 4x4 et le décor de Star Wars à Ong Jmel, la palmeraie de Nefta, les dunes de Douz (dromadaire/quad), Matmata berbère et l’amphithéâtre romain d’El Jem.',
          details: 'Comprend guide agréé, transport touristique et repas (petit‑déjeuner, déjeuner, dîner). Billets d’entrée inclus. En options : boucle 4x4 dans le désert, balade à dos de dromadaire, quad, boissons.',
          packageDays: [
            { day: 1, title: 'Départ • Kairouan • Tozeur', description: 'Visite de Kairouan : bassins aghlabides, mausolée du Barbier (Sidi Saheb) et Grande Mosquée. Déjeuner en route. Balade en calèche dans la palmeraie de Nefta et découverte de la vieille ville. Arrivée à Tozeur ; dîner et nuit (4*).' },
            { day: 2, title: 'Chebika • Ong Jmel • Douz', description: '4x4 vers les oasis de montagne (Chebika, Tamerza), traversée du désert jusqu’à Ong Jmel (décor de Star Wars). Déjeuner sous les palmiers. Traversée du Chott el Jerid vers Douz. En option, coucher de soleil à dos de dromadaire ou en quad. Dîner et nuit (4* / tentes bédouines en saison).' },
            { day: 3, title: 'Douz • Matmata • El Jem • Retour', description: 'Découverte des maisons troglodytes berbères de Matmata ; déjeuner en route ; visite de l’amphithéâtre d’El Jem ; retour à la ville de départ.' }
          ]
        },
        es: {
          title: 'Sahara Explora: 3 días y 2 noches',
          highlights: [
            'Gran Mezquita de Kairuán',
            'Estanques aglabíes y Sidi Saheb',
            'Oasis de montaña Chebika y Tamerza',
            'Ong Jmel (escenario de Star Wars)',
            'Palmeral de Nefta',
            'Lago salado Chott el Jerid',
            'Dunas del Sahara en Douz (camello/quad)',
            'Casas trogloditas de Matmata',
            'Anfiteatro romano de El Djem'
          ],
          itinerary: 'Salida desde Túnez / Hammamet / Susa / Monastir. Recorrido de 3 días por el patrimonio islámico de Kairuán, oasis del Atlas en 4x4 y el set de Star Wars en Ong Jmel, palmeral de Nefta, dunas de Douz (camello/quad), Matmata bereber y el anfiteatro romano de El Djem.',
          details: 'Incluye guía titulado, transporte turístico y comidas (desayuno, almuerzo, cena). Entradas incluidas. Extras opcionales: recorrido 4x4 por el desierto, paseo en camello, quad, bebidas.',
          packageDays: [
            { day: 1, title: 'Salida • Kairuán • Tozeur', description: 'Visita de Kairuán: estanques aglabíes, mausoleo del Barbero (Sidi Saheb) y Gran Mezquita. Almuerzo en ruta. Paseo en carruaje por el palmeral de Nefta y casco antiguo. Llegada a Tozeur; cena y noche (4*).' },
            { day: 2, title: 'Chebika • Ong Jmel • Douz', description: '4x4 a las oasis de montaña (Chebika, Tamerza), cruce del desierto hasta Ong Jmel (escenario de Star Wars). Almuerzo bajo las palmeras. Cruce del Chott el Jerid hacia Douz. Opcional, atardecer en camello o en quad. Cena y noche (4* / tiendas beduinas en temporada).' },
            { day: 3, title: 'Douz • Matmata • El Djem • Regreso', description: 'Descubre las casas trogloditas bereberes de Matmata; almuerzo en ruta; visita del anfiteatro de El Djem; regreso a la ciudad de salida.' }
          ]
        },
        it: {
          title: 'Sahara Explora: 3 giorni e 2 notti',
          highlights: [
            'Grande Moschea di Kairouan',
            'Bacini aghlabidi e Sidi Saheb',
            'Oasi di montagna Chebika e Tamerza',
            'Ong Jmel (set di Star Wars)',
            'Palmeto di Nefta',
            'Lago salato Chott el Jerid',
            'Dune del Sahara a Douz (cammello/quad)',
            'Case troglodite di Matmata',
            'Anfiteatro romano di El Jem'
          ],
          itinerary: 'Partenza da Tunisi / Hammamet / Sousse / Monastir. Tour di 3 giorni tra il patrimonio islamico di Kairouan, le oasi dell’Atlante in 4x4 e il set di Star Wars a Ong Jmel, il palmeto di Nefta, le dune di Douz (cammello/quad), la Matmata berbera e l’anfiteatro romano di El Jem.',
          details: 'Include guida abilitata, trasporto turistico e pasti (colazione, pranzo, cena). Ingressi inclusi. Extra opzionali: giro 4x4 nel deserto, cammellata, quad, bevande.',
          packageDays: [
            { day: 1, title: 'Partenza • Kairouan • Tozeur', description: 'Visita di Kairouan: bacini aghlabidi, mausoleo del Barbiere (Sidi Saheb) e Grande Moschea. Pranzo lungo il percorso. Giro in carrozza nel palmeto di Nefta e centro storico. Arrivo a Tozeur; cena e pernottamento (4*).' },
            { day: 2, title: 'Chebika • Ong Jmel • Douz', description: '4x4 verso le oasi di montagna (Chebika, Tamerza), attraversamento del deserto fino a Ong Jmel (set di Star Wars). Pranzo sotto le palme. Attraversamento dello Chott el Jerid verso Douz. Opzionale, tramonto in dromedario o in quad. Cena e pernottamento (4* / tende beduine in stagione).' },
            { day: 3, title: 'Douz • Matmata • El Jem • Rientro', description: 'Scoperta delle case troglodite berbere di Matmata; pranzo lungo il percorso; visita dell’anfiteatro di El Jem; rientro nella città di partenza.' }
          ]
        }
      }
    },
    {
      title: 'A trip through the history of the Medina of Sousse (3h)',
      slug: 'medina-of-sousse-history',
      type: 'day-tour',
      duration: '3 hours',
      cities: ['Sousse'],
      languages: ['en','fr','it','es'],
      highlights: ['Kasbah','Archaeological Museum','Souks','Ribat'],
      itinerary: 'Walking tour; meeting point coordinated at medina entrance.',
      details: 'Price 30 EUR per person. No transport included. Entrance fees not included.',
      includes: [],
      excludes: ['Entrance fees','Transport'],
      images: ['sousse.jpg'],
      availability: 'Daily',
      i18n: {
        en: {
          title: 'Medina of Sousse (3h)',
          highlights: ['Kasbah','Archaeological Museum','Souks','Ribat'],
          itinerary: 'Walking tour; meeting point coordinated at medina entrance.'
        },
        fr: {
          title: 'Médina de Sousse (3 h)',
          highlights: ['Kasbah','Musée archéologique','Souks','Ribat'],
          itinerary: 'Visite à pied ; point de rendez-vous coordonné à l’entrée de la médina.'
        },
        es: {
          title: 'Medina de Susa (3 h)',
          highlights: ['Alcazaba','Museo Arqueológico','Zocos','Ribat'],
          itinerary: 'Visita a pie; punto de encuentro coordinado en la entrada de la medina.'
        },
        it: {
          title: 'Medina di Sousse (3 h)',
          highlights: ['Kasbah','Museo Archeologico','Souk','Ribat'],
          itinerary: 'Tour a piedi; punto d’incontro concordato all’ingresso della medina.'
        }
      }
    },
    {
      title: 'Journée Tunis / Carthage / Sidi Bou Said (8h)',
      slug: 'journee-tunis-carthage-sidi-bou-said',
      type: 'day-tour',
      duration: '8 hours',
      cities: ['Tunis','Carthage','Sidi Bou Saïd'],
      languages: ['en','fr','it','es'],
      highlights: ['Carthage ruins','Antonine Baths','Sidi Bou Saïd','Tunis medina'],
      itinerary: 'Transport 2–6 pax, lunch and entrance fees not included.',
      includes: [],
      excludes: ['Lunch and drinks','Entrance fees'],
      images: ['photo134.jpg'],
      availability: 'Daily',
      i18n: {
        en: {
          title: 'Tunis / Carthage / Sidi Bou Saïd Day (8h)',
          highlights: ['Carthage ruins','Antonine Baths','Sidi Bou Saïd','Tunis medina'],
          itinerary: 'Transport 2–6 pax, lunch and entrance fees not included.'
        },
        fr: {
          title: 'Journée Tunis / Carthage / Sidi Bou Saïd (8 h)',
          highlights: ['Ruines de Carthage','Thermes d’Antonin','Sidi Bou Saïd','Médina de Tunis'],
          itinerary: 'Transport 2–6 pax, déjeuner et billets d’entrée non inclus.'
        },
        es: {
          title: 'Día Túnez / Cartago / Sidi Bou Saïd (8 h)',
          highlights: ['Ruinas de Cartago','Termas de Antonino','Sidi Bou Saïd','Medina de Túnez'],
          itinerary: 'Transporte 2–6 pax, almuerzo y entradas no incluidos.'
        },
        it: {
          title: 'Giornata Tunisi / Cartagine / Sidi Bou Saïd (8 h)',
          highlights: ['Rovine di Cartagine','Terme di Antonino','Sidi Bou Saïd','Medina di Tunisi'],
          itinerary: 'Trasporto 2–6 pax, pranzo e ingressi non inclusi.'
        }
      }
    },
    {
      title: 'Demi-journée Kairouan (5h)',
      slug: 'demi-journee-kairouan',
      type: 'day-tour',
      duration: '5 hours',
      cities: ['Kairouan'],
      languages: ['en','fr','it','es'],
      highlights: ['Aghlabid basins','Great Mosque','Sidi Saheb mausoleum'],
      excludes: ['Entrance fees'],
      images: ['mosque.jpg'],
      availability: 'Daily',
      i18n: {
        en: {
          title: 'Kairouan Half-Day (5h)',
          highlights: ['Aghlabid basins','Great Mosque','Sidi Saheb mausoleum']
        },
        fr: {
          title: 'Demi-journée Kairouan (5 h)',
          highlights: ['Bassins aghlabides','Grande Mosquée','Mausolée de Sidi Saheb']
        },
        es: {
          title: 'Medio día Kairuán (5 h)',
          highlights: ['Estanques aglabíes','Gran Mezquita','Mausoleo de Sidi Saheb']
        },
        it: {
          title: 'Mezza giornata Kairouan (5 h)',
          highlights: ['Bacini Aghlabidi','Grande Moschea','Mausoleo di Sidi Saheb']
        }
      }
    },
    {
      title: 'Demi-journée El Jem (5h)',
      slug: 'demi-journee-eljem',
      type: 'day-tour',
      duration: '5 hours',
      cities: ['El Jem'],
      languages: ['en','fr','it','es'],
      highlights: ['Roman Amphitheatre','Museum and villa ruins'],
      excludes: ['Entrance fees'],
      images: ['photo138.jpg'],
      availability: 'Daily',
      i18n: {
        en: {
          title: 'El Jem Half-Day (5h)',
          highlights: ['Roman Amphitheatre','Museum and villa ruins']
        },
        fr: {
          title: 'Demi-journée El Jem (5 h)',
          highlights: ['Amphithéâtre romain','Musée et ruines de la villa']
        },
        es: {
          title: 'Medio día El Jem (5 h)',
          highlights: ['Anfiteatro romano','Museo y ruinas de villa']
        },
        it: {
          title: 'Mezza giornata El Jem (5 h)',
          highlights: ['Anfiteatro romano','Museo e rovine della villa']
        }
      }
    },
    // NEW: Cultural Tunisia Circuit (8 days)
    {
      title: 'Cultural Tunisia Circuit (8 days)',
      slug: 'cultural-tunisia-circuit',
      type: 'circuit',
      duration: '8 days',
      cities: ['Tunis','Carthage','Sidi Bou Saïd','Hammamet','Kairouan','Sbeitla','Tozeur','Chebika','Tamerza','Ong Jmel','Chott el Jerid','Douz','Matmata','El Jem','Sousse','Monastir','Hammamet'],
      fromPrice: null,
      languages: ['en','fr','es','it'],
      highlights: [
        'Bardo Museum',
        'Tunis Medina & souks',
        'Carthage & Antonine Baths',
        'Sidi Bou Saïd',
        'Kairouan Great Mosque & Aghlabid Basins',
        'Sbeitla Roman ruins',
        'Tozeur old town',
        'Chebika & Tamerza mountain oases (4x4 optional)',
        'Ong Jmel (Star Wars set)',
        'Chott el Jerid salt lake',
        'Douz Sahara dunes',
        'Matmata troglodyte houses',
        'El Jem Roman amphitheatre',
        'Sousse Archaeology Museum',
        'Monastir Bourguiba Mausoleum'
      ],
      itinerary: 'Eight-day cultural tour: Tunis, Bardo Museum, Carthage and Sidi Bou Saïd; Kairouan and Sbeitla; Tozeur and Atlas oases by optional 4x4; Chott el Jerid to Douz; Berber Matmata; El Jem, Sousse and Monastir; return via Hammamet.',
      details: 'Selected hotels (or similar): Tunis 4*, Hammamet 5*, Tozeur 4* (2 nights), Douz 4*, Sousse 5*, Hammamet 5*. Meals as per program. Optional excursions: camel ride, 4x4 to Chebika/Tamerza/Ong Jmel, quad. Local hotel taxes may apply (~12 TND p.p.p.n.).',
      includes: [
        'Airport transfers in/out with comfortable tourist vehicle',
        'Assistance upon arrival and departure',
        'Accommodation in 4* and 5* hotels as per program',
        '7 breakfasts, 6 lunches, 6 dinners (one festive dinner without drinks when applicable)',
        'Professional Spanish-speaking guide (or multilingual on request)',
        'Entrance fees to listed monuments and sites (Bardo, Kairouan, Carthage, Sbeitla, El Jem, Sousse Museum)'
      ],
      excludes: [
        'Drinks',
        'Gratuities',
        'Local hotel city taxes (payable on site)'
      ],
      packageDays: [
        { day: 1, title: 'Arrival • Tunis (Hotel 4*)', description: 'Arrival at Tunis airport. Assistance and transfer to the hotel in Tunis (4*). Dinner and overnight. Note: dinner service depends on arrival time (before 21:00) otherwise cold dinner.', image: 'tuniss.jpg' },
        { day: 2, title: 'Bardo • Tunis Medina • Carthage • Sidi Bou Saïd • Hammamet (5*)', description: 'Breakfast. Visit the National Bardo Museum (world-class mosaics). Explore Tunis medina and souks. Lunch. Afternoon, visit Carthage (Punics ports and Antonine Baths) and stroll the blue-and-white village of Sidi Bou Saïd. Dinner and overnight in Hammamet (5*).', image: 'sidi.jpg' },
        { day: 3, title: 'Hammamet • Kairouan • Sbeitla • Tozeur (Full Board)', description: 'Breakfast. Drive to Kairouan: Great Mosque of Okba, Barber’s Mausoleum, Aghlabid Basins, medina and a carpet cooperative. Continue to Sbeitla; lunch and visit the Roman ruins. Proceed to Tozeur. Check-in at 4*. Dinner and overnight.', image: 'aghaleb.webp' },
        { day: 4, title: 'Tozeur (Full Board)', description: 'Breakfast. Old town of Tozeur and free time in popular markets. Lunch. Afternoon optional 4x4 excursion to mountain oases Chebika and Tamerza with an option to visit the Star Wars set at Ong Jmel. Dinner and overnight.', image: 'photo113.jpg' },
        { day: 5, title: 'Tozeur • Chott el Jerid • Douz (Full Board)', description: 'Breakfast. Cross the Chott el Jerid salt lake to Douz, the gateway to the Sahara. Stop for photos and mirages. Visit Douz market square. Lunch at a 4*. Afternoon walk to the dunes; optional camel ride or quad at sunset. Dinner and overnight.', image: 'photo116.jpg' },
        { day: 6, title: 'Douz • Matmata • El Jem • Sousse (Full Board)', description: 'Breakfast. Head to Matmata to visit Berber troglodyte houses (Star Wars exteriors). Continue to El Jem; lunch then visit the best-preserved Roman amphitheatre. Drive to Sousse. Check-in at 5*. Festive dinner (no drinks) and overnight.', image: 'photo2.jpg' },
        { day: 7, title: 'Sousse • Monastir • Hammamet', description: 'Breakfast. Visit the Sousse Archaeology Museum. Continue to Monastir and the Habib Bourguiba Mausoleum. Lunch then drive to Hammamet. Check-in at 5*. Dinner and overnight.', image: 'kasbah.jpeg' },
        { day: 8, title: 'Hammamet • Tunis Airport • Departure', description: 'Breakfast. According to flight time, transfer to Tunis airport for departure.', image: 'photo6.jpg' }
      ],
      images: ['photo146.jpg'],
      availability: 'All year',
      rating: 5,
      i18n: {
        en: {
          title: 'Cultural Tunisia Circuit (8 days)',
          highlights: [
            'Bardo Museum','Tunis Medina & souks','Carthage & Antonine Baths','Sidi Bou Saïd','Kairouan Great Mosque & Aghlabid Basins','Sbeitla Roman ruins','Tozeur old town','Chebika & Tamerza mountain oases (4x4 optional)','Ong Jmel (Star Wars set)','Chott el Jerid salt lake','Douz Sahara dunes','Matmata troglodyte houses','El Jem Roman amphitheatre','Sousse Archaeology Museum','Monastir Bourguiba Mausoleum'
          ],
          itinerary: 'Eight-day cultural tour across Tunis, Carthage, Sidi Bou Saïd, Kairouan, Sbeitla, Tozeur, Atlas oases, Chott el Jerid, Douz, Matmata, El Jem, Sousse and Monastir.',
          details: 'Hotels 4*/5* as per program. Meals included as stated. Optional: camel ride, 4x4 Chebika/Tamerza/Ong Jmel, quad. Local city taxes payable on site.',
          packageDays: [
            { day: 1, title: 'Arrival • Tunis (Hotel 4*)', description: 'Arrival, assistance and transfer. Dinner depending on arrival time.' },
            { day: 2, title: 'Bardo • Tunis • Carthage • Sidi Bou Saïd • Hammamet', description: 'Museum, medina, Carthage, Sidi Bou Saïd; dinner in Hammamet (5*).' },
            { day: 3, title: 'Hammamet • Kairouan • Sbeitla • Tozeur', description: 'Holy Kairouan, Sbeitla ruins; to Tozeur (4*).' },
            { day: 4, title: 'Tozeur', description: 'Old town; optional 4x4 Chebika/Tamerza & Ong Jmel.' },
            { day: 5, title: 'Tozeur • Chott el Jerid • Douz', description: 'Cross salt lake; Douz market; optional camel/quad at dunes.' },
            { day: 6, title: 'Douz • Matmata • El Jem • Sousse', description: 'Troglodytes; El Jem amphitheatre; Sousse (5*).' },
            { day: 7, title: 'Sousse • Monastir • Hammamet', description: 'Sousse Museum; Bourguiba Mausoleum; Hammamet (5*).' },
            { day: 8, title: 'Hammamet • Airport', description: 'Transfer to Tunis airport.' }
          ]
        },
        fr: {
          title: 'Circuit Culturel de Tunisie (8 jours)',
          highlights: [
            'Musée du Bardo','Médina de Tunis et souks','Carthage & Thermes d’Antonin','Sidi Bou Saïd','Grande Mosquée de Kairouan & bassins aghlabides','Ruines romaines de Sbéïtla','Vieille ville de Tozeur','Oasis de montagne Chebika & Tamerza (4x4 en option)','Ong Jmel (décor Star Wars)','Chott el Jerid (lac salé)','Dunes du Sahara à Douz','Maisons troglodytes de Matmata','Amphithéâtre d’El Jem','Musée archéologique de Sousse','Mausolée Habib Bourguiba à Monastir'
          ],
          itinerary: 'Huit jours culturels à travers Tunis, Carthage, Sidi Bou Saïd, Kairouan, Sbéïtla, Tozeur, oasis de l’Atlas, Chott el Jerid, Douz, Matmata, El Jem, Sousse et Monastir.',
          details: 'Hôtels 4*/5* selon programme. Repas selon itinéraire. En option : dromadaire, 4x4 Chebika/Tamerza/Ong Jmel, quad. Taxes de séjour à régler sur place.',
          packageDays: [
            { day: 1, title: 'Arrivée • Tunis (Hôtel 4*)', description: 'Arrivée, assistance et transfert. Dîner selon heure d’arrivée.' },
            { day: 2, title: 'Bardo • Tunis • Carthage • Sidi Bou Saïd • Hammamet', description: 'Musée, médina, Carthage, Sidi Bou Saïd ; dîner à Hammamet (5*).' },
            { day: 3, title: 'Hammamet • Kairouan • Sbéïtla • Tozeur', description: 'Kairouan sainte, ruines de Sbéïtla ; Tozeur (4*).' },
            { day: 4, title: 'Tozeur', description: 'Vieille ville ; 4x4 optionnel vers Chebika/Tamerza & Ong Jmel.' },
            { day: 5, title: 'Tozeur • Chott el Jerid • Douz', description: 'Traversée du lac salé ; marché de Douz ; dromadaire/quad en option.' },
            { day: 6, title: 'Douz • Matmata • El Jem • Sousse', description: 'Troglodytes ; amphithéâtre d’El Jem ; Sousse (5*).' },
            { day: 7, title: 'Sousse • Monastir • Hammamet', description: 'Musée de Sousse ; Mausolée Bourguiba ; Hammamet (5*).' },
            { day: 8, title: 'Hammamet • Aéroport', description: 'Transfert à l’aéroport de Tunis.' }
          ]
        },
        es: {
          title: 'Circuito Túnez Cultural (8 días)',
          highlights: [
            'Museo del Bardo','Medina de Túnez y zocos','Cartago y Termas de Antonino','Sidi Bou Saïd','Gran Mezquita de Kairuán y estanques aglabíes','Ruinas romanas de Sbeitla','Casco antiguo de Tozeur','Oasis de montaña Chebika y Tamerza (4x4 opcional)','Ong Jmel (escenario de Star Wars)','Lago salado Chott el Jerid','Dunas del Sahara en Douz','Casas trogloditas de Matmata','Anfiteatro romano de El Djem','Museo Arqueológico de Susa','Mausoleo Habib Bourguiba en Monastir'
          ],
          itinerary: 'Ocho días culturales por Túnez: capital, Cartago, Sidi Bou Saïd, Kairuán, Sbeitla, Tozeur, oasis del Atlas, Chott el Jerid, Douz, Matmata, El Djem, Susa y Monastir.',
          details: 'Hoteles 4*/5* según programa. Comidas incluidas según itinerario. Opcionales: dromedario, 4x4 Chebika/Tamerza/Ong Jmel, quad. Tasas locales a pagar en destino.',
          packageDays: [
            { day: 1, title: 'Llegada • Túnez (Hotel 4*)', description: 'Llegada, asistencia y traslado. Cena sujeta a la hora de llegada.' },
            { day: 2, title: 'Bardo • Medina de Túnez • Cartago • Sidi Bou Saïd • Hammamet', description: 'Museo, medina, Cartago, Sidi Bou Saïd; cena en Hammamet (5*).' },
            { day: 3, title: 'Hammamet • Kairouan • Sbeitla • Tozeur', description: 'Santa Kairuán, ruinas de Sbeitla; llegada a Tozeur (4*).' },
            { day: 4, title: 'Tozeur', description: 'Casco antiguo; excursión 4x4 opcional a Chebika/Tamerza y Ong Jmel.' },
            { day: 5, title: 'Tozeur • Chott el Jerid • Douz', description: 'Cruce del lago salado; mercado de Douz; opcional dromedario/quad.' },
            { day: 6, title: 'Douz • Matmata • El Djem • Susa', description: 'Trogloditas; anfiteatro de El Djem; Susa (5*).' },
            { day: 7, title: 'Susa • Monastir • Hammamet', description: 'Museo de Susa; Mausoleo de Bourguiba; Hammamet (5*).' },
            { day: 8, title: 'Hammamet • Aeropuerto', description: 'Traslado al aeropuerto de Túnez.' }
          ]
        },
        it: {
          title: 'Circuito Culturale della Tunisia (8 giorni)',
          highlights: [
            'Museo del Bardo','Medina di Tunisi e souk','Cartagine e Terme di Antonino','Sidi Bou Saïd','Grande Moschea di Kairouan e bacini aghlabidi','Rovine romane di Sbeitla','Città vecchia di Tozeur','Oasi di montagna Chebika e Tamerza (4x4 opzionale)','Ong Jmel (set di Star Wars)','Lago salato Chott el Jerid','Dune del Sahara a Douz','Case troglodite di Matmata','Anfiteatro romano di El Jem','Museo Archeologico di Sousse','Mausoléo Habib Bourguiba a Monastir'
          ],
          itinerary: 'Otto giorni culturali tra Tunisi, Cartagine, Sidi Bou Saïd, Kairouan, Sbeitla, Tozeur, oasi dell’Atlante, Chott el Jerid, Douz, Matmata, El Jem, Sousse e Monastir.',
          details: 'Hotel 4*/5* come da programma. Pasti inclusi come da programma. Extra opzionali: cammello, 4x4 Chebika/Tamerza/Ong Jmel, quad. Tasse di soggiorno in loco.',
          packageDays: [
            { day: 1, title: 'Arrivo • Tunisi (Hotel 4*)', description: 'Arrivo, assistenza e trasferimento. Cena secondo l’orario di arrivo.' },
            { day: 2, title: 'Bardo • Medina di Tunisi • Cartagine • Sidi Bou Saïd • Hammamet', description: 'Museo, medina, Cartagine, Sidi Bou Saïd; cena a Hammamet (5*).' },
            { day: 3, title: 'Hammamet • Kairouan • Sbeitla • Tozeur', description: 'Santa Kairuán, rovine di Sbeitla; arrivo a Tozeur (4*).' },
            { day: 4, title: 'Tozeur', description: 'Città vecchia; escursione 4x4 opzionale a Chebika/Tamerza & Ong Jmel.' },
            { day: 5, title: 'Tozeur • Chott el Jerid • Douz', description: 'Attraversamento del lago salato; mercato di Douz; cammello/quad opzionali.' },
            { day: 6, title: 'Douz • Matmata • El Jem • Sousse', description: 'Troglodite; anfiteatro di El Jem; Sousse (5*).' },
            { day: 7, title: 'Sousse • Monastir • Hammamet', description: 'Museo di Sousse; Mausoleo Bourguiba; Hammamet (5*).' },
            { day: 8, title: 'Hammamet • Aeroporto', description: 'Trasferimento all’aeroporto di Tunisi.' }
          ]
        }
      }
    },
    // NEW: Grand Tour of Tunisian Oases for New Year (8 days / 7 nights)
    {
      title: 'GRAN TOUR DELLE OASI TUNISINE A CAPODANNO (8 giorni / 7 notti)',
      slug: 'gran-tour-oasi-tunisine-capodanno',
      type: 'circuit',
      duration: '8 days',
      cities: ['Tunis','Hammamet','Kairouan','Tozeur','Chebika','Tamerza','Ong Jmel','Chott el Jerid','Douz','Matmata','Djerba','El Jem','Sousse','Monastir','Sidi Bou Saïd','Carthage','Gammarth'],
      fromPrice: null,
      languages: ['en','fr','es','it'],
      highlights: [
        'Tunis & Hammamet',
        'Kairouan Great Mosque & Barber’s Mausoleum',
        'Chebika & Tamerza mountain oases (4x4)',
        'Ong Jmel (Star Wars set)',
        'Chott el Jerid salt lake',
        'Douz Sahara dunes',
        'Matmata troglodyte houses',
        'Djerba: Houmt Souk & Ghriba Synagogue',
        'El Jem Roman amphitheatre',
        'Sousse medina',
        'Monastir Ribat & Bourguiba Mausoleum',
        'Carthage & Sidi Bou Saïd',
        'Gammarth'
      ],
      itinerary: 'Eight-day New Year oases circuit: Tunis, Hammamet, Kairouan, Tozeur and Atlas oases by 4x4 (Chebika, Tamerza, Ong Jmel), Chott el Jerid to Douz, Matmata troglodytes, Djerba (Houmt Souk & Ghriba), El Jem, Sousse, Monastir, Hammamet, Tunis, Carthage, Sidi Bou Saïd and Gammarth.',
      details: 'Hotels 4*/5* as per program. New Year’s Eve gala dinner in Djerba. Meals as per program. Optional extras: 4x4, camel, quad. Local city taxes payable on site.',
      includes: [
        'Airport transfers and comfortable tourist transport',
        'Professional licensed guide',
        'Accommodation 4*/5* as per program',
        'Breakfasts and main meals per itinerary (New Year’s Eve gala dinner included in Djerba)',
        'Entrance fees to listed monuments and sites'
      ],
      excludes: [
        'Drinks',
        'Gratuities',
        'Optional quad/camel/4x4 extras',
        'Personal expenses'
      ],
      packageDays: [
        { day: 1, title: 'Tunis • Hammamet', description: 'Arrival in Tunis, meet your local guide, lunch in a local restaurant and transfer to Hammamet. Hotel 4*, dinner and overnight.', image: 'tuniss.jpg' },
        { day: 2, title: 'Hammamet • Kairouan • Tozeur', description: 'Breakfast. Drive to Kairouan: Great Mosque and Barber’s Mausoleum. Lunch during the visit. Continue to Tozeur. Check-in at 4*, dinner and overnight.', image: 'aghaleb.webp' },
        { day: 3, title: 'Tozeur • Chebika • Tamerza • Ong Jmel • Chott el Jerid • Douz', description: '4x4 excursion to the mountain oases of Chebika and Tamerza and the Star Wars set at Ong Jmel. Lunch, then cross the Chott el Jerid salt lake to Douz. Optional quad/buggy/camel at sunset. Dinner and overnight.', image: 'photo113.jpg' },
        { day: 4, title: 'Douz • Matmata • Djerba (New Year’s Eve)', description: 'Breakfast and departure to Matmata to visit troglodyte houses. Continue to Djerba for visits to Houmt Souk and the Ghriba Synagogue. Check-in at 4*. New Year’s Eve gala dinner and overnight.', image: 'photo121.jpg' },
        { day: 5, title: 'Djerba • El Jem • Sousse', description: 'Breakfast. Continue visits in Djerba then depart to El Jem; visit the Roman amphitheatre and have lunch. Afternoon drive to Sousse. Check-in at 5*, dinner and overnight.', image: 'photo138.jpg' },
        { day: 6, title: 'Sousse • Monastir • Hammamet', description: 'Breakfast. Visit Sousse medina then continue to Monastir to visit the Ribat and Bourguiba Mausoleum. Proceed to Hammamet. Check-in at 4*, dinner and overnight.', image: 'kasbah.jpeg' },
        { day: 7, title: 'Hammamet • Tunis • Carthage • Sidi Bou Saïd • Gammarth', description: 'Breakfast. Visit Hammamet medina, then head to Tunis to see the Kasbah. Lunch in Sidi Bou Saïd with panoramic views. Afternoon visit of Carthage. Check-in at Gammarth 5*, dinner and overnight.', image: 'sidi.jpg' },
        { day: 8, title: 'Tunis • Departure', description: 'Breakfast. Transfer to Tunis airport for your flight. End of services.', image: 'photo6.jpg' }
      ],
      images: ['photo127.jpg'],
      availability: 'New Year (Capodanno) departures',
      rating: 5,
      i18n: {
        en: {
          title: 'Grand Tour of the Tunisian Oasis (8 days / 7 nights)',
          highlights: [
            'Tunis & Hammamet','Kairouan Great Mosque & Barber’s Mausoleum','Chebika & Tamerza mountain oases (4x4)','Ong Jmel (Star Wars set)','Chott el Jerid salt lake','Douz Sahara dunes','Matmata troglodyte houses','Djerba: Houmt Souk & Ghriba Synagogue','El Jem Roman amphitheatre','Sousse medina','Monastir Ribat & Bourguiba Mausoleum','Carthage & Sidi Bou Saïd','Gammarth'
          ],
          itinerary: '8-day oases journey for New Year across Tunis, Hammamet, Kairouan, Tozeur, Chebika, Tamerza, Ong Jmel, Chott el Jerid, Douz, Matmata, Djerba, El Jem, Sousse, Monastir, Carthage, Sidi Bou Saïd and Gammarth.',
          details: 'Hotels 4*/5* as per program. New Year’s Eve gala dinner in Djerba. Meals per program. Optional: 4x4, camel, quad. Local city taxes on site.',
          packageDays: [
            { day: 1, title: 'Tunis • Hammamet', description: 'Arrival in Tunis, lunch and transfer to Hammamet. Hotel 4*, dinner and overnight.' },
            { day: 2, title: 'Hammamet • Kairouan • Tozeur', description: 'Kairouan visits (Great Mosque, Barber’s). Lunch. Drive to Tozeur. Dinner and overnight.' },
            { day: 3, title: 'Tozeur • Chebika • Tamerza • Ong Jmel • Chott el Jerid • Douz', description: '4x4 to oases and Star Wars set; cross the salt lake to Douz. Optional quad/camel. Dinner and overnight.' },
            { day: 4, title: 'Douz • Matmata • Djerba (New Year’s Eve)', description: 'Matmata troglodytes, then Djerba (Houmt Souk, Ghriba). Gala dinner and overnight.' },
            { day: 5, title: 'Djerba • El Jem • Sousse', description: 'Djerba visits; El Jem amphitheatre; on to Sousse. Dinner and overnight.' },
            { day: 6, title: 'Sousse • Monastir • Hammamet', description: 'Sousse medina; Monastir Ribat & Bourguiba Mausoleum; Hammamet. Dinner and overnight.' },
            { day: 7, title: 'Hammamet • Tunis • Carthage • Sidi Bou Saïd • Gammarth', description: 'Hammamet medina; Tunis Kasbah; lunch in Sidi Bou Saïd; Carthage; Gammarth.' },
            { day: 8, title: 'Tunis • Departure', description: 'Transfer to Tunis airport.' }
          ]
        },
        fr: {
          title: 'Grand tour des oasis tunisiennes pour le Nouvel An (8 jours / 7 nuits)',
          highlights: [
            'Tunis & Hammamet','Grande Mosquée de Kairouan & Mausolée du Barbier','Oasis de montagne Chebika & Tamerza (4x4)','Ong Jmel (décor Star Wars)','Chott el Jerid (lac salé)','Dunes du Sahara à Douz','Maisons troglodytes de Matmata','Djerba : Houmt Souk & Synagogue de la Ghriba','Amphithéâtre romain d\'El Jem','Médina de Sousse','Ribat & Mausolée Bourguiba à Monastir','Carthage & Sidi Bou Saïd','Gammarth'
          ],
          itinerary: 'Circuit de 8 jours pour le Nouvel An : Tunis, Hammamet, Kairouan, Tozeur, Chebika, Tamerza, Ong Jmel, Chott el Jerid, Douz, Matmata, Djerba, El Jem, Sousse, Monastir, Carthage, Sidi Bou Saïd et Gammarth.',
          details: 'Hôtels 4*/5* selon programme. Dîner de Réveillon à Djerba. Repas selon programme. En option : 4x4, dromadaire, quad. Taxes de séjour sur place.',
          packageDays: [
            { day: 1, title: 'Tunis • Hammamet', description: 'Arrivée à Tunis, déjeuner et transfert à Hammamet. Hôtel 4*, dîner et nuit.' },
            { day: 2, title: 'Hammamet • Kairouan • Tozeur', description: 'Visites de Kairouan (Grande Mosquée, Barbier). Déjeuner. Route vers Tozeur. Dîner et nuit.' },
            { day: 3, title: 'Tozeur • Chebika • Tamerza • Ong Jmel • Chott el Jerid • Douz', description: 'Excursion 4x4 aux oasis et décor Star Wars ; traversée du lac salé vers Douz. Quad/dromadaire en option. Dîner et nuit.' },
            { day: 4, title: 'Douz • Matmata • Djerba (Réveillon)', description: 'Troglodytes de Matmata puis Djerba (Houmt Souk, Ghriba). Dîner de Réveillon et nuit.' },
            { day: 5, title: 'Djerba • El Jem • Sousse', description: 'Visites à Djerba ; amphithéâtre d’El Jem ; route vers Sousse. Dîner et nuit.' },
            { day: 6, title: 'Sousse • Monastir • Hammamet', description: 'Médina de Sousse ; Ribat & Mausolée Bourguiba ; Hammamet. Dîner et nuit.' },
            { day: 7, title: 'Hammamet • Tunis • Carthage • Sidi Bou Saïd • Gammarth', description: 'Médina d’Hammamet ; Kasbah de Tunis ; déjeuner à Sidi Bou Saïd ; Carthage ; Gammarth.' },
            { day: 8, title: 'Tunis • Départ', description: 'Transfert à l’aéroport de Tunis.' }
          ]
        },
        es: {
          title: 'Gran tour de los oasis tunecinos en Año Nuevo (8 días / 7 noches)',
          highlights: [
            'Túnez y Hammamet','Gran Mezquita de Kairuán y Mausoleo del Barbero','Oasis de montaña Chebika y Tamerza (4x4)','Ong Jmel (escenario de Star Wars)','Lago salado Chott el Jerid','Dunas del Sahara en Douz','Casas trogloditas de Matmata','Djerba: Houmt Souk y Sinagoga de la Ghriba','Anfiteatro romano de El Djem','Medina de Susa','Ribat y Mausoleo de Bourguiba en Monastir','Cartago y Sidi Bou Saïd','Gammarth'
          ],
          itinerary: 'Itinerario de 8 días por Año Nuevo: Túnez, Hammamet, Kairuán, Tozeur, Chebika, Tamerza, Ong Jmel, Chott el Jerid, Douz, Matmata, Djerba, El Djem, Susa, Monastir, Cartago, Sidi Bou Saïd y Gammarth.',
          details: 'Hoteles 4*/5* según programa. Cena de Nochevieja en Djerba. Comidas según programa. Opcionales: 4x4, dromedario, quad. Tasas locales a pagar en destino.',
          packageDays: [
            { day: 1, title: 'Túnez • Hammamet', description: 'Llegada a Túnez, almuerzo y traslado a Hammamet. Hotel 4*, cena y noche.' },
            { day: 2, title: 'Hammamet • Kairuán • Tozeur', description: 'Visitas en Kairuán (Gran Mezquita, Barbero). Almuerzo. Traslado a Tozeur. Cena y noche.' },
            { day: 3, title: 'Tozeur • Chebika • Tamerza • Ong Jmel • Chott el Jerid • Douz', description: '4x4 a las oasis y al set de Star Wars; cruce del lago salado hacia Douz. Quad/camello opcional. Cena y noche.' },
            { day: 4, title: 'Douz • Matmata • Djerba (Nochevieja)', description: 'Trogloditas de Matmata; Djerba (Houmt Souk, Ghriba). Cena de gala y noche.' },
            { day: 5, title: 'Djerba • El Djem • Susa', description: 'Visitas en Djerba; anfiteatro de El Djem; continuación a Susa. Cena y noche.' },
            { day: 6, title: 'Susa • Monastir • Hammamet', description: 'Medina de Susa; Ribat y Mausoleo de Bourguiba; Hammamet. Cena y noche.' },
            { day: 7, title: 'Hammamet • Túnez • Cartago • Sidi Bou Saïd • Gammarth', description: 'Medina de Hammamet; Kasbah de Túnez; almuerzo en Sidi Bou Saïd; Cartago; Gammarth.' },
            { day: 8, title: 'Túnez • Salida', description: 'Traslado al aeropuerto de Túnez.' }
          ]
        },
        it: {
          title: 'GRAN TOUR DELLE OASI TUNISINE A CAPODANNO (8 giorni / 7 notti)',
          highlights: [
            'Tunisi & Hammamet','Grande Moschea di Kairouan & Moschea del Barbiere','Oasi di montagna Chebika & Tamerza (4x4)','Ong Jmel (set di Star Wars)','Lago salato Chott el Jerid','Dune del Sahara a Douz','Case troglodite di Matmata','Djerba: Houmt Souk & Sinagoga Ghriba','Anfiteatro romano di El Jem','Medina di Sousse','Ribat & Mausoleo di Bourguiba a Monastir','Cartagine & Sidi Bou Saïd','Gammarth'
          ],
          itinerary: '8 giorni/7 notti tra Tunisi, Hammamet, Kairouan, Tozeur, oasi di Chebika e Tamerza, Ong Jmel, Chott el Jerid, Douz, Matmata, Djerba, El Jem, Sousse, Monastir, Cartagine, Sidi Bou Saïd e Gammarth.',
          details: 'Hotel 4*/5* come da programma. Cena di Capodanno a Djerba. Pasti come da programma. Extra opzionali: 4x4, dromedario, quad. Tasse di soggiorno in loco.',
          packageDays: [
            { day: 1, title: 'Tunisi • Hammamet', description: 'Ritrovo in aeroporto, arrivo a Tunisi, pranzo in ristorante locale e trasferimento a Hammamet. Hotel 4*, cena e pernottamento.' },
            { day: 2, title: 'Hammamet • Kairouan • Tozeur', description: 'Prima colazione. Visita di Kairouan: Grande Moschea e Moschea del Barbiere. Pranzo durante la visita. Proseguimento per Tozeur. Cena e pernottamento.' },
            { day: 3, title: 'Tozeur • Chebika • Tamerza • Ong Jmel • Chott el Jerid • Douz', description: 'Escursione in 4x4 alle oasi di montagna e al set di Star Wars a Ong Jmel. Pranzo. Attraversamento del Chott el Jerid verso Douz. Possibilità di quad/buggy/dromedario. Cena e pernottamento.' },
            { day: 4, title: 'Douz • Matmata • Djerba (Cenone)', description: 'Partenza per Matmata e visita delle case troglodite. Proseguimento per Djerba: Houmt Souk e Sinagoga Ghriba. Sistemazione in hotel 4*. Cenone di Capodanno e pernottamento.' },
            { day: 5, title: 'Djerba • El Jem • Sousse', description: 'Prima colazione. Proseguimento delle visite a Djerba e partenza per El Jem: visita dell’anfiteatro. Nel pomeriggio Sousse. Sistemazione in hotel 5*, cena e pernottamento.' },
            { day: 6, title: 'Sousse • Monastir • Hammamet', description: 'Visita della medina di Sousse; proseguimento per Monastir con il Ribat e il Mausoleo di Bourguiba. Arrivo ad Hammamet. Hotel 4*, cena e pernottamento.' },
            { day: 7, title: 'Hammamet • Tunisi • Cartagine • Sidi Bou Saïd • Gammarth', description: 'Visita della medina di Hammamet, quindi Tunisi (Kasbah). Pranzo a Sidi Bou Saïd. Nel pomeriggio Cartagine. Sistemazione a Gammarth 5*, cena e pernottamento.' },
            { day: 8, title: 'Tunisi • Roma', description: 'Trasferimento in aeroporto e partenza con volo di linea. Fine dei servizi.' }
          ]
        }
      }
    },
  ]

  for (const t of tours) {
    t.slug = t.slug || slugify(t.title)
    // Attach i18n content with English as primary and default for other languages
    if (!t.i18n) {
      t.i18n = buildI18nFromBase(t)
    }
    await Tour.findOneAndUpdate({ slug: t.slug }, t, { upsert: true })
    console.log('Upserted:', t.slug)
  }

  console.log('Seeding done.')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
