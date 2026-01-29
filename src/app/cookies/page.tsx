import Link from 'next/link'

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Cookieverklaring
      </h1>

      <div className="prose prose-slate max-w-none space-y-8">
        <p className="text-slate-600 text-lg">
          OpdrachtHub maakt gebruik van cookies om het platform goed te laten functioneren
          en om uw gebruikerservaring te verbeteren. In deze cookieverklaring leggen wij uit
          welke cookies wij gebruiken en waarom.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Wat zijn cookies?</h2>
          <p className="text-slate-600">
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer
            u een website bezoekt. Ze helpen de website om uw voorkeuren te onthouden en
            maken bepaalde functionaliteiten mogelijk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Welke cookies gebruiken wij?</h2>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Cookie</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Doel</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Noodzakelijk</span>
                  </td>
                  <td className="px-4 py-3">Houdt u ingelogd op het platform</td>
                  <td className="px-4 py-3">Sessie (tot uitloggen)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">next-auth.csrf-token</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Noodzakelijk</span>
                  </td>
                  <td className="px-4 py-3">Beschermt tegen cross-site request forgery aanvallen</td>
                  <td className="px-4 py-3">Sessie</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">next-auth.callback-url</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Noodzakelijk</span>
                  </td>
                  <td className="px-4 py-3">Onthoudt waar u naartoe wilt na inloggen</td>
                  <td className="px-4 py-3">Sessie</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">cookie-consent</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Noodzakelijk</span>
                  </td>
                  <td className="px-4 py-3">Onthoudt uw cookievoorkeuren</td>
                  <td className="px-4 py-3">1 jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Soorten cookies</h2>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Noodzakelijke cookies</h3>
              <p className="text-green-700 text-sm">
                Deze cookies zijn essentieel voor het functioneren van de website.
                Zonder deze cookies kunt u niet inloggen of gebruik maken van het platform.
                Hiervoor is geen toestemming nodig.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Functionele cookies</h3>
              <p className="text-blue-700 text-sm">
                Deze cookies onthouden uw voorkeuren, zoals taalinstellingen.
                Wij gebruiken momenteel geen functionele cookies.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Analytische cookies</h3>
              <p className="text-yellow-700 text-sm">
                Deze cookies verzamelen anonieme informatie over hoe bezoekers de website gebruiken.
                Wij gebruiken momenteel geen analytische cookies. Mocht dit in de toekomst veranderen,
                dan vragen wij eerst uw toestemming.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Marketing cookies</h3>
              <p className="text-red-700 text-sm">
                Wij gebruiken geen marketing- of trackingcookies.
                Wij volgen u niet voor advertentiedoeleinden.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookies van derden</h2>
          <p className="text-slate-600">
            Onze website maakt gebruik van diensten van derden die mogelijk cookies plaatsen:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li>
              <strong>Vercel:</strong> Onze hostingprovider kan technische cookies plaatsen
              voor prestatiemonitoring en beveiliging.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Uw voorkeuren beheren</h2>
          <p className="text-slate-600 mb-4">
            U kunt cookies beheren via uw browserinstellingen. Let op: als u alle cookies
            uitschakelt, werkt het platform mogelijk niet correct.
          </p>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Instructies per browser:</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500">Safari</a></li>
              <li><a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500">Microsoft Edge</a></li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Meer informatie</h2>
          <p className="text-slate-600">
            Voor meer informatie over hoe wij omgaan met uw gegevens, raadpleeg onze{' '}
            <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500">privacyverklaring</Link>.
          </p>
          <p className="text-slate-600 mt-4">
            Heeft u vragen? Neem contact met ons op via{' '}
            <a href="mailto:privacy@opdrachthub.nl" className="text-emerald-600 hover:text-emerald-500">privacy@opdrachthub.nl</a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          Laatste update: januari 2026
        </p>
      </div>
    </div>
  )
}
