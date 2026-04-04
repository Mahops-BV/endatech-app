export const metadata = {
  title: "Algemene voorwaarden - EndaTech",
  description: "Algemene voorwaarden van EndaTech voor airco verkoop, installatie en onderhoud.",
};

export default function VoorwaardenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Algemene voorwaarden</h1>
      <p className="text-gray-400 text-sm mb-10">Laatste update: april 2026</p>

      <div className="space-y-10 text-gray-600">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Definities</h2>
          <ul className="space-y-2">
            <li><strong>EndaTech:</strong> de onderneming die airconditioning verkoopt, installeert en onderhoudt.</li>
            <li><strong>Klant:</strong> de natuurlijke persoon of rechtspersoon die een overeenkomst aangaat met EndaTech.</li>
            <li><strong>Offerte:</strong> een vrijblijvend prijsvoorstel van EndaTech aan de klant.</li>
            <li><strong>Overeenkomst:</strong> de afspraak tussen klant en EndaTech na ondertekening van de offerte.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Toepasselijkheid</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen en
            overeenkomsten van EndaTech. Afwijkingen zijn alleen geldig indien schriftelijk
            overeengekomen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Offertes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Alle offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.</li>
            <li>Een overeenkomst komt tot stand na digitale ondertekening van de offerte door de klant.</li>
            <li>Prijzen zijn inclusief BTW, tenzij anders vermeld.</li>
            <li>EndaTech behoudt zich het recht voor offerteaanvragen te weigeren.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Uitvoering</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>EndaTech voert installaties uit door gecertificeerde monteurs (F-Gassen gecertificeerd).</li>
            <li>De klant zorgt voor vrije toegang tot de locatie op het afgesproken tijdstip.</li>
            <li>EndaTech is niet aansprakelijk voor vertraging door omstandigheden buiten haar macht.</li>
            <li>Installatiedatum wordt in overleg met de klant vastgesteld na ondertekening.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Betaling</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Betaling dient te geschieden binnen 14 dagen na factuurdatum.</li>
            <li>Bij niet-tijdige betaling is de klant van rechtswege in verzuim.</li>
            <li>EndaTech behoudt het eigendom van geleverde producten tot volledige betaling.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Garantie</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Op de installatie geeft EndaTech 12 maanden garantie op arbeidskosten.</li>
            <li>Op geleverde apparatuur geldt de fabrieksgarantie van de leverancier.</li>
            <li>Garantie vervalt bij onoordeelkundig gebruik of wijzigingen door derden.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Aansprakelijkheid</h2>
          <p>
            EndaTech is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
            De aansprakelijkheid van EndaTech is in alle gevallen beperkt tot het factuurbedrag
            van de betreffende opdracht.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Annulering</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Annulering is mogelijk tot 48 uur voor de geplande installatiedatum, kosteloos.</li>
            <li>Bij latere annulering kan EndaTech annuleringskosten in rekening brengen.</li>
            <li>Bij no-show worden de gemaakte kosten volledig doorberekend.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Toepasselijk recht</h2>
          <p>
            Op alle overeenkomsten met EndaTech is Nederlands recht van toepassing. Geschillen
            worden bij voorkeur in overleg opgelost. Indien dit niet lukt, is de bevoegde
            rechter in Nederland exclusief bevoegd.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
          <p>
            Voor vragen over deze voorwaarden kunt u contact opnemen via{" "}
            <a href="mailto:info@endatech.nl" className="text-[#2563EB] hover:underline">
              info@endatech.nl
            </a>{" "}
            of <a href="tel:+31641088447" className="text-[#2563EB] hover:underline">06-41088447</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
