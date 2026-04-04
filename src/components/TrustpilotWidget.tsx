"use client";

import Script from "next/script";
import { useRef, useEffect } from "react";

const BUSINESS_UNIT_ID = "668aae6374c09786cb00a814";
const SCRIPT_SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

function useTrustpilotWidget(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Try immediately (script may already be loaded from previous page)
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(el, true);
      return;
    }

    // Poll until script is ready (up to 10s)
    let attempts = 0;
    const interval = setInterval(() => {
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(el, true);
        clearInterval(interval);
      } else if (++attempts > 40) {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Smalle balk in de header */
export function TrustpilotBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useTrustpilotWidget(ref);

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => {
          if (ref.current && window.Trustpilot) {
            window.Trustpilot.loadFromElement(ref.current, true);
          }
        }}
      />
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="nl-NL"
        data-template-id="5406e65db0d04a09e042d5fc"
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height="28px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://nl.trustpilot.com/review/endatech.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:underline"
        >
          Bekijk onze reviews op Trustpilot
        </a>
      </div>
    </>
  );
}

/** Grotere widget op de homepage */
export function TrustpilotHomepage() {
  const ref = useRef<HTMLDivElement>(null);
  useTrustpilotWidget(ref);

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => {
          if (ref.current && window.Trustpilot) {
            window.Trustpilot.loadFromElement(ref.current, true);
          }
        }}
      />
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="nl-NL"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height="52px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://nl.trustpilot.com/review/endatech.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:underline"
        >
          Bekijk onze reviews op Trustpilot
        </a>
      </div>
    </>
  );
}
