import Link from 'next/link'

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Cookiebeleid
      </h1>

      <div className="prose prose-slate max-w-none space-y-8">
        <p className="text-slate-600 text-lg">
          OpdrachtHub gebruikt uitsluitend functionele cookies die noodzakelijk zijn
          voor het goed functioneren van het platform.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Wat zijn cookies?</h2>
          <p className="text-slate-600">
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer
            u een website bezoekt. Ze helpen de website om bepaalde functionaliteiten mogelijk
            te maken.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Welke cookies gebruiken wij?</h2>
          <p className="text-slate-600 mb-4">
            Wij gebruiken uitsluitend <strong>functionele cookies</strong> voor:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Inloggen en authenticatie</li>
            <li>Sessiebeheer</li>
            <li>Beveiliging (CSRF-bescherming)</li>
          </ul>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Cookie</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Doel</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Duur</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                  <td className="px-4 py-3">Houdt u ingelogd</td>
                  <td className="px-4 py-3">Sessie</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">next-auth.csrf-token</td>
                  <td className="px-4 py-3">Beveiligingstoken</td>
                  <td className="px-4 py-3">Sessie</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">next-auth.callback-url</td>
                  <td className="px-4 py-3">Doorverwijzing na inloggen</td>
                  <td className="px-4 py-3">Sessie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Geen tracking of advertenties</h2>
            <p className="text-green-700">
              Wij gebruiken <strong>geen</strong> tracking cookies, analytics cookies of advertentiecookies.
              Uw gedrag wordt niet gevolgd voor marketingdoeleinden.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Toestemming</h2>
          <p className="text-slate-600">
            Omdat wij uitsluitend noodzakelijke/functionele cookies gebruiken die essentieel zijn
            voor het functioneren van het platform, is voorafgaande toestemming volgens de AVG
            niet vereist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookies uitschakelen</h2>
          <p className="text-slate-600">
            U kunt cookies uitschakelen via uw browserinstellingen. Let op: als u onze
            functionele cookies blokkeert, kunt u niet inloggen op het platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Meer informatie</h2>
          <p className="text-slate-600">
            Voor meer informatie over hoe wij omgaan met uw gegevens, zie onze{' '}
            <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500">
              privacyverklaring
            </Link>.
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
