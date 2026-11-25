import type { CompanionId } from "./store";

const COLORS: Record<CompanionId, { body: string; belly: string; horn: string }> = {
  long: { body: "#ffc53d", belly: "#fff4cc", horn: "#3ec6c9" },
  tang: { body: "#ff8aa0", belly: "#ffe4ea", horn: "#7ec8f0" },
  xiong: { body: "#d4924a", belly: "#ffe0b0", horn: "#8b5a2b" },
  xiang: { body: "#b9a8e8", belly: "#efe8ff", horn: "#f7c6e0" },
};

export function Dragon({
  who,
  talking,
  night,
}: {
  who: CompanionId;
  talking: boolean;
  night: boolean;
}) {
  const c = COLORS[who];
  return (
    <svg className="dragon-wrap" viewBox="0 0 220 240" aria-hidden>
      <ellipse cx="110" cy="210" rx="70" ry="12" fill={night ? "#0d0a22" : "#1a7f8c"} opacity="0.25" />
      <g className={talking ? "bob talk" : "bob"}>
        <path d="M40 150 C20 180 70 210 110 200 C160 210 200 170 175 140" fill={c.body} />
        <circle cx="188" cy="148" r="10" fill={c.horn} />
        <ellipse cx="110" cy="128" rx="68" ry="62" fill={c.body} />
        <ellipse cx="110" cy="148" rx="42" ry="32" fill={c.belly} />
        <path d="M70 78 L78 48 L92 78" fill={c.horn} />
        <path d="M128 78 L142 44 L154 78" fill={c.horn} />
        <circle cx="88" cy="120" r="10" fill="#fff" />
        <circle cx="132" cy="120" r="10" fill="#fff" />
        <circle cx="90" cy="121" r="5" fill="#1e3a40" />
        <circle cx="134" cy="121" r="5" fill="#1e3a40" />
        <ellipse cx="110" cy="158" rx={talking ? 16 : 10} ry={talking ? 10 : 5} fill="#c4452b" />
        {who === "xiong" ? <circle cx="168" cy="108" r="14" fill="#c47a32" /> : null}
        {who === "xiang" ? <ellipse cx="48" cy="150" rx="18" ry="28" fill={c.body} /> : null}
      </g>
      <style>{`
        .bob { transform-origin: 110px 200px; animation: idle 2.8s ease-in-out infinite; }
        .talk { animation: idle 0.6s ease-in-out infinite; }
        @keyframes idle { 50% { transform: translateY(-6px); } }
      `}</style>
    </svg>
  );
}
