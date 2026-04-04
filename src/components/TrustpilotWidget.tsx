"use client";

const TP_REVIEW_URL = "https://nl.trustpilot.com/review/endatech.nl";
const TP_GREEN = "#00b67a";

function TrustpilotLogo({ height = 20 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 116 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Trustpilot">
      <path d="M17.4 0H0l5.7 17.5L0 25h17.4l5.7-17.5L17.4 0z" fill={TP_GREEN} />
      <path d="M17.4 0l-5.7 17.5 5.7 7.5 5.7-17.5L17.4 0z" fill="#005128" />
      <text x="28" y="19" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="18" fill="#191919">
        Trustpilot
      </text>
    </svg>
  );
}

function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < count ? TP_GREEN : "#dcdce6"}>
          <path d="M12 2l2.9 6.3 6.8.6-5 4.7 1.5 6.8L12 17.3l-6.2 3.1 1.5-6.8-5-4.7 6.8-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/** Smalle balk in de header */
export function TrustpilotBanner() {
  return (
    <a
      href={TP_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
    >
      <TrustpilotLogo height={16} />
      <Stars count={5} size={14} />
      <span className="text-gray-500 text-xs">3 reviews</span>
      <span className="text-xs text-gray-400 hidden sm:inline">Bekijk onze beoordelingen</span>
    </a>
  );
}

/** Grotere widget op de homepage */
export function TrustpilotHomepage() {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-3">Beoordeeld door onze klanten</p>
      <a
        href={TP_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col items-center gap-2 group"
      >
        <TrustpilotLogo height={24} />
        <Stars count={5} size={22} />
        <span className="text-sm text-gray-500 group-hover:underline">3 beoordelingen · Schrijf een recensie</span>
      </a>
    </div>
  );
}
