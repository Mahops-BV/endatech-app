import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";

export const metadata = {
  title: "Privacyverklaring - EndaTech",
  description: "Privacyverklaring van EndaTech. Hoe wij omgaan met uw persoonsgegevens.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacyverklaring</h1>
      <p className="text-gray-400 text-sm mb-10">Laatste update: april 2026</p>

      <div className="space-y-10 text-gray-600">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Wie wij zijn</h2>
          <p>
            EndaTech is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven
            in deze privacyverklaring.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-4 text-sm space-y-1">
            <p><strong>Bedrijfsnaam:</strong> EndaTech</p>
            <p><strong>Website:</strong> www.endatech.nl</p>
            <p><strong>E-mail:</strong> <EmailLink /></p>
            <p><strong>Telefoon:</strong> <a href="tel:+31641088447" className="text-[#2563EB] hover:underline">06-41088447</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Welke gegevens verzamelen wij?</h2>
          <p className="mb-3">Wij verwerken persoonsgegevens die u zelf aan ons verstrekt via:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Het offerteformulier (naam, e-mail, telefoon, adres, type woning)</li>
            <li>Het contactformulier (naam, e-mail, telefoon, bericht)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Het opstellen en versturen van offertes</li>
            <li>Contact opnemen over uw aanvraag of vraag</li>
            <li>Het inplannen van installaties en onderhoud</li>
            <li>Het verwerken van betalingen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Grondslag voor verwerking</h2>
          <p>
            Wij verwerken uw persoonsgegevens op basis van:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>Uitvoering van een overeenkomst</strong> — voor het verwerken van uw offerte of opdracht</li>
            <li><strong>Gerechtvaardigd belang</strong> — voor het beantwoorden van uw contactverzoek</li>
            <li><strong>Wettelijke verplichting</strong> — voor administratieve en fiscale verplichtingen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Bewaartermijn</h2>
          <p>
            Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor
            ze zijn verzameld. Offertegegevens bewaren wij maximaal 2 jaar. Factuurgegevens bewaren
            wij 7 jaar conform de wettelijke fiscale bewaarplicht.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Delen met derden</h2>
          <p>
            Wij verkopen uw gegevens niet aan derden. Wij kunnen uw gegevens delen met:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Onze databeheerder (Neon PostgreSQL — beveiligde cloudopslag, EU)</li>
            <li>Trustpilot — uitsluitend voor het uitnodigen van een recensie na afronding</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens
            te beschermen tegen verlies, misbruik of ongeautoriseerde toegang. Onze website maakt
            gebruik van HTTPS-versleuteling.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Uw rechten</h2>
          <p className="mb-2">U heeft het recht op:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Inzage in uw persoonsgegevens</li>
            <li>Correctie van onjuiste gegevens</li>
            <li>Verwijdering van uw gegevens</li>
            <li>Beperking van de verwerking</li>
            <li>Bezwaar tegen verwerking</li>
            <li>Gegevensoverdraagbaarheid</li>
          </ul>
          <p className="mt-3">
            U kunt een verzoek indienen via{" "}
            <EmailLink className="text-[#2563EB] hover:underline" />
            . Wij reageren binnen 30 dagen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Klachten</h2>
          <p>
            Heeft u een klacht over de verwerking van uw persoonsgegevens? Neem dan contact met
            ons op. U heeft ook het recht een klacht in te dienen bij de{" "}
            <a
              href="https://www.autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              Autoriteit Persoonsgegevens
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Cookies</h2>
          <p>
            Wij gebruiken uitsluitend functionele cookies. Zie ons{" "}
            <Link href="/cookies" className="text-[#2563EB] hover:underline">
              cookiebeleid
            </Link>{" "}
            voor meer informatie.
          </p>
        </section>

      </div>
    </div>
  );
}
