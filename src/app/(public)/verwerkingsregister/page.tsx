import Link from 'next/link'

export default function VerwerkingsregisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Verwerkingsregister
      </h1>

      <div className="prose prose-slate max-w-none space-y-8">
        <p className="text-slate-600 text-lg">
          Dit verwerkingsregister geeft een overzicht van de persoonsgegevens die OpdrachtHub
          verwerkt, conform artikel 30 van de AVG.
        </p>

        <div className="space-y-6">
          {/* Accounts */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Accounts</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Doel:</span>
                <span className="text-slate-700">Toegang tot het platform</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Grondslag:</span>
                <span className="text-slate-700">Uitvoering overeenkomst</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Gegevens:</span>
                <span className="text-slate-700">Naam, e-mail, wachtwoord (versleuteld), bedrijfsgegevens</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Bewaartermijn:</span>
                <span className="text-slate-700">Zolang account actief is</span>
              </div>
            </div>
          </div>

          {/* Matching */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Matching</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Doel:</span>
                <span className="text-slate-700">Bemiddeling tussen opdrachtgevers en ZZP'ers</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Grondslag:</span>
                <span className="text-slate-700">Uitvoering overeenkomst</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Gegevens:</span>
                <span className="text-slate-700">Opdrachten, reacties, profielgegevens, vaardigheden</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Bewaartermijn:</span>
                <span className="text-slate-700">Zolang account actief is</span>
              </div>
            </div>
          </div>

          {/* Contracten */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Contracten</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Doel:</span>
                <span className="text-slate-700">Vastlegging afspraken tussen partijen</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Grondslag:</span>
                <span className="text-slate-700">Uitvoering overeenkomst + wettelijke plicht</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Gegevens:</span>
                <span className="text-slate-700">Contractinhoud, handtekeningen, IP-adres, apparaatgegevens</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Bewaartermijn:</span>
                <span className="text-slate-700">7 jaar</span>
              </div>
            </div>
          </div>

          {/* Facturatie */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Facturatie</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Doel:</span>
                <span className="text-slate-700">Administratie en facturatie</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Grondslag:</span>
                <span className="text-slate-700">Wettelijke plicht</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Gegevens:</span>
                <span className="text-slate-700">Factuurgegevens, bedrijfsnaam, KvK-nummer</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Bewaartermijn:</span>
                <span className="text-slate-700">7 jaar (fiscale bewaarplicht)</span>
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Logs</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Doel:</span>
                <span className="text-slate-700">Beveiliging en foutopsporing</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Grondslag:</span>
                <span className="text-slate-700">Gerechtvaardigd belang</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Gegevens:</span>
                <span className="text-slate-700">IP-adressen, tijdstempels, foutmeldingen</span>
              </div>
              <div className="flex">
                <span className="text-slate-500 w-32 flex-shrink-0">Bewaartermijn:</span>
                <span className="text-slate-700">90 dagen</span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Verwerkers</h2>
          <p className="text-slate-600 mb-4">
            Wij maken gebruik van de volgende verwerkers waarmee verwerkersovereenkomsten
            zijn gesloten:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li><strong>Vercel:</strong> Hosting</li>
            <li><strong>Neon:</strong> Database</li>
            <li><strong>E-mailprovider:</strong> Transactionele e-mails</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact</h2>
          <p className="text-slate-600">
            Voor vragen over dit verwerkingsregister kunt u contact opnemen via{' '}
            <a href="mailto:privacy@opdrachthub.nl" className="text-emerald-600 hover:text-emerald-500">
              privacy@opdrachthub.nl
            </a>.
          </p>
        </section>

        <section>
          <p className="text-slate-600">
            Zie ook onze{' '}
            <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500">
              privacyverklaring
            </Link>{' '}
            en ons{' '}
            <Link href="/cookies" className="text-emerald-600 hover:text-emerald-500">
              cookiebeleid
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
