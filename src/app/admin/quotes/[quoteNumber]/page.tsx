"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface QuoteLine {
  id?: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface AircoModel {
  id: string;
  brand: string;
  model: string;
  price: number | null;
  installationPrice: number | null;
  active: boolean;
}

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
  btwPercentage: number;
  validUntil: string | null;
  signed: boolean;
  signedAt: string | null;
  signature: string | null;
  signedIp: string | null;
  signedDevice: string | null;
  signedLocation: string | null;
  status: string;
  createdAt: string;
  lines: QuoteLine[];
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

const EMPTY_LINE: QuoteLine = { productName: "", description: "", quantity: 1, unitPrice: 0, lineTotal: 0 };

interface ProductOption {
  value: string;          // model id, "DIVERSEN", or ""
  label: string;          // display label e.g. "Daikin Sensira FTXC25C"
  brand: string;
  searchText: string;
  priceLabel: string;
}

function ProductCombobox({
  value,
  options,
  onPick,
}: {
  value: string;
  options: ProductOption[];
  onPick: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  function updateRect() {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 280) });
  }

  function openPanel() {
    updateRect();
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    function onPointer(e: MouseEvent) {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
      setQuery("");
    }
    function onScrollResize() { updateRect(); }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    }

    document.addEventListener("mousedown", onPointer);
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.searchText.includes(q));
  }, [query, options]);

  const grouped = useMemo(() => {
    const groups: Record<string, ProductOption[]> = {};
    for (const o of filtered) (groups[o.brand] ??= []).push(o);
    return Object.entries(groups);
  }, [filtered]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        className="w-full text-left px-2 py-1.5 border border-gray-200 rounded text-sm bg-white focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none flex items-center justify-between gap-2"
      >
        <span className={selected ? "text-gray-900 truncate" : "text-gray-400 truncate"}>
          {selected ? selected.label : "— Kies product —"}
        </span>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && rect && (
        <div
          ref={panelRef}
          style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width }}
          className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col"
        >
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op merk of model..."
              className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">Geen producten gevonden</div>
            ) : (
              grouped.map(([brand, items]) => (
                <div key={brand}>
                  {brand !== "" && (
                    <div className="px-3 py-1 text-xs font-medium text-gray-400 bg-gray-50 sticky top-0">
                      {brand}
                    </div>
                  )}
                  {items.map((o) => (
                    <button
                      key={o.value || o.label}
                      type="button"
                      onClick={() => {
                        onPick(o.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between gap-2 ${o.value === value ? "bg-blue-50" : ""}`}
                    >
                      <span className="text-gray-900 truncate">{o.label}</span>
                      {o.priceLabel && (
                        <span className="text-gray-500 text-xs flex-shrink-0">{o.priceLabel}</span>
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminQuotePage() {
  const params = useParams();
  const router = useRouter();
  const quoteNumber = params.quoteNumber as string;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Send-mail state
  const [sendEmail, setSendEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  // Form state
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [status, setStatus] = useState("");
  const [btwPercentage, setBtwPercentage] = useState(21);
  const [lines, setLines] = useState<QuoteLine[]>([{ ...EMPTY_LINE }]);
  const [aircoModels, setAircoModels] = useState<AircoModel[]>([]);

  useEffect(() => {
    fetch("/api/admin/airco-models")
      .then((res) => res.ok ? res.json() : [])
      .then((data: AircoModel[]) => setAircoModels(data.filter((m) => m.active)));
  }, []);

  const productOptions = useMemo<ProductOption[]>(() => {
    const sorted = [...aircoModels].sort(
      (a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model)
    );
    const opts: ProductOption[] = sorted.map((m) => {
      const p = (m.price ?? 0) + (m.installationPrice ?? 0);
      const label = `${m.brand} ${m.model}`;
      return {
        value: m.id,
        label,
        brand: m.brand,
        searchText: label.toLowerCase(),
        priceLabel: p > 0 ? `€ ${p.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}` : "",
      };
    });
    opts.unshift({
      value: "DIVERSEN",
      label: "Diversen",
      brand: "",
      searchText: "diversen",
      priceLabel: "",
    });
    return opts;
  }, [aircoModels]);

  function selectedValue(productName: string): string {
    if (productName === "Diversen") return "DIVERSEN";
    const m = aircoModels.find((m) => `${m.brand} ${m.model}` === productName);
    return m ? m.id : "";
  }

  function handlePickProduct(index: number, value: string) {
    if (value === "") return;
    if (value === "DIVERSEN") {
      setLines((prev) => {
        const updated = [...prev];
        const line = { ...updated[index], productName: "Diversen", unitPrice: 0 };
        line.lineTotal = line.quantity * line.unitPrice;
        updated[index] = line;
        return updated;
      });
      return;
    }
    const model = aircoModels.find((m) => m.id === value);
    if (!model) return;
    const productName = `${model.brand} ${model.model}`;
    const unitPrice = (model.price ?? 0) + (model.installationPrice ?? 0);
    setLines((prev) => {
      const updated = [...prev];
      const line = { ...updated[index], productName, unitPrice };
      line.lineTotal = line.quantity * line.unitPrice;
      updated[index] = line;
      return updated;
    });
  }

  const fetchQuote = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/quotes/${quoteNumber}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { router.push("/admin"); return; }
      const data: Quote = await res.json();
      setQuote(data);
      setDescription(data.description ?? "");
      setValidUntil(data.validUntil ? data.validUntil.slice(0, 10) : "");
      setStatus(data.status);
      setBtwPercentage(data.btwPercentage ?? 21);
      setLines(data.lines.length > 0 ? data.lines : [{ ...EMPTY_LINE }]);
      setSendEmail((prev) => prev || data.email);
    } finally {
      setLoading(false);
    }
  }, [quoteNumber, router]);

  useEffect(() => { fetchQuote(); }, [fetchQuote]);

  // Line item helpers
  function updateLine(index: number, field: keyof QuoteLine, value: string | number) {
    setLines((prev) => {
      const updated = [...prev];
      const line = { ...updated[index], [field]: value };
      line.lineTotal = line.quantity * line.unitPrice;
      updated[index] = line;
      return updated;
    });
  }

  function addLine() {
    setLines((prev) => [...prev, { ...EMPTY_LINE }]);
  }

  function removeLine(index: number) {
    setLines((prev) => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  }

  // Totals
  const subtotal = lines.reduce((sum, l) => sum + (l.quantity * l.unitPrice), 0);
  const btwAmount = subtotal * (btwPercentage / 100);
  const totalInclBtw = subtotal + btwAmount;

  async function handleSendToCustomer() {
    setSendMessage(null);
    const recipient = sendEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      setSendMessage({ kind: "error", text: "Vul een geldig e-mailadres in." });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quoteNumber}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recipient }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Versturen mislukt");
      }
      setSendMessage({ kind: "success", text: `Offerte verstuurd naar ${data.sentTo || recipient}` });
      // Refresh in case status changed PENDING → SENT
      fetchQuote();
    } catch (err) {
      setSendMessage({
        kind: "error",
        text: err instanceof Error ? err.message : "Versturen mislukt",
      });
    } finally {
      setSending(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    // Filter out empty lines
    const filledLines = lines.filter((l) => l.productName.trim());

    try {
      const res = await fetch(`/api/admin/quotes/${quoteNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description || null,
          validUntil: validUntil || null,
          status,
          btwPercentage,
          lines: filledLines.map((l) => ({
            productName: l.productName,
            description: l.description || undefined,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Opslaan mislukt");
      }

      const updated: Quote = await res.json();
      setQuote(updated);
      setLines(updated.lines.length > 0 ? updated.lines : [{ ...EMPTY_LINE }]);
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="font-mono text-sm text-gray-500">{quoteNumber}</span>
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {STATUSES.find((s) => s.value === quote.status)?.label ?? quote.status}
          </span>
          <div className="ml-auto">
            <a
              href={`/api/admin/quotes/${quoteNumber}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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

          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Offerte-instellingen</h2>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Geldig tot</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BTW-percentage</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={btwPercentage}
                      onChange={(e) => setBtwPercentage(Number(e.target.value))}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offerte omschrijving
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none resize-none"
                  placeholder="Algemene omschrijving van de offerte..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Send to customer */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Offerte versturen naar klant</h2>
          <p className="text-sm text-gray-500 mb-4">
            Verstuur de offerte (incl. PDF-bijlage) per e-mail. Pas het adres aan als de klant naar een ander e-mailadres wil ontvangen.
          </p>

          {sendMessage && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm border ${
                sendMessage.kind === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {sendMessage.text}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
              <input
                type="email"
                value={sendEmail}
                onChange={(e) => setSendEmail(e.target.value)}
                placeholder="klant@voorbeeld.nl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
              />
              {quote.email && sendEmail.trim() !== quote.email && (
                <p className="mt-1 text-xs text-gray-400">
                  Origineel adres uit aanvraag:{" "}
                  <button
                    type="button"
                    onClick={() => setSendEmail(quote.email)}
                    className="text-[#2563EB] hover:underline"
                  >
                    {quote.email}
                  </button>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSendToCustomer}
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
            >
              {sending ? (
                "Versturen..."
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Verstuur naar klant
                </>
              )}
            </button>
          </div>
        </div>

        {/* Line items table */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Producten & diensten</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-2 font-medium text-gray-500 w-[28%]">Product</th>
                  <th className="text-left py-2 pr-2 font-medium text-gray-500 w-[28%]">Omschrijving</th>
                  <th className="text-right py-2 pr-2 font-medium text-gray-500 w-[10%]">Aantal</th>
                  <th className="text-right py-2 pr-2 font-medium text-gray-500 w-[14%]">Prijs/stuk</th>
                  <th className="text-right py-2 pr-2 font-medium text-gray-500 w-[14%]">Totaal</th>
                  <th className="w-[6%]"></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-2">
                      <ProductCombobox
                        value={selectedValue(line.productName)}
                        options={productOptions}
                        onPick={(value) => handlePickProduct(i, value)}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        value={line.description}
                        onChange={(e) => updateLine(i, "description", e.target.value)}
                        placeholder="Omschrijving"
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        min="1"
                        value={line.quantity}
                        onChange={(e) => updateLine(i, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <div className="relative">
                        <span className="absolute left-2 top-2 text-gray-400 text-xs">€</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.unitPrice || ""}
                          onChange={(e) => updateLine(i, "unitPrice", parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded text-sm text-right focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                        />
                      </div>
                    </td>
                    <td className="py-2 pr-2 text-right font-medium text-gray-900">
                      € {(line.quantity * line.unitPrice).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => removeLine(i)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        title="Verwijderen"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addLine}
            className="mt-3 text-sm text-[#2563EB] hover:text-[#1d4ed8] font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Regel toevoegen
          </button>

          {/* Totals */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
            <div className="w-72 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotaal (excl. BTW)</span>
                <span className="font-medium text-gray-900">€ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">BTW ({btwPercentage}%)</span>
                <span className="font-medium text-gray-900">€ {btwAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-base">
                <span className="font-semibold text-gray-900">Totaal (incl. BTW)</span>
                <span className="font-bold text-gray-900">€ {totalInclBtw.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save & delete buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            Offerte verwijderen
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? "Opslaan..." : saved ? "Opgeslagen!" : "Opslaan"}
          </button>
        </div>

        {/* Signature & stamp */}
        {quote.signed && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Handtekening & ondertekeningsbewijs</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Signature image */}
              {quote.signature && (
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Handtekening</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={quote.signature}
                    alt="Handtekening"
                    className="border border-gray-200 rounded-lg max-h-40 bg-white"
                  />
                </div>
              )}

              {/* Stamp details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Ondertekeningsgegevens</p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-gray-400 w-32 flex-shrink-0">Datum/tijd</dt>
                      <dd className="text-gray-900">
                        {quote.signedAt ? new Date(quote.signedAt).toLocaleString("nl-NL", {
                          day: "2-digit", month: "2-digit", year: "numeric",
                          hour: "2-digit", minute: "2-digit", second: "2-digit"
                        }) : "—"}
                      </dd>
                    </div>
                    {quote.signedIp && (
                      <div className="flex gap-2">
                        <dt className="text-gray-400 w-32 flex-shrink-0">IP-adres</dt>
                        <dd className="text-gray-900 font-mono text-xs">{quote.signedIp}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Device info */}
                {quote.signedDevice && (() => {
                  try {
                    const device = JSON.parse(quote.signedDevice);
                    return (
                      <div>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Apparaat</p>
                        <dl className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <dt className="text-gray-400 w-32 flex-shrink-0">Type</dt>
                            <dd className="text-gray-900">{device.deviceType || "Onbekend"}</dd>
                          </div>
                          {device.platform && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Platform</dt>
                              <dd className="text-gray-900">{device.platform}</dd>
                            </div>
                          )}
                          {device.screenWidth && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Scherm</dt>
                              <dd className="text-gray-900">
                                {device.screenWidth}×{device.screenHeight}px
                                {device.pixelRatio > 1 ? ` (@${device.pixelRatio}x)` : ""}
                              </dd>
                            </div>
                          )}
                          {device.touchSupport !== undefined && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Touchscreen</dt>
                              <dd className="text-gray-900">{device.touchSupport ? "Ja" : "Nee"}</dd>
                            </div>
                          )}
                          {device.language && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Taal</dt>
                              <dd className="text-gray-900">{device.language}</dd>
                            </div>
                          )}
                          {device.userAgent && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Browser</dt>
                              <dd className="text-gray-900 text-xs break-all leading-relaxed">{device.userAgent}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    );
                  } catch { return null; }
                })()}

                {/* Location info */}
                {quote.signedLocation && (() => {
                  try {
                    const loc = JSON.parse(quote.signedLocation);
                    return (
                      <div>
                        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Locatie</p>
                        <dl className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <dt className="text-gray-400 w-32 flex-shrink-0">Coördinaten</dt>
                            <dd className="text-gray-900 font-mono text-xs">
                              {loc.latitude?.toFixed(6)}, {loc.longitude?.toFixed(6)}
                            </dd>
                          </div>
                          {loc.accuracy && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400 w-32 flex-shrink-0">Nauwkeurigheid</dt>
                              <dd className="text-gray-900">{loc.accuracy}m</dd>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <dt className="text-gray-400 w-32 flex-shrink-0">Kaart</dt>
                            <dd>
                              <a
                                href={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2563EB] hover:underline text-xs"
                              >
                                Bekijk op Google Maps →
                              </a>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    );
                  } catch { return null; }
                })()}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Offerte verwijderen?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Weet je zeker dat je offerte <strong>{quoteNumber}</strong> wilt verwijderen? Dit kan niet ongedaan worden.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuleren
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true);
                  try {
                    const res = await fetch(`/api/admin/quotes/${quoteNumber}`, {
                      method: "DELETE",
                      credentials: "include",
                    });
                    if (res.ok) {
                      router.push("/admin");
                    } else {
                      const data = await res.text();
                      setError("Verwijderen mislukt: " + data);
                      setShowDeleteModal(false);
                    }
                  } catch {
                    setError("Verwijderen mislukt — probeer opnieuw");
                    setShowDeleteModal(false);
                  } finally {
                    setDeleting(false);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Verwijderen..." : "Verwijderen"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
