import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Privacyverklaring
      </h1>

      <div className="prose prose-slate max-w-none space-y-8">
        <p className="text-slate-600 text-lg">
          OpdrachtHub respecteert uw privacy en gaat zorgvuldig om met uw persoonsgegevens.
          In deze privacyverklaring leggen wij uit welke gegevens wij verzamelen, waarom wij
          dit doen en hoe wij hiermee omgaan.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Wie zijn wij?</h2>
          <p className="text-slate-600">
            OpdrachtHub is een digitaal bemiddelingsplatform dat opdrachtgevers verbindt met
            zelfstandige professionals (ZZP'ers). Wij zijn verantwoordelijk voor de verwerking
            van uw persoonsgegevens zoals beschreven in deze privacyverklaring.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mt-4">
            <p className="text-slate-700">
              <strong>OpdrachtHub</strong><br />
              E-mail: privacy@opdrachthub.nl
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Welke gegevens verzamelen wij?</h2>

          <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">Accountgegevens</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Naam en e-mailadres</li>
            <li>Wachtwoord (versleuteld opgeslagen)</li>
            <li>Bedrijfsnaam en KvK-nummer</li>
            <li>Telefoonnummer (optioneel)</li>
            <li>Type gebruiker (opdrachtgever of ZZP'er)</li>
          </ul>

          <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">Profielgegevens (ZZP'ers)</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Vaardigheden en expertise</li>
            <li>Biografie en werkervaring</li>
          </ul>

          <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">Opdrachtgegevens</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Opdrachttitels en beschrijvingen</li>
            <li>Tarieven en duur</li>
            <li>Reacties en motivaties</li>
          </ul>

          <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">Contractgegevens</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Digitale handtekeningen</li>
            <li>IP-adres bij ondertekening</li>
            <li>Apparaatgegevens bij ondertekening (browser, besturingssysteem)</li>
            <li>Locatiegegevens bij ondertekening (alleen met uw toestemming)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Waarom verzamelen wij deze gegevens?</h2>
          <p className="text-slate-600 mb-4">Wij verwerken uw gegevens voor de volgende doeleinden:</p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 border-b">Doel</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 border-b">Grondslag</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                <tr className="border-b">
                  <td className="px-4 py-3">Aanmaken en beheren van uw account</td>
                  <td className="px-4 py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Bemiddeling tussen opdrachtgevers en ZZP'ers</td>
                  <td className="px-4 py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Genereren en ondertekenen van contracten</td>
                  <td className="px-4 py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Bewijs van digitale ondertekening</td>
                  <td className="px-4 py-3">Gerechtvaardigd belang</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Facturatie bemiddelingsvergoeding</td>
                  <td className="px-4 py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Verbeteren van onze dienstverlening</td>
                  <td className="px-4 py-3">Gerechtvaardigd belang</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Hoe lang bewaren wij uw gegevens?</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Accountgegevens:</strong> Tot u uw account verwijdert, plus 30 dagen</li>
            <li><strong>Contracten en handtekeningen:</strong> 7 jaar (wettelijke bewaarplicht)</li>
            <li><strong>Opdrachten en reacties:</strong> 2 jaar na afronding</li>
            <li><strong>Facturatiegegevens:</strong> 7 jaar (fiscale bewaarplicht)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Met wie delen wij uw gegevens?</h2>
          <p className="text-slate-600 mb-4">
            Wij delen uw gegevens alleen wanneer dit noodzakelijk is:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Andere gebruikers:</strong> Uw publieke profielgegevens zijn zichtbaar voor andere gebruikers van het platform</li>
            <li><strong>Contractpartijen:</strong> Bij een match worden relevante gegevens gedeeld tussen opdrachtgever en ZZP'er</li>
            <li><strong>Hostingprovider:</strong> Vercel (VS) - met passende waarborgen</li>
            <li><strong>Databaseprovider:</strong> Neon (EU) - gegevens worden opgeslagen in de EU</li>
            <li><strong>Autoriteiten:</strong> Indien wettelijk verplicht</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Uw rechten</h2>
          <p className="text-slate-600 mb-4">
            Op grond van de AVG heeft u de volgende rechten:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Recht op inzage:</strong> U kunt opvragen welke gegevens wij van u hebben</li>
            <li><strong>Recht op rectificatie:</strong> U kunt onjuiste gegevens laten corrigeren</li>
            <li><strong>Recht op verwijdering:</strong> U kunt verzoeken uw gegevens te verwijderen</li>
            <li><strong>Recht op beperking:</strong> U kunt de verwerking laten beperken</li>
            <li><strong>Recht op overdraagbaarheid:</strong> U kunt uw gegevens ontvangen in een gangbaar formaat</li>
            <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen bepaalde verwerkingen</li>
          </ul>
          <p className="text-slate-600 mt-4">
            Neem contact met ons op via <a href="mailto:privacy@opdrachthub.nl" className="text-emerald-600 hover:text-emerald-500">privacy@opdrachthub.nl</a> om
            een van deze rechten uit te oefenen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Beveiliging</h2>
          <p className="text-slate-600">
            Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 mt-4">
            <li>SSL/TLS-versleuteling voor alle communicatie</li>
            <li>Wachtwoorden worden versleuteld opgeslagen (bcrypt)</li>
            <li>Toegang tot gegevens is beperkt tot geautoriseerde medewerkers</li>
            <li>Regelmatige beveiligingsupdates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Cookies</h2>
          <p className="text-slate-600">
            Wij gebruiken cookies voor het functioneren van het platform.
            Lees meer in onze <Link href="/cookies" className="text-emerald-600 hover:text-emerald-500">cookieverklaring</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Klachten</h2>
          <p className="text-slate-600">
            Heeft u een klacht over de verwerking van uw persoonsgegevens?
            Neem dan contact met ons op. U heeft ook het recht om een klacht in te dienen bij de
            Autoriteit Persoonsgegevens: <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500">autoriteitpersoonsgegevens.nl</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Wijzigingen</h2>
          <p className="text-slate-600">
            Wij kunnen deze privacyverklaring wijzigen. De meest recente versie is altijd
            beschikbaar op deze pagina. Bij belangrijke wijzigingen informeren wij u per e-mail.
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
