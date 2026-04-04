const BUSINESS_UNIT_ID = "668aae6374c09786cb00a814";

function trustpilotIframeSrc(templateId: string, locale = "nl-NL") {
  return (
    `https://widget.trustpilot.com/trustboxes/${templateId}/index.html` +
    `?templateId=${templateId}&businessunitId=${BUSINESS_UNIT_ID}&locale=${locale}`
  );
}

/** Smalle balk in de header */
export function TrustpilotBanner() {
  return (
    <iframe
      title="Trustpilot reviews EndaTech"
      src={trustpilotIframeSrc("5406e65db0d04a09e042d5fc")}
      width="100%"
      height="28"
      style={{ border: "none", overflow: "hidden" }}
      loading="lazy"
    />
  );
}

/** Grotere widget op de homepage */
export function TrustpilotHomepage() {
  return (
    <iframe
      title="Trustpilot reviews EndaTech"
      src={trustpilotIframeSrc("5419b6a8b0d04a076446a9ad")}
      width="100%"
      height="52"
      style={{ border: "none", overflow: "hidden" }}
      loading="lazy"
    />
  );
}
