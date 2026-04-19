"use client";

import { useEffect, useState } from "react";

const ENCODED = "aW5mb0BlbmRhdGVjaC5ubA==";

interface Props {
  className?: string;
  /** Tekst die getoond wordt zolang JS niet is geladen. Standaard: "Mail ons". */
  fallback?: string;
}

export function EmailLink({ className, fallback = "Mail ons" }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(atob(ENCODED));
  }, []);

  if (!email) {
    return (
      <a href="/contact" className={className}>
        {fallback}
      </a>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
