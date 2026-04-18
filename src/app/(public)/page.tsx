import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TrustpilotHomepage } from "@/components/TrustpilotWidget";

export const metadata: Metadata = {
  title: "Airco kopen inclusief montage in Nederland | EndaTech",
  description:
    "Airco kopen inclusief montage in Nederland? EndaTech plaatst binnen 1–2 weken, met vaste prijs vooraf en direct contact met uw monteur.",
  alternates: { canonical: "https://www.endatech.nl/" },
  openGraph: {
    title: "Airco kopen inclusief montage in Nederland | EndaTech",
    description:
      "EndaTech levert, plaatst en onderhoudt airco's door heel Nederland. Vaste prijs inclusief montage, snelle plaatsing en direct contact met uw monteur.",
    type: "website",
    locale: "nl_NL",
    url: "https://www.endatech.nl/",
    siteName: "EndaTech",
  },
};

const FAQ_ITEMS = [
  {
    q: "Hoe snel kan een airco geplaatst worden?",
    a: "Bij EndaTech wordt een airco meestal binnen één tot twee weken na akkoord op de offerte geplaatst. De installatie zelf duurt doorgaans één werkdag. Bij spoed, bijvoorbeeld tijdens een hittegolf, kijken we of het sneller kan.",
  },
  {
    q: "Heb ik een vergunning nodig voor een airco?",
    a: "In de meeste gevallen heeft u geen vergunning nodig voor een airco aan uw eigen woning. Bij een Vereniging van Eigenaren (VvE), monumentale panden of huurwoningen kunnen wel aanvullende regels gelden. Check dit vooraf bij uw VvE, verhuurder of gemeente.",
  },
  {
    q: "Hoeveel geluid maakt een airco?",
    a: "Moderne airco's produceren op de binnenunit circa 19 tot 30 decibel, vergelijkbaar met fluisteren. De buitenunit zit rond de 45 tot 55 decibel, vergelijkbaar met een rustig gesprek op enkele meters afstand.",
  },
  {
    q: "Hoe vaak moet een airco onderhouden worden?",
    a: "Wij adviseren jaarlijks onderhoud. Dit verlengt de levensduur van uw toestel, houdt het energieverbruik laag en voorkomt storingen. Een onderhoudsbeurt omvat reiniging van filters, controle van de buitenunit, lekcontrole en een prestatietest.",
  },
  {
    q: "Is een airco energiezuinig?",
    a: "Ja. Moderne inverter-airco's zijn zeer energiezuinig, vooral bij verwarmen: per 1 kWh stroom leveren ze gemiddeld 3 tot 5 kWh warmte. Bij koelen ligt het verbruik rond de 0,4 tot 0,8 kWh per uur voor een toestel van 3,5 kW.",
  },
  {
    q: "Kan één airco meerdere kamers koelen?",
    a: "Eén binnenunit koelt doorgaans één ruimte. Voor meerdere kamers kiest u een multi-split systeem: één buitenunit met twee tot vijf binnenunits. Elke ruimte kan dan apart worden ingesteld.",
  },
  {
    q: "Geeft EndaTech garantie op de installatie?",
    a: "Ja. EndaTech geeft 2 jaar garantie op de plaatsing, bovenop de fabrieksgarantie op het toestel. De fabrieksgarantie bedraagt afhankelijk van het merk 3 tot 5 jaar.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "EndaTech",
  url: "https://www.endatech.nl",
  email: "info@endatech.nl",
  description:
    "EndaTech levert, plaatst en onderhoudt airco's voor particulieren en bedrijven door heel Nederland. Airco kopen inclusief montage, met vaste prijs vooraf en direct contact met de monteur.",
  image: "https://www.endatech.nl/logo.png",
  priceRange: "€€",
  areaServed: { "@type": "Country", name: "Nederland" },
  address: { "@type": "PostalAddress", addressCountry: "NL" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  makesOffer: [
    { "@type": "Offer", name: "Airco kopen inclusief montage" },
    { "@type": "Offer", name: "Airco installatie" },
    { "@type": "Offer", name: "Airco onderhoud" },
    { "@type": "Offer", name: "Airco storingshulp" },
  ],
  knowsAbout: [
    "Airconditioning",
    "Split airco",
    "Multi-split airco",
    "Airco installatie",
    "Airco onderhoud",
    "Warmtepomp",
  ],
};

export default function HomePage() {
  return (
    <div>
      {/* JSON-LD structured data for SEO + GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Airco kopen inclusief montage in Nederland
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                <span className="font-semibold text-[#2563EB]">EndaTech</span> levert, plaatst en onderhoudt airco&apos;s
                voor particulieren en bedrijven. Vaste prijs vooraf, plaatsing binnen 1 à 2 weken en direct contact met uw eigen monteur.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Vaste prijs inclusief montage en BTW",
                  "Plaatsing meestal binnen 1 à 2 weken",
                  "Direct contact met uw monteur",
                  "2 jaar garantie op onze installatie",
                ].map((usp) => (
                  <li key={usp} className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#22D3EE] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{usp}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/offerte-aanvragen"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors"
                >
                  Vraag direct een offerte aan
                </Link>
                <Link
                  href="/offerte-bekijken"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-lg hover:bg-[#2563EB] hover:text-white transition-colors"
                >
                  Bekijk je offerte
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <Logo className="scale-150" />
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustpilotHomepage />
        </div>
      </section>

      {/* Intro text for SEO/GEO */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 text-lg leading-relaxed space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">EndaTech — airco&apos;s leveren, plaatsen en onderhouden</h2>
          <p>
            EndaTech is een Nederlands installatiebedrijf dat airco&apos;s verkoopt, plaatst en onderhoudt. Wij werken voor
            particulieren én voor bedrijven, van een slaapkamer van 12 m² tot een kantoorpand met meerdere ruimtes.
          </p>
          <p>
            Onze werkwijze is simpel: u krijgt vooraf een vaste totaalprijs, een concrete plaatsingsdatum en rechtstreeks
            contact met de monteur die het werk uitvoert. Geen callcenter, geen meerwerk achteraf.
          </p>
          <p>
            Een standaard installatie plannen we binnen één tot twee weken en ronden we af in één werkdag. We werken door heel Nederland.
          </p>
        </div>
      </section>

      {/* Airco kopen inclusief montage — proces */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Airco kopen inclusief montage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Van eerste aanvraag tot geïnstalleerde airco bestaat het proces uit vier stappen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                step: 1,
                title: "Aanvraag",
                desc: "U vult het offerteformulier in of belt ons. We stellen een paar gerichte vragen over uw ruimte, gewenste temperatuur en de situatie ter plaatse.",
              },
              {
                step: 2,
                title: "Offerte",
                desc: "Binnen 24 uur ontvangt u een heldere offerte. Eén totaalbedrag inclusief toestel, montage, materiaal en BTW.",
              },
              {
                step: 3,
                title: "Inplanning",
                desc: "Na akkoord kiezen we samen een installatiedatum. Meestal plaatsen we binnen één tot twee weken, afhankelijk van voorraad.",
              },
              {
                step: 4,
                title: "Plaatsing",
                desc: "De monteur plaatst de binnen- en buitenunit, legt de leidingen, vult het systeem en regelt de airco in. U krijgt uitleg over de bediening.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerte op maat — geen vaste prijzen */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Elke offerte op maat</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Wij werken niet met vaste prijzen op de website. Elke situatie is anders — de ruimte, het gewenste vermogen,
            de afstand tussen binnen- en buitenunit en eventuele extra werkzaamheden bepalen de uiteindelijke prijs.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Na uw aanvraag ontvangt u binnen 24 uur een heldere, vrijblijvende offerte. Eén totaalbedrag inclusief toestel,
            montage, materiaal en BTW — zonder meerwerk achteraf.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">De prijs hangt af van:</h3>
          <ul className="space-y-2 text-gray-700 text-left max-w-md mx-auto mb-8">
            {[
              "Het merk en vermogen van het toestel",
              "Het aantal binnenunits",
              "De afstand tussen binnen- en buitenunit",
              "De bereikbaarheid (begane grond, verdieping of plat dak)",
              "Eventuele extra werkzaamheden, zoals een elektragroep bijplaatsen",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-[#2563EB]">•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/offerte-aanvragen"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            Vraag een offerte op maat aan
          </Link>
        </div>
      </section>

      {/* Waarom EndaTech */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Waarom kiezen voor EndaTech</h2>
          </div>

          {/* F-Gassen certificering */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fgassen-cert.gif"
                alt="F-Gassen Gecertificeerd"
                className="h-14 w-auto object-contain"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm">F-Gassen Gecertificeerd</p>
                <p className="text-gray-500 text-xs mt-0.5">Gecertificeerd voor de installatie van airco&apos;s met koudemiddelen</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Snelle plaatsing",
                desc: "Meestal binnen 1 tot 2 weken geïnstalleerd. De werkzaamheden duren één werkdag.",
              },
              {
                title: "Direct contact met de monteur",
                desc: "U krijgt het telefoonnummer van dezelfde persoon die het werk uitvoert, ook na oplevering.",
              },
              {
                title: "Eerlijke prijzen",
                desc: "Eén totaalbedrag vooraf, inclusief montage en BTW. Geen meerwerk achteraf.",
              },
              {
                title: "Betrouwbare service",
                desc: "Onderhoud, nazorg en storingshulp door hetzelfde team.",
              },
              {
                title: "Kwaliteitsmerken",
                desc: "Wij werken met Mitsubishi, Daikin, LG en Gree — merken die zich in Nederland bewezen hebben.",
              },
              {
                title: "2 jaar garantie",
                desc: "Op onze plaatsing, bovenop de fabrieksgarantie van het toestel.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Veelgestelde vragen</h2>
            <p className="text-gray-600">Alles wat u wilt weten voordat u een airco laat plaatsen.</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group bg-white border border-gray-200 rounded-xl p-5 open:shadow-sm transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-semibold text-gray-900 pr-4">{item.q}</h3>
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#2563EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Offerte aanvragen of contact opnemen</h2>
          <p className="text-xl text-blue-100 mb-8">
            Vraag vrijblijvend een offerte aan via het formulier of mail naar info@endatech.nl. U krijgt binnen 24 uur
            reactie met een vaste prijs en een voorstel voor plaatsing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Offerte aanvragen
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#2563EB] transition-colors text-lg"
            >
              Contact opnemen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
