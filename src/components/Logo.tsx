import Image from "next/image";

/** Verticaal logo (icoon + tekst eronder) — voor op de homepage hero */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/logo-full.png"
        alt="EndaTech logo"
        width={400}
        height={400}
        className="w-48 h-auto"
        priority
      />
    </div>
  );
}

/** Horizontaal logo (icoon + naam naast elkaar) — voor in header/footer */
export function LogoHorizontal({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-horizontal.png"
      alt="EndaTech"
      width={600}
      height={150}
      className={`h-10 w-auto ${className}`}
      priority
    />
  );
}

/** Alleen het icoon — voor favicon / kleine plekken */
export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="EndaTech"
      width={256}
      height={256}
      className={`h-10 w-auto ${className}`}
    />
  );
}
