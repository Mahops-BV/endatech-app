'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Privacyverklaring
      </h1>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Wie wij zijn</h2>
          <p className="text-slate-600">
            OpdrachtHub is verantwoordelijk voor de verwerking van persoonsgegevens zoals
            beschreven in deze privacyverklaring.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mt-4">
            <p className="text-slate-700">
              <strong>Contact:</strong>{' '}
              <a href="mailto:privacy@opdrachthub.nl" className="text-emerald-600 hover:text-emerald-500">
                privacy@opdrachthub.nl
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Gegevens die wij verwerken</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Bedrijfsgegevens (bedrijfsnaam, KvK-nummer)</li>
            <li>Opdrachten en reacties</li>
            <li>Contractdocumenten en handtekeningen</li>
            <li>Facturen</li>
            <li>IP-adres en logs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Doeleinden</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Accountbeheer</li>
            <li>Matching tussen opdrachtgevers en ZZP'ers</li>
            <li>Contractvorming</li>
            <li>Facturatie</li>
            <li>Beveiliging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Grondslagen</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 border-b">Verwerking</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 border-b">Grondslag</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                <tr className="border-b">
                  <td className="px-4 py-3">Accountbeheer, matching, contractvorming</td>
                  <td className="px-4 py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Facturatie en administratie</td>
                  <td className="px-4 py-3">Wettelijke verplichting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Beveiliging en logging</td>
                  <td className="px-4 py-3">Gerechtvaardigd belang</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Bewaartermijnen</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li><strong>Accounts:</strong> Zolang uw account actief is</li>
            <li><strong>Contracten en facturen:</strong> 7 jaar (wettelijke bewaarplicht)</li>
            <li><strong>Logs:</strong> 90 dagen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Delen met derden</h2>
          <p className="text-slate-600">
            Wij delen uw gegevens alleen met noodzakelijke leveranciers waarmee wij
            verwerkersovereenkomsten hebben:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 mt-2">
            <li>Hosting (Vercel)</li>
            <li>Database</li>
            <li>E-mailprovider</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Uw rechten</h2>
          <p className="text-slate-600 mb-4">
            Op grond van de AVG heeft u recht op:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Inzage in uw gegevens</li>
            <li>Correctie van onjuiste gegevens</li>
            <li>Verwijdering van uw gegevens</li>
            <li>Dataportabiliteit</li>
            <li>Bezwaar tegen verwerking</li>
          </ul>
          <p className="text-slate-600 mt-4">
            Neem contact op via{' '}
            <a href="mailto:privacy@opdrachthub.nl" className="text-emerald-600 hover:text-emerald-500">
              privacy@opdrachthub.nl
            </a>{' '}
            om uw rechten uit te oefenen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Beveiliging</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>HTTPS-versleuteling</li>
            <li>Toegangscontrole</li>
            <li>Logging</li>
            <li>Minimale dataverwerking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookies</h2>
          <p className="text-slate-600">
            Lees meer over ons cookiegebruik in ons{' '}
            <Link href="/cookies" className="text-emerald-600 hover:text-emerald-500">
              cookiebeleid
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Klachten</h2>
          <p className="text-slate-600">
            Heeft u een klacht? Neem contact met ons op of dien een klacht in bij de{' '}
            <a
              href="https://autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-500"
            >
              Autoriteit Persoonsgegevens
            </a>.
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
