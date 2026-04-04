import { fetchTrustpilotData } from "@/lib/trustpilot";

const TP_URL = "https://nl.trustpilot.com/review/endatech.nl";

function TrustpilotLogo({ height = 18 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 137 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Trustpilot">
      <path d="M13 0L15.9 9H25.4L18.2 14.5L21 23.5L13 18L5 23.5L7.8 14.5L0.6 9H10.1L13 0Z" fill="#00b67a" />
      <text x="30" y="20" fontFamily="'Helvetica Neue',Helvetica,Arial,sans-serif" fontWeight="700" fontSize="18" fill="#191919" letterSpacing="-0.3">Trustpilot</text>
    </svg>
  );
}

function StarRating({ score, size = 18 }: { score: number; size?: number }) {
  const full = Math.floor(score);
  const partial = Math.round((score - full) * 100);

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${score} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isPartial = i === full && partial > 0;
        const gradId = `tp-half-${size}-${i}`;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isPartial && (
              <defs>
                <linearGradient id={gradId}>
                  <stop offset={`${partial}%`} stopColor="#00b67a" />
                  <stop offset={`${partial}%`} stopColor="#dcdce6" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M12 2l2.9 6.3 6.8.6-5 4.7 1.5 6.8L12 17.3l-6.2 3.1 1.5-6.8-5-4.7 6.8-.6L12 2z"
              fill={i < full ? "#00b67a" : isPartial ? `url(#${gradId})` : "#dcdce6"}
            />
          </svg>
        );
      })}
    </span>
  );
}

/** Smalle balk in de header */
export async function TrustpilotBanner() {
  const { score, reviews } = await fetchTrustpilotData();

  return (
    <a
      href={TP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      aria-label={`EndaTech scoort ${score} op Trustpilot gebaseerd op ${reviews} beoordelingen`}
    >
      <TrustpilotLogo height={16} />
      <StarRating score={score} size={14} />
      <span className="text-xs text-gray-500">
        <strong className="text-gray-700">{score}</strong> · {reviews} beoordelingen
      </span>
    </a>
  );
}

/** Grotere widget op de homepage */
export async function TrustpilotHomepage() {
  const { score, reviews } = await fetchTrustpilotData();

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-3">Wat onze klanten zeggen</p>
      <a
        href={TP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col items-center gap-2 group"
        aria-label={`EndaTech scoort ${score} op Trustpilot gebaseerd op ${reviews} beoordelingen`}
      >
        <TrustpilotLogo height={22} />
        <StarRating score={score} size={28} />
        <p className="text-sm text-gray-600">
          TrustScore <strong>{score}</strong> op basis van{" "}
          <strong>{reviews} beoordelingen</strong>
        </p>
        <span className="text-xs text-[#00b67a] group-hover:underline">
          Bekijk alle beoordelingen →
        </span>
      </a>
    </div>
  );
}
