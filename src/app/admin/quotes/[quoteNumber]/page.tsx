"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Quote {
  quoteNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  propertyType: string;
  rooms: string;
  notes: string | null;
  description: string | null;
  totalAmount: number | null;
  validUntil: string | null;
  signed: boolean;
  signedAt: string | null;
  signature: string | null;
  signedIp: string | null;
  status: string;
  createdAt: string;
}

const STATUSES = [
  { value: "PENDING",   label: "In behandeling" },
  { value: "SENT",      label: "Verzonden" },
  { value: "VIEWED",    label: "Bekeken" },
  { value: "SIGNED",    label: "Ondertekend" },
  { value: "ACCEPTED",  label: "Geaccepteerd" },
  { value: "COMPLETED", label: "Voltooid" },
  { value: "EXPIRED",   label: "Verlopen" },
  { value: "CANCELLED", label: "Geannuleerd" },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  SENT:      "bg-blue-100 text-blue-800",
  VIEWED:    "bg-purple-100 text-purple-800",
  SIGNED:    "bg-green-100 text-green-800",
  ACCEPTED:  "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  EXPIRED:   "bg-red-100 text-red-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminQuotePage() {
  const params = useParams();
  const router = useRouter();
  const quoteNumber = params.quoteNumber as string;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [status, setStatus] = useState("");

  const fetchQuote = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/quotes/${quoteNumber}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { router.push("/admin"); return; }
      const data: Quote = await res.json();
      setQuote(data);
      setDescription(data.description ?? "");
      setTotalAmount(data.totalAmount != null ? String(data.totalAmount) : "");
      setValidUntil(data.validUntil ? data.validUntil.slice(0, 10) : "");
      setStatus(data.status);
    } finally {
      setLoading(false);
    }
  }, [quoteNumber, router]);

  useEffect(() => { fetchQuote(); }, [fetchQuote]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch(`/api/admin/quotes/${quoteNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description || null,
          totalAmount: totalAmount ? parseFloat(totalAmount) : null,
          validUntil: validUntil || null,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Opslaan mislukt");
      }

      const updated: Quote = await res.json();
      setQuote(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Laden...</p>
      </div>
    );
  }

  if (!quote) return null;

  const statusColor = STATUS_COLORS[quote.status] ?? "bg-gray-100 text-gray-800";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="font-mono text-sm text-gray-500">{quoteNumber}</span>
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {STATUSES.find((s) => s.value === quote.status)?.label ?? quote.status}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Klantgegevens</h2>
            <dl className="space-y-3 text-sm">
              {[
                ["Naam", quote.name],
                ["E-mail", quote.email],
                ["Telefoon", quote.phone],
                ["Adres", quote.address],
                ["Postcode / Stad", `${quote.postalCode} ${quote.city}`],
                ["Type pand", quote.propertyType],
                ["Ruimte(s)", quote.rooms],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-gray-400 w-36 flex-shrink-0">{label}</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
              {quote.notes && (
                <div className="flex gap-2">
                  <dt className="text-gray-400 w-36 flex-shrink-0">Opmerkingen</dt>
                  <dd className="text-gray-900">{quote.notes}</dd>
                </div>
              )}
            </dl>
            <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
              Aangevraagd op {new Date(quote.createdAt).toLocaleString("nl-NL")}
            </p>
          </div>

          {/* Edit form */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Offerte bewerken</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Totaalbedrag (incl. BTW)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Geldig tot
                </label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offerte omschrijving
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none resize-none"
                  placeholder="Omschrijving van de offerte, producten, installatie..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? "Opslaan..." : saved ? "Opgeslagen!" : "Opslaan"}
              </button>
            </div>
          </div>
        </div>

        {/* Signature */}
        {quote.signed && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Handtekening</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gray-400 w-28 flex-shrink-0">Ondertekend op</dt>
                  <dd className="text-gray-900">
                    {quote.signedAt ? new Date(quote.signedAt).toLocaleString("nl-NL") : "—"}
                  </dd>
                </div>
                {quote.signedIp && (
                  <div className="flex gap-2">
                    <dt className="text-gray-400 w-28 flex-shrink-0">IP-adres</dt>
                    <dd className="text-gray-900 font-mono">{quote.signedIp}</dd>
                  </div>
                )}
              </dl>
              {quote.signature && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Handtekening</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={quote.signature}
                    alt="Handtekening"
                    className="border border-gray-200 rounded-lg max-h-32 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
