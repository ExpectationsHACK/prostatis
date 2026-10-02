import type { ReactNode } from "react";

/*
 * Everyday objects drawn as simple line sketches on a 64×64 grid. The sketch component strokes
 * them in ink and roughens the lines so they read as hand-drawn. Accent fills are kept small:
 * orange for the thing that matters, a soft wash or danfo yellow for warmth.
 */
const O = "var(--brand)";
const W = "var(--brand-wash)";
const Y = "#f2c230";
const G = "#dcf8c6";
const K = "currentColor";

export const glyphs = {
  person: (
    <>
      <circle cx="32" cy="18" r="9" fill={W} />
      <path d="M14 57c0-15 8-22 18-22s18 7 18 22" />
      <path d="M28 19.5c1.5 1.6 6.5 1.6 8 0" />
    </>
  ),
  people: (
    <>
      <circle cx="23" cy="20" r="7" fill={W} />
      <circle cx="43" cy="23" r="6.5" />
      <path d="M8 55c0-12 6-18 15-18s15 6 15 18" />
      <path d="M33 55c0-10 4-16 10-16s13 5 13 16" />
    </>
  ),
  shop: (
    <>
      <path d="M8 23 14 10h36l6 13z" fill={W} />
      <path d="M8 23q5 6 10 0 5 6 10 0 5 6 10 0 5 6 10 0 4 6 8 0" />
      <path d="M12 26v30h40V26" />
      <path d="M27 56V40h11v16" />
      <path d="M16 31h8v8h-8z" />
      <path d="M42 31h6v8h-6" />
    </>
  ),
  house: (
    <>
      <path d="M8 31 32 12l24 19" />
      <path d="M14 27v28h36V27" fill={W} />
      <path d="M28 55V41h9v14" />
      <path d="M18 32h7v7h-7z" />
      <path d="M44 18v-7h5v11" />
    </>
  ),
  signpost: (
    <>
      <path d="M32 12v46" />
      <path d="M14 15h31l6 6-6 6H14z" fill={O} />
      <path d="M50 31H21l-6 6 6 6h29z" />
      <path d="M23 58h18" />
    </>
  ),
  phone: (
    <>
      <rect x="18" y="5" width="28" height="54" rx="6" />
      <path d="M22 13h20v36H22z" fill={W} />
      <path d="M29 9h6" />
      <circle cx="32" cy="54" r="1.8" fill={K} />
    </>
  ),
  laptop: (
    <>
      <rect x="12" y="13" width="40" height="29" rx="3" />
      <path d="M16 17h32v21H16z" fill={W} />
      <path d="M5 46h54l-4 7H9z" />
      <path d="M28 49h8" />
    </>
  ),
  browser: (
    <>
      <rect x="6" y="9" width="52" height="46" rx="4" />
      <path d="M6 19h52" />
      <circle cx="12" cy="14" r="1.4" fill={K} />
      <circle cx="17" cy="14" r="1.4" fill={K} />
      <rect x="25" y="12" width="29" height="4.5" rx="2" fill={W} />
      <path d="M13 28h26M13 36h36M13 44h22" />
    </>
  ),
  page: (
    <>
      <path d="M16 6h24l10 10v42H16z" fill="#fff" />
      <path d="M40 6v10h10" />
      <path d="M22 26h22M22 34h22M22 42h15" />
    </>
  ),
  folder: (
    <>
      <path d="M6 16h20l4 6h28v32H6z" fill={W} />
      <path d="M6 26h52" />
    </>
  ),
  box: (
    <>
      <path d="M12 23 32 15l20 8-20 8z" fill={W} />
      <path d="M12 23v23l20 10V31" />
      <path d="M52 23v23L32 56" />
      <path d="m21 19 20 8" />
    </>
  ),
  envelope: (
    <>
      <rect x="8" y="15" width="48" height="35" rx="3" fill="#fff" />
      <path d="m9 17 23 19 23-19" />
      <path d="m9 48 17-15M55 48 38 33" />
    </>
  ),
  chat: (
    <>
      <path d="M11 12h42q5 0 5 5v19q0 5-5 5H27l-11 11V41h-5q-5 0-5-5V17q0-5 5-5z" fill="#fff" />
      <circle cx="22" cy="27" r="2.2" fill={K} />
      <circle cx="32" cy="27" r="2.2" fill={K} />
      <circle cx="42" cy="27" r="2.2" fill={K} />
    </>
  ),
  whatsapp: (
    <>
      <path d="M32 9a22 22 0 0 0-19 33l-4 13 13-4A22 22 0 1 0 32 9z" fill={G} />
      <path d="M24 22c-2 3 0 9 5 14s11 7 14 5l1-4-5-3-3 2c-3-1-6-4-7-7l2-3-3-5z" />
    </>
  ),
  lock: (
    <>
      <path d="M21 28v-8a11 11 0 0 1 22 0v8" />
      <rect x="15" y="28" width="34" height="27" rx="4" fill={O} />
      <circle cx="32" cy="39" r="3.2" fill={K} />
      <path d="M32 42v6" />
    </>
  ),
  key: (
    <>
      <circle cx="18" cy="32" r="9" fill={Y} />
      <circle cx="18" cy="32" r="2.5" />
      <path d="M27 32h29M48 32v8M54 32v6" />
    </>
  ),
  naira: (
    <>
      <rect x="6" y="18" width="52" height="30" rx="3" fill={G} />
      <circle cx="32" cy="33" r="9" fill="#fff" />
      <path d="M28 38v-10l8 10V28M26 32h12M26 35h12" />
      <path d="M11 23h5M48 43h5" />
    </>
  ),
  card: (
    <>
      <rect x="6" y="14" width="52" height="36" rx="4" fill="#fff" />
      <path d="M6 22h52v7H6z" fill={K} />
      <rect x="12" y="34" width="10" height="8" rx="1.5" fill={Y} />
      <path d="M30 40h20" />
    </>
  ),
  pos: (
    <>
      <path d="M24 7V2h16v5" />
      <rect x="17" y="7" width="30" height="51" rx="5" fill="#fff" />
      <rect x="22" y="12" width="20" height="12" rx="1.5" fill={G} />
      <circle cx="25" cy="32" r="1.6" fill={K} />
      <circle cx="32" cy="32" r="1.6" fill={K} />
      <circle cx="39" cy="32" r="1.6" fill={K} />
      <circle cx="25" cy="39" r="1.6" fill={K} />
      <circle cx="32" cy="39" r="1.6" fill={K} />
      <circle cx="39" cy="39" r="1.6" fill={K} />
      <path d="M24 49h16" stroke={O} />
    </>
  ),
  calendar: (
    <>
      <rect x="8" y="12" width="48" height="43" rx="4" fill="#fff" />
      <path d="M8 23h48" />
      <path d="M8 12h48v11H8z" fill={O} />
      <path d="M20 7v10M44 7v10" />
      <path d="M17 32h4M28 32h4M39 32h4M17 42h4M28 42h4" />
      <circle cx="41" cy="43" r="6" />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="32" r="23" fill="#fff" />
      <path d="M32 32V17M32 32l10 6" />
      <path d="M32 11v3M53 32h-3M32 53v-3M11 32h3" />
      <circle cx="32" cy="32" r="1.8" fill={K} />
    </>
  ),
  pin: (
    <>
      <path d="M32 58C20 43 14 35 14 26a18 18 0 0 1 36 0c0 9-6 17-18 32z" fill={O} />
      <circle cx="32" cy="26" r="6" fill="#fff" />
    </>
  ),
  search: (
    <>
      <circle cx="27" cy="27" r="15" fill="#fff" />
      <path d="M21 22a8 8 0 0 1 8-4" />
      <path d="m38 38 16 16" strokeWidth="6" />
    </>
  ),
  robot: (
    <>
      <path d="M32 15V8" />
      <circle cx="32" cy="7" r="2.5" fill={O} />
      <rect x="14" y="15" width="36" height="30" rx="7" fill={W} />
      <circle cx="25" cy="29" r="3.5" fill={K} />
      <circle cx="39" cy="29" r="3.5" fill={K} />
      <path d="M26 38h12" />
      <path d="M14 26h-4v9h4M50 26h4v9h-4" />
      <path d="M22 45v8h20v-8" />
    </>
  ),
  spark: (
    <>
      <path d="M30 6c2 16 10 24 26 26-16 2-24 10-26 26-2-16-10-24-26-26 16-2 24-10 26-26z" fill={W} />
      <path d="M51 6c.8 4 2.6 5.8 6.5 6.5-3.9.7-5.7 2.5-6.5 6.5-.8-4-2.6-5.8-6.5-6.5 3.9-.7 5.7-2.5 6.5-6.5z" fill={O} />
    </>
  ),
  gear: (
    <>
      <path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M15 49l5-5M44 20l5-5" strokeWidth="5" />
      <circle cx="32" cy="32" r="16" fill={W} />
      <circle cx="32" cy="32" r="6" fill="#fff" />
    </>
  ),
  bolt: <path d="M37 4 16 36h14l-4 24 22-34H34z" fill={Y} />,
  cloud: <path d="M18 47h30a11 11 0 0 0-1-22 15 15 0 0 0-28-2 12 12 0 0 0-1 24z" fill="#fff" />,
  server: (
    <>
      <rect x="17" y="5" width="30" height="54" rx="3" fill="#fff" />
      <path d="M23 14h18M23 22h18M23 30h18" />
      <circle cx="25" cy="48" r="2" fill="#16794a" />
      <circle cx="32" cy="48" r="2" fill={O} />
    </>
  ),
  book: (
    <>
      <path d="M32 16C24 10 14 10 7 12v40c7-2 17-2 25 4 8-6 18-6 25-4V12c-7-2-17-2-25 4z" fill="#fff" />
      <path d="M32 16v40" />
      <path d="M13 22c4-1 9-1 13 1M13 30c4-1 9-1 13 1M38 23c4-2 9-2 13-1M38 31c4-2 9-2 13-1" />
    </>
  ),
  list: (
    <>
      <rect x="13" y="10" width="38" height="48" rx="3" fill="#fff" />
      <rect x="24" y="6" width="16" height="8" rx="2" fill={W} />
      <path d="m19 25 3 3 5-6M31 25h14M19 37l3 3 5-6M31 37h14M19 49l3 3 5-6M31 49h10" />
    </>
  ),
  chart: (
    <>
      <path d="M9 9v45h47" />
      <path d="M16 36h8v18h-8zM29 27h8v27h-8z" />
      <path d="M42 15h8v39h-8z" fill={O} />
    </>
  ),
  star: <path d="m32 7 7.4 15 16.6 2.4-12 11.7 2.8 16.5L32 44.8l-14.8 7.8 2.8-16.5L8 24.4 24.6 22z" fill={Y} />,
  magnet: (
    <>
      <path d="M17 11v22a15 15 0 0 0 30 0V11h-9v22a6 6 0 0 1-12 0V11z" fill={O} />
      <path d="M17 11h9v8h-9zM38 11h9v8h-9z" fill="#fff" />
    </>
  ),
  funnel: (
    <>
      <path d="M7 10h50L38 33v21l-12-6V33z" fill={W} />
      <path d="M14 10c0-3 2-5 4-5M30 10c0-3 2-5 4-5M46 10c0-3 2-5 4-5" />
      <circle cx="32" cy="60" r="2" fill={O} />
    </>
  ),
  megaphone: (
    <>
      <path d="M9 26v12h9l26 15V11L18 26z" fill={W} />
      <path d="m20 38 4 15h6l-3-13" />
      <path d="M50 24c3 2 3 14 0 16M55 19c6 5 6 21 0 26" />
    </>
  ),
  handshake: (
    <>
      <path d="m4 26 13-6 9 5M60 26l-13-6-9 5" />
      <path d="M17 34c5 7 12 11 17 12 5 1 9-2 10-5l3-11-10-6-12 6-5-2z" fill={W} />
      <path d="m29 36 6 5M33 32l6 5M4 40l9 2M60 40l-9 2" />
    </>
  ),
  trophy: (
    <>
      <path d="M20 9h24v15a12 12 0 0 1-24 0z" fill={Y} />
      <path d="M20 13h-8v5a8 8 0 0 0 9 8M44 13h8v5a8 8 0 0 1-9 8" />
      <path d="M32 36v10" />
      <path d="M22 46h20v7H22z" fill={O} />
    </>
  ),
  camera: (
    <>
      <path d="M22 18 26 11h12l4 7" />
      <rect x="6" y="18" width="52" height="35" rx="5" fill="#fff" />
      <circle cx="32" cy="35" r="11" fill={W} />
      <circle cx="32" cy="35" r="5" />
      <path d="M48 25h4" />
    </>
  ),
  palette: (
    <>
      <path d="M32 8C16 8 6 19 6 32s11 24 23 24c6 0 7-5 4-8-3-4-1-8 4-8h9c7 0 12-6 12-12C58 16 46 8 32 8z" fill="#fff" />
      <circle cx="20" cy="25" r="4" fill={O} />
      <circle cx="32" cy="18" r="4" fill="#2563eb" />
      <circle cx="44" cy="22" r="4" fill="#16794a" />
      <circle cx="18" cy="39" r="4" fill={Y} />
    </>
  ),
  letters: (
    <>
      <path d="m8 50 12-34 12 34M12 39h16" strokeWidth="3.4" />
      <path d="M52 50V35a7 7 0 0 0-13-3M52 42c-9-2-15 0-15 5s8 6 15-1" strokeWidth="3" />
    </>
  ),
  tape: (
    <>
      <circle cx="22" cy="30" r="16" fill={Y} />
      <circle cx="22" cy="30" r="5" fill="#fff" />
      <path d="M22 46h36v-8H33" fill={Y} />
      <path d="M40 46v-4M46 46v-4M52 46v-4" />
    </>
  ),
  scissors: (
    <>
      <circle cx="17" cy="47" r="7" />
      <circle cx="35" cy="51" r="7" />
      <path d="M22 42 54 9M30 45 56 17" />
      <circle cx="33" cy="31" r="1.6" fill={K} />
    </>
  ),
  dress: (
    <>
      <path d="M24 7 19 13l6 8-8 36h30l-8-36 6-8-5-6q-8 6-16 0z" fill={O} />
      <path d="M25 22h14" />
      <path d="M24 34l-3 18M40 34l3 18" stroke="#fff" />
    </>
  ),
  machine: (
    <>
      <rect x="6" y="46" width="52" height="8" rx="2" fill={W} />
      <path d="M12 46V21q0-7 7-7h29q7 0 7 7v9H44v16" fill="#fff" />
      <path d="M48 30v10" />
      <circle cx="56" cy="22" r="4.5" fill={O} />
      <path d="M18 22h18" />
    </>
  ),
  bell: (
    <>
      <path d="M32 11v4" />
      <path d="M19 45V31a13 13 0 0 1 26 0v14l4 4H15z" fill={Y} />
      <circle cx="32" cy="54" r="3" fill={K} />
      <path d="M53 22c2 3 2 8 0 11M11 22c-2 3-2 8 0 11" />
    </>
  ),
  shield: (
    <>
      <path d="M32 6 52 14v15c0 14-9 23-20 29C21 52 12 43 12 29V14z" fill={W} />
      <path d="m23 31 6 6 12-12" strokeWidth="3.4" />
    </>
  ),
  bug: (
    <>
      <ellipse cx="32" cy="37" rx="12" ry="16" fill={W} />
      <circle cx="32" cy="17" r="6" />
      <path d="M32 23v30M20 31l-9-4M20 39H9M20 47l-8 5M44 31l9-4M44 39h11M44 47l8 5M29 12l-4-6M35 12l4-6" />
    </>
  ),
  eye: (
    <>
      <path d="M5 32c8-14 46-14 54 0-8 14-46 14-54 0z" fill="#fff" />
      <circle cx="32" cy="32" r="9" fill={O} />
      <circle cx="32" cy="32" r="3.5" fill={K} />
    </>
  ),
  door: (
    <>
      <path d="M14 58V6h36v52" />
      <path d="M18 58V10h28v48" fill={W} />
      <circle cx="40" cy="34" r="2.2" fill={K} />
      <path d="M8 58h48" />
    </>
  ),
  receipt: (
    <>
      <path d="M14 6h36v52l-5-4-5 4-5-4-5 4-5-4-5 4-6-4z" fill="#fff" />
      <path d="M20 16h24M20 24h24M20 32h14" />
      <path d="M20 44h24" strokeWidth="4" />
    </>
  ),
  wallet: (
    <>
      <path d="M12 16 40 8l4 8" />
      <rect x="6" y="16" width="48" height="37" rx="5" fill={W} />
      <path d="M58 26H42a6 6 0 0 0 0 12h16z" fill="#fff" />
      <circle cx="44" cy="32" r="1.8" fill={K} />
    </>
  ),
  bank: (
    <>
      <path d="M6 22 32 8l26 14z" fill={O} />
      <path d="M14 26v20M26 26v20M38 26v20M50 26v20" strokeWidth="3.4" />
      <path d="M8 48h48v6H8z" fill={W} />
    </>
  ),
  database: (
    <>
      <path d="M12 14v34c0 3.3 9 6 20 6s20-2.7 20-6V14" fill={W} />
      <ellipse cx="32" cy="14" rx="20" ry="6" fill="#fff" />
      <path d="M12 26c0 3.3 9 6 20 6s20-2.7 20-6M12 37c0 3.3 9 6 20 6s20-2.7 20-6" />
    </>
  ),
  sheet: (
    <>
      <rect x="8" y="10" width="48" height="44" rx="2" fill="#fff" />
      <path d="M8 10h48v10H8z" fill={G} />
      <path d="M8 20h48M8 31h48M8 42h48M22 10v44M39 10v44" />
      <path d="M39 31h17v11H39z" fill={O} />
    </>
  ),
  stamp: (
    <>
      <path d="M26 7h12v12H26z" fill={W} />
      <path d="M18 19h28v9H18z" />
      <rect x="11" y="37" width="42" height="17" rx="2" stroke={O} />
      <text x="32" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill={O} stroke="none" fontFamily="inherit">PAID</text>
    </>
  ),
  tag: (
    <>
      <path d="M10 30 30 10h24v24L34 54z" fill={Y} />
      <circle cx="46" cy="18" r="3" fill="#fff" />
      <path d="M27 38v-10l7 10V28M25 32h11" />
    </>
  ),
  qr: (
    <>
      <path d="M8 8h16v16H8zM40 8h16v16H40zM8 40h16v16H8z" />
      <path d="M12 12h8v8h-8zM44 12h8v8h-8zM12 44h8v8h-8z" fill={K} />
      <path d="M30 8h4v4h-4zM30 20h4v8h-4zM40 30h6v4h-6zM30 36h8v4h-8zM46 40h10v6H46zM40 50h4v6h-4zM50 50h6v6h-6z" fill={O} />
    </>
  ),
  rocket: (
    <>
      <path d="M32 5c10 8 14 20 12 37H20c-2-17 2-29 12-37z" fill="#fff" />
      <circle cx="32" cy="23" r="5" fill={W} />
      <path d="m20 33-8 12 8-2M44 33l8 12-8-2" />
      <path d="m26 43 6 15 6-15" fill={O} />
    </>
  ),
  flag: (
    <>
      <path d="M14 6v52" />
      <path d="M14 8h34l-6 10 6 10H14z" fill={O} />
      <path d="M8 58h14" />
    </>
  ),
  hourglass: (
    <>
      <path d="M14 6h36M14 58h36" />
      <path d="M18 6c0 16 12 20 12 26s-12 10-12 26M46 6c0 16-12 20-12 26s12 10 12 26" />
      <path d="M22 56c2-6 8-8 10-8s8 2 10 8z" fill={Y} />
      <path d="M32 33v8" />
    </>
  ),
  plug: (
    <>
      <path d="M27 24V12M37 24V12" strokeWidth="3.4" />
      <rect x="21" y="24" width="22" height="17" rx="3" fill={W} />
      <path d="M32 41c0 10 10 12 18 17" />
    </>
  ),
  bulb: (
    <>
      <path d="M24 41c-7-5-10-12-8-20a16 16 0 0 1 32 0c2 8-1 15-8 20v5H24z" fill={Y} />
      <path d="M25 50h14M27 55h10" />
      <path d="M32 3v3M9 13l3 2M55 13l-3 2" />
    </>
  ),
  map: (
    <>
      <path d="M6 14 22 8l20 6 16-6v42l-16 6-20-6-16 6z" fill="#fff" />
      <path d="M22 8v42M42 14v42" />
      <path d="M12 42c6-2 8-12 16-12s10 6 18-2" strokeDasharray="3 4" stroke={O} />
    </>
  ),
  gift: (
    <>
      <rect x="10" y="27" width="44" height="29" rx="2" fill={W} />
      <rect x="7" y="19" width="50" height="9" rx="2" fill={O} />
      <path d="M32 19v37" />
      <path d="M32 19c-7-11-17-7-11 0M32 19c7-11 17-7 11 0" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="17" width="56" height="29" rx="6" fill={Y} />
      <path d="M10 22h10v9H10zM24 22h10v9H24zM38 22h10v9H38z" fill="#fff" />
      <path d="M4 36h56" strokeWidth="4" />
      <circle cx="16" cy="48" r="5" fill="#fff" />
      <circle cx="48" cy="48" r="5" fill="#fff" />
    </>
  ),
  generator: (
    <>
      <path d="M10 18h44M10 52h44M10 18v34M54 18v34" strokeWidth="3.4" />
      <rect x="15" y="23" width="34" height="24" rx="3" fill={Y} />
      <circle cx="26" cy="35" r="5" fill="#fff" />
      <path d="M36 30h8M36 36h8M36 42h5" />
      <path d="M48 18v-7h4" />
    </>
  ),
  chain: (
    <>
      <path d="M27 37a8 8 0 0 1 0-11l7-7a8 8 0 0 1 11 11l-3 3" strokeWidth="3.4" />
      <path d="M37 27a8 8 0 0 1 0 11l-7 7a8 8 0 0 1-11-11l3-3" strokeWidth="3.4" stroke={O} />
    </>
  ),
  code: (
    <>
      <path d="M22 17 8 32l14 15M42 17l14 15-14 15" strokeWidth="3.4" />
      <path d="M36 12 28 52" stroke={O} strokeWidth="3.4" />
    </>
  ),
  puzzle: <path d="M12 20h12a6 6 0 1 1 12 0h14v13a6 6 0 1 0 0 12v11H12V45a6 6 0 1 1 0-12z" fill={W} />,
  target: (
    <>
      <circle cx="30" cy="34" r="22" fill="#fff" />
      <circle cx="30" cy="34" r="14" />
      <circle cx="30" cy="34" r="6" fill={O} />
      <path d="m30 34 24-24M47 10h7v7" />
    </>
  ),
  board: (
    <>
      <rect x="6" y="9" width="52" height="34" rx="2" fill="#2f4a3a" />
      <path d="M13 19h22M13 27h30M13 35h14" stroke="#fff" />
      <path d="M18 43l-6 15M46 43l6 15M32 43v8" />
    </>
  ),
  warning: (
    <>
      <path d="M32 7 59 55H5z" fill={Y} />
      <path d="M32 24v15" strokeWidth="3.6" />
      <circle cx="32" cy="47" r="2.4" fill={K} />
    </>
  ),
  check: (
    <>
      <circle cx="32" cy="32" r="24" fill={G} />
      <path d="m21 33 8 8 15-17" strokeWidth="4" />
    </>
  ),
  cross: (
    <>
      <circle cx="32" cy="32" r="24" fill="#ffe3dc" />
      <path d="m23 23 18 18M41 23 23 41" strokeWidth="4" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="32" cy="46" rx="17" ry="6" fill={Y} />
      <path d="M15 46v-8M49 46v-8" />
      <ellipse cx="32" cy="38" rx="17" ry="6" fill={Y} />
      <path d="M15 38v-8M49 38v-8" />
      <ellipse cx="32" cy="30" rx="17" ry="6" fill={Y} />
      <path d="M28 33v-6l6 6v-6" />
    </>
  ),
  gate: (
    <>
      <path d="M6 14h8v44H6zM50 14h8v44h-8z" fill={W} />
      <path d="M14 22h36M14 34h36M14 46h36M23 22v32M32 22v32M41 22v32" />
      <path d="M4 14h12M48 14h12" strokeWidth="3.4" />
    </>
  ),
  meter: (
    <>
      <rect x="13" y="7" width="38" height="50" rx="4" fill="#fff" />
      <rect x="18" y="13" width="28" height="12" rx="1.5" fill={G} />
      <path d="M22 19h3M28 19h3M34 19h3M40 19h2" />
      <circle cx="23" cy="33" r="1.6" fill={K} />
      <circle cx="32" cy="33" r="1.6" fill={K} />
      <circle cx="41" cy="33" r="1.6" fill={K} />
      <circle cx="23" cy="41" r="1.6" fill={K} />
      <circle cx="32" cy="41" r="1.6" fill={K} />
      <circle cx="41" cy="41" r="1.6" fill={K} />
      <circle cx="32" cy="50" r="2.5" fill={O} />
    </>
  ),
  pot: (
    <>
      <path d="M10 27h44v18a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10z" fill={W} />
      <path d="M6 27h52M4 33h6M54 33h6" />
      <path d="M24 20c0-4 4-4 4-8M32 20c0-4 4-4 4-8M40 20c0-4 4-4 4-8" />
    </>
  ),
  water: (
    <>
      <path d="M14 14h36l-4 40H18z" fill="#fff" />
      <path d="M16 30h32l-2 24H18z" fill="#cfe8ff" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type Glyph = keyof typeof glyphs;
