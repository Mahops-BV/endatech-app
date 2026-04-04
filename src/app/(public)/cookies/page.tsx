import Link from "next/link";

export const metadata = {
  title: "Cookiebeleid - EndaTech",
  description: "Informatie over het gebruik van cookies op de EndaTech website.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookiebeleid</h1>

      <div className="space-y-8 text-gray-600">
        <p className="text-lg">
          EndaTech gebruikt uitsluitend functionele cookies die noodzakelijk zijn
          voor het goed functioneren van de website.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer
            u een website bezoekt. Ze helpen de website om bepaalde functionaliteiten
            mogelijk te maken en uw voorkeuren te onthouden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Welke cookies gebruiken wij?</h2>
          <p className="mb-4">
            Wij gebruiken uitsluitend <strong className="text-gray-900">functionele cookies</strong>:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Cookie</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Doel</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Duur</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">cookie_consent</td>
                  <td className="px-4 py-3">Onthoudt uw cookievoorkeur</td>
                  <td className="px-4 py-3">1 jaar</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">admin_session</td>
                  <td className="px-4 py-3">Beheerderstoegang (alleen intern gebruik)</td>
                  <td className="px-4 py-3">7 dagen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Geen tracking of advertenties</h2>
            <p className="text-green-700">
              Wij gebruiken <strong>geen</strong> tracking cookies, analytics cookies of
              advertentiecookies. Uw gedrag wordt niet gevolgd voor marketingdoeleinden.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Toestemming</h2>
          <p>
            Omdat wij uitsluitend noodzakelijke/functionele cookies gebruiken, is voorafgaande
            toestemming volgens de AVG (GDPR) en de Telecommunicatiewet niet vereist.
            Wij informeren u er desondanks graag over via onze cookiemelding.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies uitschakelen</h2>
          <p>
            U kunt cookies uitschakelen via uw browserinstellingen. Houd er rekening mee
            dat sommige functionaliteiten dan mogelijk niet goed werken.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Meer informatie</h2>
          <p>
            Voor meer informatie over hoe wij omgaan met uw persoonsgegevens, zie onze{" "}
            <Link href="/privacy" className="text-[#2563EB] hover:underline">
              privacyverklaring
            </Link>
            . Bij vragen kunt u contact opnemen via{" "}
            <a href="mailto:info@endatech.nl" className="text-[#2563EB] hover:underline">
              info@endatech.nl
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-400">Laatste update: april 2026</p>
      </div>
    </div>
  );
}
