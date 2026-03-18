"use client";
import { useState, useEffect, useRef } from "react";

const BLUE = "#1e40af";
const BLUE_L = "#2563eb";
const DARK = "#0f172a";
const BG = "#f8fafc";
const WHITE = "#ffffff";
const BORDER = "#e2e8f0";
const T1 = "#1e293b";
const T2 = "#64748b";
const T3 = "#94a3b8";
const SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)";
const SHADOW_MD = "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)";

const FOUNDER_IMG = {
  VS: "https://media.licdn.com/dms/image/v2/D5603AQFnVv7ZC-7IbQ/profile-displayphoto-crop_800_800/B56Zj0dwjxHMAU-/0/1756448099488?e=1775692800&v=beta&t=mxJCAAV3GRZ57p9Qz-kwy5JbFcFOdnSgENhFrZCuWUk",
  PK: "https://media.licdn.com/dms/image/v2/D4D03AQH2euhHgPN0Hw/profile-displayphoto-crop_800_800/B4DZg3CmJ_GQAI-/0/1753270087786?e=1775692800&v=beta&t=zlvB39BzIG2QtyUA9y1WnHJ0IBZBDNrRdrD2CovnsNw",
  LOGO: "https://media.licdn.com/dms/image/v2/D4E0BAQHm9DpoFlZFRA/company-logo_200_200/company-logo_200_200/0/1722409452704/celebso_logo?e=2147483647&v=beta&t=kJpje4OQHM8q6iwGSUJomXYAEaKe3CNBdkFyyrwK3Aw",
};

function ProfileImg({ src, size = 48, alt = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid " + BORDER }}
    />
  );
}

function Avatar({ initials, size = 48, bg }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ borderRadius: 8, flexShrink: 0 }}>
      <rect width="48" height="48" fill={bg || "url(#avGrad)"} rx="8" />
      <defs><linearGradient id="avGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e40af"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs>
      <text x="24" y="25" textAnchor="middle" dominantBaseline="middle" fill="#fff" style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>{initials}</text>
    </svg>
  );
}

const Icon = {
  home: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  video: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  calendar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  trending: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  server: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  globe: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  database: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  layout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  play: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  link: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  dollar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  pen: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  github: <svg width="16" height="16" viewBox="0 0 24 24" fill="#181717"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  reactNative: <svg width="16" height="16" viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.2C4.7 2.4 4.025 4.644 4.37 7.634c-2.56.966-4.37 2.342-4.37 3.89 0 1.55 1.82 2.937 4.39 3.905-.354 3.005.326 5.258 1.878 6.127.248.14.533.21.846.21 1.347 0 3.11-.96 4.89-2.625 1.78 1.655 3.54 2.605 4.886 2.605.31 0 .596-.07.848-.21 1.553-.87 2.233-3.12 1.879-6.126 2.56-.97 4.373-2.356 4.373-3.906 0-1.55-1.82-2.933-4.39-3.896.354-3-.326-5.245-1.878-6.115a1.688 1.688 0 00-.848-.208zM16.1 2.89c.84.47 1.24 2.09.96 4.267a17.991 17.991 0 00-2.207-.46 18.22 18.22 0 00-1.444-1.837c1.55-1.476 2.96-2.2 3.69-2.2.12 0 .22.027.308.075zM12 8.01a18.21 18.21 0 011.502 1.794A18.42 18.42 0 0112 9.65a17.623 17.623 0 01-1.502.154A18.21 18.21 0 0112 8.01zm-4.1-5.12c.12-.05.23-.075.31-.075.73 0 2.14.725 3.69 2.2a18.22 18.22 0 00-1.444 1.837 17.991 17.991 0 00-2.207.46c-.28-2.177.12-3.797.96-4.267zM2.54 11.526c0-.81 1.27-1.832 3.387-2.594.24.844.56 1.727.95 2.63a17.9 17.9 0 00-.96 2.647c-2.1-.76-3.377-1.78-3.377-2.583zm5.46 6.584c-.84-.47-1.24-2.09-.96-4.267.69.12 1.43.21 2.207.46a18.22 18.22 0 001.444 1.837c-1.55 1.476-2.96 2.2-3.69 2.2a.612.612 0 01-.31-.075zm3.998-1.9A18.42 18.42 0 0112 14.35c.517.07 1.018.12 1.502.154A18.21 18.21 0 0112 16.3a18.21 18.21 0 01-1.502-1.79zm5.9 1.9a.612.612 0 01-.308.075c-.73 0-2.14-.725-3.69-2.2a18.22 18.22 0 001.444-1.837c.777-.25 1.517-.34 2.207-.46.28 2.177-.12 3.797-.96 4.267zm1.56-4.38a17.9 17.9 0 00-.96-2.647c.39-.903.71-1.786.95-2.63 2.117.762 3.387 1.784 3.387 2.594 0 .804-1.277 1.824-3.377 2.583z"/></svg>,
  nextjs: <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361l4.734 7.171 1.9 2.878.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/></svg>,
  nodejs: <svg width="16" height="16" viewBox="0 0 24 24" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.921a.282.282 0 00-.137-.242l-8.791-5.072a.278.278 0 00-.271 0L3.075 6.68a.284.284 0 00-.139.241v10.15a.27.27 0 00.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 01-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.075.242a1.924 1.924 0 011.846 0l8.794 5.076c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 01-.924 1.604l-8.794 5.078c-.28.163-.6.247-.923.247z"/></svg>,
  postgresql: <svg width="16" height="16" viewBox="0 0 24 24" fill="#4169E1"><path d="M23.557 17.1a.476.476 0 00-.39-.242h-.001c-.207 0-.392.136-.512.183-.444.173-.838.26-1.172.26-.748 0-1.083-.462-1.175-.667.737-1.42 1.345-3.05 1.725-4.58.202-.81.332-1.552.39-2.206.085-.963-.09-1.662-.52-2.074-.378-.363-.896-.437-1.32-.437-.15 0-.29.01-.41.028.004-.123.007-.248.007-.374 0-.76-.092-1.478-.258-2.137C19.275 2.303 16.468 0 12.85 0 10.76 0 9.122.646 8.003 1.204 6.57.483 5.115.155 3.99.155c-1.432 0-2.413.542-2.686.752C.565 1.457.061 2.476 0 3.883c-.02.481.008.97.084 1.523.138 1.003.472 2.121.993 3.324.61 1.409 1.317 2.601 2.035 3.337-.08.354-.114.716-.1 1.081.047 1.231.48 2.254 1.29 2.997.27.247.578.435.877.593-.062.338-.102.683-.107 1.04-.024 1.565.62 2.8 1.91 3.673 1.088.736 2.476 1.102 3.744 1.493.42.13.85.263 1.275.409-.063.208-.078.444-.044.694.11.798.55 1.413 1.276 1.78a4.06 4.06 0 001.82.459h.024c.554 0 1.124-.113 1.37-.173.51-.123.878-.282 1.312-.476.244-.109.505-.266.748-.44.16.083.35.14.574.162.166.016.35.024.544.024.88 0 2.013-.175 2.68-.482 1.13-.522 1.756-1.258 1.756-2.072 0-.085-.007-.168-.02-.248a1.87 1.87 0 00.193-.395c.275-.7.367-1.627.367-2.312 0-.122-.004-.234-.01-.333l.023-.012c.758-.394 1.19-.803 1.3-1.227.05-.19.03-.383-.06-.538z"/></svg>,
  mongodb: <svg width="16" height="16" viewBox="0 0 24 24" fill="#47A248"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/></svg>,
  redis: <svg width="16" height="16" viewBox="0 0 24 24" fill="#DC382D"><path d="M10.5 2.661l.54.997-1.797.644 2.409.218.582 1.054 1.075-1.197 2.455.344-1.498-.893.583-1.036-1.832.51-1.517-.64zm-1.593 6.182L2.072 5.8l6.835 3.043zm5.027-1.267l6.15 2.26-6.15-2.26zm-5.624 3.194l6.835-3.042-6.835 3.042zM12 0C5.372 0 0 3.343 0 7.468 0 11.593 5.372 14.937 12 14.937S24 11.593 24 7.468C24 3.343 18.627 0 12 0z"/></svg>,
  aws: <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF9900"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.374 6.18 6.18 0 01-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.256-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.064-.583.16-.863.28a2.068 2.068 0 01-.248.104.39.39 0 01-.128.024c-.112 0-.168-.08-.168-.248v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36A4.84 4.84 0 015.39 5.14c.766 0 1.326.174 1.692.525.358.35.535.886.535 1.604v2.117zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.656.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.152 0 .256.024.32.08.063.048.111.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.024.32.08.064.048.12.16.152.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.32-.08h.743c.128 0 .2.064.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 01-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.239-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.215a.492.492 0 01-.048-.224v-.407c0-.167.064-.248.183-.248.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.28.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.336-.479.575-.654.24-.184.51-.32.83-.415A3.61 3.61 0 0118.326 5c.215 0 .438.016.67.04.224.032.438.08.63.136.184.056.344.12.486.2.144.08.248.16.312.24.063.072.112.152.144.239.024.08.04.176.04.296v.375c0 .168-.064.256-.184.256a.87.87 0 01-.319-.12 3.87 3.87 0 00-1.63-.336c-.454 0-.814.072-1.062.223a.754.754 0 00-.375.671c0 .24.088.44.264.6.176.159.494.319.95.478l1.133.36c.574.183.99.44 1.237.766.247.327.375.702.375 1.118 0 .344-.072.663-.207.95a2.16 2.16 0 01-.59.735c-.255.207-.558.36-.91.463-.36.111-.742.167-1.158.167z"/><path d="M21.698 16.548c-2.678 1.975-6.56 3.023-9.901 3.023-4.685 0-8.907-1.733-12.098-4.617-.25-.227-.024-.535.276-.36C3.3 16.61 7.503 17.93 11.859 17.93c2.981 0 6.243-.614 9.254-1.893.454-.191.83.3.385.511z"/><path d="M22.74 15.35c-.343-.438-2.264-.207-3.129-.103-.264.032-.303-.199-.063-.367 1.533-1.078 4.04-.767 4.334-.406.295.367-.08 2.89-1.517 4.095-.22.183-.43.088-.335-.159.327-.806 1.052-2.622.71-3.06z"/></svg>,
  docker: <svg width="16" height="16" viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>,
  elasticsearch: <svg width="16" height="16" viewBox="0 0 24 24" fill="#005571"><path d="M13.394 0C8.37 0 4.126 3.373 2.727 7.91h15.507a4.263 4.263 0 003.188-1.432l.004-.005A11.916 11.916 0 0013.394 0zM1.87 10.236A12.004 12.004 0 001.5 12c0 .619.049 1.23.132 1.83h13.034a3.095 3.095 0 000-3.594zm.857 5.83C4.126 20.626 8.37 24 13.394 24a11.916 11.916 0 008.032-6.474l-.004-.004a4.263 4.263 0 00-3.188-1.432z"/></svg>,
  socketio: <svg width="16" height="16" viewBox="0 0 24 24" fill="#010101"><path d="M11.998 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zM12 3.6a8.4 8.4 0 100 16.8 8.4 8.4 0 000-16.8zm2.832 5.856L10.56 14.64l4.272-5.184z"/></svg>,
  terraform: <svg width="16" height="16" viewBox="0 0 24 24" fill="#7B42BC"><path d="M1.5 0v7.5l6.5 3.75v-7.5L1.5 0zm8 4.25v7.5l6.5 3.75v-7.5L9.5 4.25zm0 11.5v7.5l6.5-3.75v-7.5l-6.5 3.75zM16.5 8v7.5L23 11.75V4.25L16.5 8z"/></svg>,
};

function SH({ label, num }) {
  return (<div style={{ marginBottom: 40 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: BLUE + "08", borderRadius: 20, marginBottom: 10 }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>{String(num).padStart(2, "0")}</span>
      <span style={{ width: 1, height: 12, background: BLUE + "30" }} />
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
    </div>
  </div>);
}

function Card({ children, style: s }) {
  return <div style={{ background: WHITE, border: "1px solid " + BORDER, borderRadius: 10, padding: 28, boxShadow: SHADOW, ...s }}>{children}</div>;
}

function PBox({ x, y, w, h, label, sub, fill }) {
  return (<g>
    <rect x={x} y={y} width={w} height={h} fill={fill||"#fff"} stroke="#334155" strokeWidth={0.75} rx={3} />
    <text x={x+w/2} y={y+(sub?h/2-5:h/2+1)} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: sub?10:9.5, fontWeight:"600", fill:"#1e293b", fontFamily:"'DM Sans',sans-serif" }}>{label}</text>
    {sub && <text x={x+w/2} y={y+h/2+9} textAnchor="middle" dominantBaseline="middle" style={{ fontSize:8, fill:"#64748b", fontFamily:"'DM Sans',sans-serif" }}>{sub}</text>}
  </g>);
}
function PArrow({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth={0.75} markerEnd="url(#pa)" />;
}

function S_Cover() {
  return (<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px", position: "relative", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)" }}>
    <img src="/vectors/partnership.png" alt="" style={{ position: "absolute", right: 40, bottom: 60, width: 340, opacity: 0.85, pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: 36, left: 56, display: "flex", alignItems: "center", gap: 16 }}>
      <img src={FOUNDER_IMG.LOGO} alt="Celebso" width={32} height={32} style={{ borderRadius: 6 }} />
      <span style={{ fontWeight: 800, fontSize: 22, color: DARK, letterSpacing: "-0.5px" }}>CELEBSO</span>
      <span style={{ fontSize: 9, color: WHITE, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, background: DARK, padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>CONFIDENTIAL</span>
    </div>
    <div style={{ maxWidth: 740, position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>Technical Proposal & Development Partnership</div>
      <h1 style={{ fontSize: 52, fontWeight: 800, color: DARK, lineHeight: 1.06, margin: "0 0 24px 0", letterSpacing: "-2.5px" }}>
        Building India's Stage for<br/>100 Million+ <span style={{ color: BLUE_L }}>Dreamers</span>
      </h1>
      <p style={{ fontSize: 16, color: T2, lineHeight: 1.8, maxWidth: 560, margin: "0 0 52px 0" }}>
        A comprehensive technical blueprint and development partnership proposal for Celebso — where LinkedIn meets Instagram, purpose-built for India's creator and startup ecosystem.
      </p>
      <div style={{ display: "flex", gap: 36, marginBottom: 48, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ProfileImg src={FOUNDER_IMG.VS} size={52} alt="Er. Veer Singh" />
          <div><div style={{ fontSize: 14, fontWeight: 700, color: T1 }}>Er. Veer Singh</div><div style={{ fontSize: 12, color: T2 }}>Founder & CEO, Celebso</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ProfileImg src={FOUNDER_IMG.PK} size={52} alt="Pradeep Kumar Bijarniya" />
          <div><div style={{ fontSize: 14, fontWeight: 700, color: T1 }}>Pradeep Kumar Bijarniya</div><div style={{ fontSize: 12, color: T2 }}>Co-Founder, Celebso & Ooglesoft</div></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, paddingTop: 32, borderTop: "1px solid " + BORDER }}>
        {[{l:"Prepared By",v1:"Uddit",v2:"AI Engineer & Full Stack Developer"},{l:"Date",v1:"18 March 2026",v2:"REF: CBL-2026-0318"},{l:"Company Profile",v1:"https://www.linkedin.com/company/celebso/",v2:"www.celebso.com"}].map((d,i)=>(<div key={i}><div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:T3,textTransform:"uppercase",marginBottom:6}}>{d.l}</div><div style={{fontSize:14,fontWeight:600,color:T1}}>{d.v1}</div><div style={{fontSize:12,color:T2,marginTop:2}}>{d.v2}</div></div>))}
      </div>
    </div>
  </div>);
}

function S_Alignment() {
  const quotes = [
    {author:"Er. Veer Singh",role:"Founder & CEO",img:FOUNDER_IMG.VS,text:"Celebso is not just a platform. It's a movement. In a world where talent struggles to be seen, Celebso is being built to change the spotlight.",date:"Mar 2026",src:"LinkedIn Post"},
    {author:"Celebso X",role:"Company LinkedIn Page",img:FOUNDER_IMG.LOGO,text:"Find the right co-founder, investors and build valuable industry connections. The world's first social media platform designed to seamlessly connect entrepreneurs, co-founders, and investors.",date:"Mar 2025",src:"Company Page"},
    {author:"Er. Veer Singh",role:"Founder & CEO",img:FOUNDER_IMG.VS,text:"In the new Work-Based Economy, Celebso is your launchpad. Show your skills. Get noticed. Become a star. Not just looks. Not just likes. Real Work = Real Fame.",date:"Aug 2025",src:"LinkedIn Post"},
    {author:"Pradeep Kumar Bijarniya",role:"Co-Founder, Ooglesoft & Celebso",img:FOUNDER_IMG.PK,text:"Not long ago, Celebso was just a vision — a platform where entrepreneurs, investors, creators, and brands could come together. We didn't just build a brand. We built a belief system.",date:"Aug 2025",src:"LinkedIn Post"},
  ];
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Vision Alignment" num={1} />
    <div style={{ marginBottom: 36, textAlign: "center" }}>
      <img src="/vectors/community.png" alt="Celebso Creator Ecosystem" style={{ width: "100%", maxWidth: 700, opacity: 0.9 }} />
    </div>
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", lineHeight: 1.2, letterSpacing: "-1px" }}>We've Studied Your Journey. We Understand Your Vision.</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 40px 0" }}>Before writing a single line of code, we conducted a thorough audit of Celebso's public presence, founder communications, community-building efforts, and strategic positioning over the past 12+ months. What we found was not just a product concept — but a deeply held conviction to democratize opportunity for India's creators and entrepreneurs.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {quotes.map((q,i)=>(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
        <img src={q.img} alt={q.author} width={42} height={42} style={{ borderRadius: "50%", objectFit: "cover", border: "1.5px solid " + BORDER }} />
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:T1}}>{q.author}</div><div style={{fontSize:11,color:T2,marginTop:1}}>{q.role}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:11,fontWeight:600,color:BLUE,fontFamily:"'JetBrains Mono',monospace"}}>{q.date}</div><div style={{fontSize:10,color:T3}}>{q.src}</div></div>
      </div><p style={{fontSize:14,color:T1,lineHeight:1.75,margin:0,fontStyle:"italic",borderLeft:"3px solid "+BLUE,paddingLeft:18}}>"{q.text}"</p></Card>))}
    </div>
    <Card style={{marginTop:28,background:"#f0f4ff",borderColor:BLUE+"25"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
        <span style={{color:BLUE,marginTop:2}}>{Icon.check}</span>
        <div><div style={{fontSize:14,fontWeight:700,color:BLUE,marginBottom:6}}>Our Commitment</div>
        <p style={{fontSize:14,color:T1,lineHeight:1.75,margin:0}}>Your team has been building community, hosting founder meetups, and articulating this vision for over a year. We are here to translate that conviction into production-grade infrastructure. Every technical decision in this proposal is rooted in your vision.</p></div>
      </div>
    </Card>
  </div>);
}

function S_Market() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Market Landscape" num={2} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>The White Space Celebso Fills</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 40px 0" }}>India's creator economy is projected to exceed $100 billion by decade's end. Yet no single platform unifies content creation, professional networking, community building, and event discovery.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 40 }}>
      {[{m:"$100B+",l:"Creator economy by 2030"},{m:"100M+",l:"Creators in India"},{m:"900M+",l:"Internet users"},{m:"Zero",l:"Platforms merging LinkedIn + Instagram for India"}].map((d,i)=>(<Card key={i} style={{padding:24}}><div style={{fontSize:30,fontWeight:800,color:BLUE,letterSpacing:"-1px"}}>{d.m}</div><div style={{fontSize:12,color:T2,marginTop:6,lineHeight:1.5}}>{d.l}</div></Card>))}
    </div>
    <Card><div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:20}}>Competitive Landscape</div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr style={{borderBottom:"2px solid "+DARK}}>
      {["Platform","Focus","Gap Celebso Fills"].map(h=><th key={h} style={{textAlign:"left",padding:"12px 14px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",color:DARK}}>{h}</th>)}
    </tr></thead><tbody>
      {[["LinkedIn","Professional networking","No creator content, no video, not built for India's vernacular talent"],["Instagram","Visual content & reels","No professional networking, no community structure, no events"],["ShareChat / Moj","Regional short-form video","Entertainment-only, no professional or startup layer"],["TagMango","Creator monetization","Tool-based, not a social platform"],["Kofluence","Brand-creator matching","B2B marketplace, not consumer social"]].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid "+BORDER, background: i%2===0 ? "#f8fafc" : WHITE}}>{r.map((c,j)=><td key={j} style={{padding:"14px",color:j===0?T1:T2,fontWeight:j===0?600:400}}>{c}</td>)}</tr>))}
    </tbody></table></Card>
  </div>);
}

function S_Product() {
  const f=[{icon:Icon.layout,t:"Categorized Content Feed",d:"Music, comedy, tech, startups, art — each with trending. AI-driven ranking surfaces emerging talent by category. Filter-based navigation."},{icon:Icon.play,t:"Video & Reels Engine",d:"Short-form reels, long-form video, images, text. Vertical swipe player. HLS adaptive bitrate (240p-1080p). Per-reel analytics."},{icon:Icon.users,t:"Community Layer",d:"Discoverable communities — AI builders, filmmakers, hip-hop. Any founder can create. Activity feeds, member directories, moderation, event hosting."},{icon:Icon.calendar,t:"Events Ecosystem",d:"Event listing, RSVP, attendee profiles, community-hosted events. Search by category, city, price. Calendar integration."},{icon:Icon.trending,t:"Creator Hub & Profiles",d:"Portfolio, skill tags, collaboration history, endorsements. Verified badges. Content analytics dashboard."},{icon:Icon.zap,t:"Founder & Startup Hub",d:"Event/community pages by founders. Co-founder discovery, investor connections. DMs for collaboration."}];
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Product Blueprint" num={3} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Where LinkedIn Meets Instagram — Purpose-Built for India</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 40px 0" }}>One platform: create content, build following, join communities, attend events, grow career.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 36 }}>
      {[{src:"/vectors/content-feed.png",label:"Categorized Content Feed",desc:"Music, Tech, Comedy, Art — category tabs with curated content cards"},{src:"/vectors/reels-player.png",label:"Video & Reels Player",desc:"Vertical swipe player with adaptive bitrate HLS streaming"},{src:"/vectors/creator-profile.png",label:"Creator Profiles",desc:"Portfolio with skill tags, verified badge, and content grid"}].map((v,i)=>(<Card key={i} style={{textAlign:"center",padding:20}}>
        <img src={v.src} alt={v.label} style={{width:"100%",maxWidth:180,margin:"0 auto 16px",display:"block"}} />
        <div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:4}}>{v.label}</div>
        <div style={{fontSize:11,color:T2,lineHeight:1.5}}>{v.desc}</div>
      </Card>))}
    </div>
    <Card style={{marginBottom:32,background:"#f0f4ff",borderColor:BLUE+"20"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{color:BLUE}}>{Icon.layout}</span><span style={{fontSize:13,fontWeight:700,color:BLUE}}>Existing App Reference — Mobile Screens (From Celebso Current Build)</span></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14}}>
        {["Profile — Creator portfolio with posts, reels, events, live tabs. Stats: posts, followers, following, crowns.","Navigation — Profile, Massage, Calendar, Bookmark, Contact, Settings, Community, Celebso Pro.","Reels Tab — Vertical video feed. Discover People widget. Category content.","Events — Category, Location, Price filters. Cards with attendance count.","Live — Real-time streaming for creators and community events."].map((d,i)=>(<div key={i} style={{fontSize:11,color:T1,lineHeight:1.6,padding:12,background:WHITE,border:"1px solid "+BORDER,borderRadius:6,boxShadow:SHADOW}}><div style={{fontWeight:700,marginBottom:6,color:BLUE,fontSize:10,fontFamily:"'JetBrains Mono',monospace"}}>Screen {i+1}</div>{d}</div>))}
      </div>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
      {f.map((feat,i)=>(<Card key={i} style={{borderLeft:"3px solid "+BLUE}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{color:BLUE}}>{feat.icon}</span><span style={{fontSize:10,fontWeight:600,color:BLUE,fontFamily:"'JetBrains Mono',monospace"}}>F-{String(i+1).padStart(2,"0")}</span></div>
        <div style={{fontSize:15,fontWeight:700,color:DARK,marginBottom:8}}>{feat.t}</div>
        <p style={{fontSize:12,color:T2,lineHeight:1.7,margin:0}}>{feat.d}</p>
      </Card>))}
    </div>
  </div>);
}

function S_Arch() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="System Architecture" num={4} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Production-Grade System Architecture</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 36px 0" }}>Horizontal scalability, low-latency content delivery, millions of concurrent users.</p>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 1 — HIGH-LEVEL SYSTEM ARCHITECTURE</div>
      <svg viewBox="0 0 880 720" style={{width:"100%",maxWidth:880}}>
        <defs>
          <marker id="pa" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155" /></marker>
        </defs>
        {/* === CLIENT LAYER 101 === */}
        <rect x={20} y={10} width={540} height={95} fill="none" stroke="#334155" strokeWidth={1.2} rx={0} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Client Layer 101</text>
        <PBox x={30} y={34} w={120} h={36} label="iOS App 101A" sub="React Native" />
        <PBox x={158} y={34} w={120} h={36} label="Android App 101B" sub="React Native" />
        <PBox x={286} y={34} w={130} h={36} label="Web Application 101C" sub="Next.js / React" />
        <PBox x={424} y={34} w={126} h={36} label="Admin Panel 101D" sub="React + Tailwind" />
        <text x={30} y={88} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>User Devices: Mobile, Desktop, Tablet Browsers</text>

        {/* === CDN 102 === */}
        <rect x={600} y={10} width={260} height={95} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={26} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Content Delivery 102</text>
        <PBox x={610} y={34} w={240} h={36} label="AWS CloudFront CDN 102A" sub="30+ Indian Edge PoPs" />
        <text x={610} y={88} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Static Assets, HLS Video, Image WebP</text>

        {/* Arrows from clients to gateway */}
        <PArrow x1={290} y1={105} x2={290} y2={125} />
        <PArrow x1={730} y1={105} x2={730} y2={125} />
        <line x1={290} y1={115} x2={730} y2={115} stroke="#334155" strokeWidth={0.5} strokeDasharray="4,3" />

        {/* === API GATEWAY + WAF 103 === */}
        <rect x={20} y={125} width={840} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={141} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>API Gateway + Security Layer 103</text>
        <PBox x={30} y={149} w={150} h={32} label="AWS API Gateway 103A" sub="REST + GraphQL" />
        <PBox x={188} y={149} w={120} h={32} label="WAF 103B" sub="DDoS + IP Filter" />
        <PBox x={316} y={149} w={120} h={32} label="Rate Limiter 103C" sub="Throttling" />
        <PBox x={444} y={149} w={140} h={32} label="JWT Validator 103D" sub="Auth + Token Verify" />
        <PBox x={592} y={149} w={130} h={32} label="Route 53 DNS 103E" sub="Failover + Health" />
        <PBox x={730} y={149} w={120} h={32} label="Load Balancer 103F" sub="ALB Round Robin" />

        <PArrow x1={430} y1={205} x2={430} y2={228} />

        {/* === MICROSERVICES 104 === */}
        <rect x={20} y={228} width={840} height={118} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={244} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Microservices Layer 104 — AWS ECS Fargate</text>
        <PBox x={30} y={252} w={115} h={44} label="User Service 104A" sub="Auth + Profiles" />
        <PBox x={153} y={252} w={115} h={44} label="Feed Service 104B" sub="Algo + Ranking" />
        <PBox x={276} y={252} w={115} h={44} label="Video Service 104C" sub="Upload + HLS" />
        <PBox x={399} y={252} w={115} h={44} label="Community 104D" sub="Groups + Chat" />
        <PBox x={522} y={252} w={105} h={44} label="Event Svc 104E" sub="RSVP + Listing" />
        <PBox x={635} y={252} w={105} h={44} label="Search Svc 104F" sub="Full-Text Index" />
        <PBox x={748} y={252} w={102} h={44} label="Notify Svc 104G" sub="Push + Email" />
        <PBox x={30} y={304} w={115} h={32} label="Analytics 104H" sub="Metrics + Dashboards" />
        <PBox x={153} y={304} w={115} h={32} label="Chat Svc 104I" sub="WebSocket + DM" />
        <PBox x={276} y={304} w={115} h={32} label="Creator Hub 104J" sub="Portfolio + Badges" />
        <PBox x={399} y={304} w={115} h={32} label="Moderation 104K" sub="AI + Manual Review" />
        <text x={530} y={325} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Each service: Docker Container, Auto-Scale 2-20 instances</text>

        <PArrow x1={430} y1={346} x2={430} y2={370} />

        {/* === MESSAGE QUEUE 105 === */}
        <rect x={20} y={370} width={540} height={75} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={386} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Event Bus + Message Queue 105</text>
        <PBox x={30} y={394} w={160} h={36} label="Apache Kafka 105A" sub="Async Event Stream" />
        <PBox x={198} y={394} w={160} h={36} label="AWS SQS 105B" sub="Task Queue" />
        <PBox x={366} y={394} w={184} h={36} label="AWS SNS 105C" sub="Pub/Sub Notifications" />

        {/* === CACHING LAYER 106 === */}
        <rect x={600} y={370} width={260} height={75} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={386} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Cache Layer 106</text>
        <PBox x={610} y={394} w={120} h={36} label="Redis Cluster 106A" sub="Sessions + Feed" />
        <PBox x={738} y={394} w={112} h={36} label="Edge Cache 106B" sub="CDN TTL Rules" />

        <PArrow x1={290} y1={445} x2={290} y2={470} />
        <PArrow x1={730} y1={445} x2={730} y2={470} />

        {/* === DATABASE LAYER 107 === */}
        <rect x={20} y={470} width={540} height={110} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={486} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Persistent Data Layer 107</text>
        {/* Database cylinders represented as boxes with sub */}
        <PBox x={30} y={494} w={125} h={40} label="PostgreSQL 107A" sub="Users, Events, Roles" />
        <PBox x={163} y={494} w={125} h={40} label="MongoDB Atlas 107B" sub="Posts, Comments, Feed" />
        <PBox x={296} y={494} w={125} h={40} label="ElasticSearch 107C" sub="Search + Discovery" />
        <PBox x={429} y={494} w={121} h={40} label="TimescaleDB 107D" sub="Analytics Time-Series" />
        <text x={30} y={554} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>PostgreSQL: Multi-AZ, Read Replicas, PgBouncer | MongoDB: Sharded, Replica Set | ES: 3-node cluster</text>

        {/* === OBJECT STORAGE + MEDIA 108 === */}
        <rect x={600} y={470} width={260} height={110} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={486} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Media + Storage 108</text>
        <PBox x={610} y={494} w={240} h={32} label="AWS S3 108A" sub="Raw + Processed Media" />
        <PBox x={610} y={534} w={115} h={32} label="MediaConvert 108B" sub="HLS Transcode" />
        <PBox x={733} y={534} w={117} h={32} label="Rekognition 108C" sub="Content Moderation" />

        <line x1={290} y1={580} x2={290} y2={600} stroke="#334155" strokeWidth={0.75} />
        <line x1={730} y1={580} x2={730} y2={600} stroke="#334155" strokeWidth={0.75} />
        <line x1={290} y1={600} x2={730} y2={600} stroke="#334155" strokeWidth={0.75} />
        <PArrow x1={510} y1={600} x2={510} y2={620} />

        {/* === MONITORING + OBSERVABILITY 109 === */}
        <rect x={20} y={620} width={840} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={636} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Monitoring + Observability Layer 109</text>
        <PBox x={30} y={644} w={150} h={36} label="CloudWatch 109A" sub="Metrics + Alarms" />
        <PBox x={188} y={644} w={150} h={36} label="Prometheus 109B" sub="Grafana Dashboards" />
        <PBox x={346} y={644} w={120} h={36} label="Sentry 109C" sub="Error Tracking" />
        <PBox x={474} y={644} w={130} h={36} label="AWS X-Ray 109D" sub="Distributed Tracing" />
        <PBox x={612} y={644} w={120} h={36} label="PagerDuty 109E" sub="Incident Mgmt" />
        <PBox x={740} y={644} w={110} h={36} label="Log Aggregator 109F" sub="ELK Stack" />

        <text x={440} y={714} textAnchor="middle" style={{fontSize:9,fontWeight:"600",fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>FIG. 1 — Celebso Platform: High-Level System Architecture</text>
      </svg>
    </Card>
    <div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:20}}>Technology Stack</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      {[{c:"Mobile",i:"React Native, Expo, TypeScript",icon:Icon.reactNative},{c:"Frontend Web",i:"Next.js 14+, React, Tailwind CSS",icon:Icon.nextjs},{c:"Backend",i:"Node.js, Express/Fastify, GraphQL",icon:Icon.nodejs},{c:"Databases",i:"PostgreSQL, MongoDB, Redis",icon:Icon.postgresql},{c:"Cloud — AWS",i:"ECS Fargate, S3, CloudFront, RDS, SQS",icon:Icon.aws},{c:"Video Pipeline",i:"MediaConvert, HLS, Adaptive Bitrate",icon:Icon.aws},{c:"Search",i:"ElasticSearch (profiles, content, events)",icon:Icon.elasticsearch},{c:"Real-time",i:"Socket.io, Firebase Push (FCM/APNs)",icon:Icon.socketio},{c:"CI/CD",i:"GitHub Actions, Docker, Terraform",icon:Icon.docker}].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"16px 18px",background:WHITE,border:"1px solid "+BORDER,borderRadius:8,boxShadow:SHADOW}}><span style={{color:BLUE,marginTop:1}}>{t.icon}</span><div><div style={{fontSize:10,fontWeight:700,color:BLUE,letterSpacing:1,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>{t.c}</div><div style={{fontSize:12,color:T1,marginTop:3}}>{t.i}</div></div></div>))}
    </div>
  </div>);
}

function S_Data() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Data & Video Infrastructure" num={5} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Where Every Byte Lives</h2>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 2 — VIDEO / REELS DATA PIPELINE</div>
      <svg viewBox="0 0 880 340" style={{width:"100%",maxWidth:880}}>
        <defs><marker id="pa2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>

        {/* === VIDEO / REELS PIPELINE 201 === */}
        <rect x={20} y={10} width={840} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Video / Reels Pipeline 201</text>
        <PBox x={30} y={34} w={100} h={36} label="User Upload 201A" sub="Video / Reel" />
        <PArrow x1={130} y1={52} x2={148} y2={52} />
        <PBox x={148} y={34} w={100} h={36} label="API Server 201B" sub="Validate + Auth" />
        <PArrow x1={248} y1={52} x2={266} y2={52} />
        <PBox x={266} y={34} w={110} h={36} label="S3 Raw Bucket 201C" sub="ap-south-1" />
        <PArrow x1={376} y1={52} x2={394} y2={52} />
        <PBox x={394} y={34} w={120} h={36} label="MediaConvert 201D" sub="Transcode HLS" />
        <PArrow x1={514} y1={52} x2={532} y2={52} />
        <PBox x={532} y={34} w={120} h={36} label="S3 Processed 201E" sub="240p-1080p ABR" />
        <PArrow x1={652} y1={52} x2={670} y2={52} />
        <PBox x={670} y={34} w={90} h={36} label="CDN 201F" sub="CloudFront Edge" />
        <PArrow x1={760} y1={52} x2={778} y2={52} />
        <PBox x={778} y={34} w={72} h={36} label="User 201G" sub="HLS Player" />
        <text x={30} y={86} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Adaptive bitrate: 240p, 360p, 480p, 720p, 1080p | Avg transcode: 8s per 60s clip | CDN TTFB &lt; 50ms India</text>

        {/* === TEXT + SOCIAL DATA PIPELINE 202 === */}
        <rect x={20} y={115} width={540} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={131} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Text + Social Data Pipeline 202</text>
        <PBox x={30} y={139} w={100} h={36} label="Post Create 202A" sub="Text / Image" />
        <PArrow x1={130} y1={157} x2={148} y2={157} />
        <PBox x={148} y={139} w={110} h={36} label="Feed Service 202B" sub="Process + Rank" />
        <PArrow x1={258} y1={157} x2={276} y2={157} />
        <PBox x={276} y={139} w={110} h={36} label="MongoDB 202C" sub="Posts, Comments" />
        <PArrow x1={386} y1={157} x2={404} y2={157} />
        <PBox x={404} y={139} w={146} h={36} label="ElasticSearch 202D" sub="Full-Text Search Index" />
        <text x={30} y={192} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Kafka event on each write | Feed pre-computed per user in Redis</text>

        {/* === CACHE SYSTEM 203 === */}
        <rect x={600} y={115} width={260} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={131} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Cache System 203</text>
        <PBox x={610} y={139} w={115} h={36} label="Redis Feed 203A" sub="Hot Feed TTL:5m" />
        <PBox x={733} y={139} w={117} h={36} label="Redis Session 203B" sub="Token Cache 24h" />
        <text x={610} y={192} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Reduces DB reads 70-80%</text>

        {/* === USER AUTH DATA 204 === */}
        <rect x={20} y={220} width={540} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={236} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>User Data + Authentication Pipeline 204</text>
        <PBox x={30} y={244} w={110} h={36} label="Registration 204A" sub="Profile + KYC" />
        <PArrow x1={140} y1={262} x2={158} y2={262} />
        <PBox x={158} y={244} w={120} h={36} label="Auth Service 204B" sub="JWT + OAuth 2.0" />
        <PArrow x1={278} y1={262} x2={296} y2={262} />
        <PBox x={296} y={244} w={130} h={36} label="PostgreSQL 204C" sub="Encrypted, Multi-AZ" />
        <PArrow x1={426} y1={262} x2={444} y2={262} />
        <PBox x={444} y={244} w={106} h={36} label="Redis Auth 204D" sub="Session + Refresh" />
        <text x={30} y={297} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Bcrypt factor 12 | JWT access 15m + refresh 7d rotation | AES-256 at rest</text>

        {/* === REAL-TIME 205 === */}
        <rect x={600} y={220} width={260} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={236} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Real-Time Layer 205</text>
        <PBox x={610} y={244} w={115} h={36} label="WebSocket 205A" sub="Socket.io" />
        <PBox x={733} y={244} w={117} h={36} label="Push Notify 205B" sub="FCM / APNs" />
        <text x={610} y={297} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Chat, Live updates, Typing indicators</text>

        <text x={440} y={334} textAnchor="middle" style={{fontSize:9,fontWeight:"600",fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>FIG. 2 — Celebso Platform: Data Flow + Video Pipeline Architecture</text>
      </svg>
    </Card>
    <Card><div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:20}}>Redis Cache Strategy</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      {[{t:"Feed Cache",d:"Pre-computed feeds per user. TTL 5m. Invalidated on new post. Reduces MongoDB reads ~70%."},{t:"Session Cache",d:"JWT validation + session data. TTL 24h. Reduces auth DB lookups ~80%."},{t:"Trending Cache",d:"Category scores updated every 60s via background worker."},{t:"Event RSVP",d:"Real-time attendee counts. Write-through pattern. TTL 2m."}].map((r,i)=>(<div key={i} style={{padding:"14px 18px",background:"#f0f4ff",border:"1px solid "+BLUE+"12",borderRadius:6}}><div style={{fontSize:13,fontWeight:700,color:DARK,marginBottom:6}}>{r.t}</div><div style={{fontSize:12,color:T2,lineHeight:1.65}}>{r.d}</div></div>))}
    </div></Card>
  </div>);
}

function S_Trending() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Virality, Events & Community" num={6} />
    <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 36 }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>How Discovery, Trending & Communities Work</h2>
        <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 520, margin: 0 }}>The core differentiator — surfacing emerging talent across categories.</p>
      </div>
      <img src="/vectors/virality.png" alt="Virality Engine" style={{ width: 220, flexShrink: 0, opacity: 0.9 }} />
    </div>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 3 — TRENDING / VIRALITY + COMMUNITY + EVENT SYSTEM</div>
      <svg viewBox="0 0 880 380" style={{width:"100%",maxWidth:880}}>
        <defs><marker id="pa3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>

        {/* === TRENDING / VIRALITY ENGINE 301 === */}
        <rect x={20} y={10} width={840} height={105} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Trending + Virality Engine 301</text>
        <PBox x={30} y={34} w={120} h={36} label="User Action 301A" sub="View, Like, Share" />
        <PArrow x1={150} y1={52} x2={168} y2={52} />
        <PBox x={168} y={34} w={120} h={36} label="Kafka Bus 301B" sub="Event Stream" />
        <PArrow x1={288} y1={52} x2={306} y2={52} />
        <PBox x={306} y={34} w={140} h={36} label="Trending Worker 301C" sub="Score Calc (60s cycle)" />
        <PArrow x1={446} y1={52} x2={464} y2={52} />
        <PBox x={464} y={34} w={130} h={36} label="Redis Sorted Set 301D" sub="Category Rankings" />
        <PArrow x1={594} y1={52} x2={612} y2={52} />
        <PBox x={612} y={34} w={110} h={36} label="Feed Service 301E" sub="Personalized Feed" />
        <PArrow x1={722} y1={52} x2={740} y2={52} />
        <PBox x={740} y={34} w={110} h={36} label="User Device 301F" sub="App / Web" />
        <rect x={30} y={78} width={820} height={28} fill="#f8fafc" stroke="#334155" strokeWidth={0.5} rx={2} />
        <text x={40} y={95} style={{fontSize:8.5,fontWeight:"600",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>Score = (Views x 1) + (Likes x 2) + (Comments x 3) + (Shares x 5) + (Saves x 4) * e^(-0.1 * hours_since_post) | Trending threshold: category-median + 2 std dev</text>

        {/* === COMMUNITY SYSTEM 302 === */}
        <rect x={20} y={130} width={840} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={146} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Community System 302</text>
        <PBox x={30} y={154} w={110} h={36} label="Create 302A" sub="Founder Action" />
        <PArrow x1={140} y1={172} x2={158} y2={172} />
        <PBox x={158} y={154} w={120} h={36} label="Community Svc 302B" sub="CRUD + Members" />
        <PArrow x1={278} y1={172} x2={296} y2={172} />
        <PBox x={296} y={154} w={120} h={36} label="PostgreSQL 302C" sub="Roles + Permissions" />
        <PArrow x1={416} y1={172} x2={434} y2={172} />
        <PBox x={434} y={154} w={110} h={36} label="Activity Feed 302D" sub="MongoDB" />
        <PArrow x1={544} y1={172} x2={562} y2={172} />
        <PBox x={562} y={154} w={110} h={36} label="WebSocket 302E" sub="Real-time Chat" />
        <PArrow x1={672} y1={172} x2={690} y2={172} />
        <PBox x={690} y={154} w={160} h={36} label="AI Moderation 302F" sub="Content Filter + Manual Queue" />
        <text x={30} y={208} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Roles: Admin, Moderator, Member | Discovery via ElasticSearch | Growth analytics per community</text>

        {/* === EVENT SYSTEM 303 === */}
        <rect x={20} y={235} width={840} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={251} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Event Lifecycle 303</text>
        <PBox x={30} y={259} w={105} h={36} label="Create Event 303A" sub="Founder / Comm." />
        <PArrow x1={135} y1={277} x2={153} y2={277} />
        <PBox x={153} y={259} w={100} h={36} label="Event Svc 303B" sub="Validate + Store" />
        <PArrow x1={253} y1={277} x2={271} y2={277} />
        <PBox x={271} y={259} w={110} h={36} label="ElasticSearch 303C" sub="Geo + Category" />
        <PArrow x1={381} y1={277} x2={399} y2={277} />
        <PBox x={399} y={259} w={100} h={36} label="RSVP Engine 303D" sub="Capacity Mgmt" />
        <PArrow x1={499} y1={277} x2={517} y2={277} />
        <PBox x={517} y={259} w={110} h={36} label="Notification 303E" sub="Push + Cal Sync" />
        <PArrow x1={627} y1={277} x2={645} y2={277} />
        <PBox x={645} y={259} w={100} h={36} label="Post-Event 303F" sub="Analytics + Media" />
        <PArrow x1={745} y1={277} x2={763} y2={277} />
        <PBox x={763} y={259} w={87} h={36} label="Archive 303G" sub="S3 + Database" />
        <text x={30} y={313} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Geo-indexed search | Category, city, price filters | RSVP + waitlist | Calendar sync (Google, Apple) | Post-event gallery upload</text>

        <text x={440} y={370} textAnchor="middle" style={{fontSize:9,fontWeight:"600",fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>FIG. 3 — Celebso Platform: Trending, Community & Event Subsystems</text>
      </svg>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
      {[{icon:Icon.trending,t:"Virality Detection",d:"Weighted scoring with time-decay. Per-category trending. Velocity monitoring. Anti-spam heuristics."},{icon:Icon.users,t:"Community Governance",d:"Role-based: Admin, Moderator, Member. ElasticSearch discovery. Activity feeds in MongoDB. Growth analytics."},{icon:Icon.calendar,t:"Event Discovery",d:"Geo-indexed search. Category, city, price filters. RSVP + waitlist. Calendar integration. Post-event gallery."}].map((c,i)=>(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{color:BLUE}}>{c.icon}</span><span style={{fontSize:15,fontWeight:700,color:DARK}}>{c.t}</span></div><p style={{fontSize:12,color:T2,lineHeight:1.7,margin:0}}>{c.d}</p></Card>))}
    </div>
  </div>);
}

function S_DevOps() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="DevOps, Deployment & Security" num={7} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Deployment, SRE & DevSecOps</h2>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 4 — CI/CD PIPELINE</div>
      <svg viewBox="0 0 880 230" style={{width:"100%",maxWidth:880}}>
        <defs><marker id="pa4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>

        {/* === CI/CD PIPELINE 401 === */}
        <rect x={20} y={10} width={840} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>CI/CD Pipeline 401 — Build + Deploy</text>
        <PBox x={30} y={34} w={90} h={36} label="Developer 401A" sub="Git Push" />
        <PArrow x1={120} y1={52} x2={138} y2={52} />
        <PBox x={138} y={34} w={90} h={36} label="GitHub 401B" sub="Source Repo" />
        <PArrow x1={228} y1={52} x2={246} y2={52} />
        <PBox x={246} y={34} w={110} h={36} label="GH Actions 401C" sub="Lint + Test + Scan" />
        <PArrow x1={356} y1={52} x2={374} y2={52} />
        <PBox x={374} y={34} w={100} h={36} label="Docker Build 401D" sub="Containerize" />
        <PArrow x1={474} y1={52} x2={492} y2={52} />
        <PBox x={492} y={34} w={90} h={36} label="AWS ECR 401E" sub="Image Registry" />
        <PArrow x1={582} y1={52} x2={600} y2={52} />
        <PBox x={600} y={34} w={120} h={36} label="ECS Fargate 401F" sub="Blue/Green Deploy" />
        <PArrow x1={720} y1={52} x2={738} y2={52} />
        <PBox x={738} y={34} w={112} h={36} label="Production 401G" sub="Live Traffic" />
        <text x={30} y={82} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Avg deploy: &lt;8 min | Rollback: &lt;30 sec | Zero-downtime blue/green swap</text>

        {/* === INFRASTRUCTURE MANAGEMENT 402 === */}
        <rect x={20} y={105} width={420} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={121} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Infrastructure as Code 402</text>
        <PBox x={30} y={129} w={125} h={36} label="Terraform 402A" sub="IaC Provisioning" />
        <PBox x={163} y={129} w={130} h={36} label="Auto-Scaling 402B" sub="CPU 70% out, 30% in" />
        <PBox x={301} y={129} w={129} h={36} label="Flyway Migrations 402C" sub="Versioned + Reversible" />
        <text x={30} y={177} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Staging mirrors production 1:1 | Weekly sprints</text>

        {/* === DEPLOYMENT STRATEGY 403 === */}
        <rect x={460} y={105} width={400} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={470} y={121} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>Deployment Strategy 403</text>
        <PBox x={470} y={129} w={120} h={36} label="Canary 403A" sub="5% then 25% then 100%" />
        <PBox x={598} y={129} w={125} h={36} label="Health Checks 403B" sub="ALB + Custom" />
        <PBox x={731} y={129} w={119} h={36} label="Rollback 403C" sub="Auto on failure" />
        <text x={470} y={177} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Feature flags for progressive rollout | &lt;30 min hotfix SLA</text>

        <text x={440} y={220} textAnchor="middle" style={{fontSize:9,fontWeight:"600",fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>FIG. 4 — Celebso Platform: CI/CD Pipeline + Deployment Architecture</text>
      </svg>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      {[{icon:Icon.shield,t:"DevSecOps & Data Security",items:["OWASP Top 10 compliance at WAF layer","AES-256 at rest, TLS 1.3 in transit","Bcrypt (factor 12), JWT + refresh rotation","AWS Secrets Manager — zero hardcoded creds","GDPR-aligned: export, deletion, consent","Dependency scanning (Snyk) on every PR"]},{icon:Icon.server,t:"Site Reliability Engineering",items:["99.9% uptime SLO, automated alerting","Auto-scale: 70% CPU out, 30% in (2-20 instances)","Viral surge: pre-warmed CDN, Redis auto-expand","API p99 under 200ms, CDN TTFB under 50ms India","PgBouncer connection pooling, read replicas","Chaos engineering in staging"]},{icon:Icon.globe,t:"Traffic & Latency Management",items:["CloudFront 30+ Indian PoPs, sub-50ms","API caching at edge for public endpoints","HTTP/2, keep-alive, image WebP conversion","Route 53 DNS failover, multi-region","Mobile offline-first with SQLite sync","Lazy loading, responsive srcset"]},{icon:Icon.database,t:"Deployment Strategy",items:["Blue/Green via ECS — zero downtime","Feature flags for progressive rollout","Staging mirrors production 1:1","Flyway DB migrations — versioned, reversible","Canary: 5% then 25% then 100% with auto-rollback","Weekly sprints, bi-weekly releases, under 30min hotfix"]}].map((s,i)=>(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{color:BLUE}}>{s.icon}</span><span style={{fontSize:14,fontWeight:700,color:DARK}}>{s.t}</span></div>{s.items.map((it,j)=>(<div key={j} style={{display:"flex",gap:10,marginBottom:8,fontSize:12,color:T1,lineHeight:1.6}}><span style={{marginTop:1,flexShrink:0}}>{Icon.check}</span><span>{it}</span></div>))}</Card>))}
    </div>
  </div>);
}

function S_Timeline() {
  const ph=[{p:"Phase 1 — Foundation",dur:"Weeks 1-4",items:["AWS infra via Terraform (VPC, ECS, RDS, S3, CDN)","CI/CD: GitHub then Actions then Docker then ECR then ECS","User service: OAuth 2.0, JWT, profile CRUD","DB schema: PostgreSQL + MongoDB","React Native scaffold: nav, design system, auth","Admin dashboard foundation"]},{p:"Phase 2 — Core Platform",dur:"Weeks 5-8",items:["Feed engine: posts, algo ranking, category filters","Video: Upload then S3 then MediaConvert then HLS then CDN","Reels player: vertical swipe, adaptive bitrate","Community: create, join, discover, feeds, members","ElasticSearch: profiles, content, communities","Notifications: Push, in-app, email"]},{p:"Phase 3 — Growth + Launch",dur:"Weeks 9-12",items:["Events: listing, RSVP, community-hosted events","Trending: category scoring, virality detection","Chat: DMs, community chat via WebSocket","Creator analytics dashboard","Security audit, pen testing, OWASP","App Store submission + soft launch"]}];
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Development Roadmap" num={8} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 36px 0", letterSpacing: "-1px" }}>12-Week MVP Execution Plan</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24}}>
      {ph.map((p,i)=>(<Card key={i} style={{borderTop:"3px solid "+BLUE}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}><div style={{fontSize:15,fontWeight:700,color:DARK}}>{p.p}</div><div style={{display:"flex",alignItems:"center",gap:4,color:T3,fontSize:11}}>{Icon.clock} {p.dur}</div></div>{p.items.map((it,j)=>(<div key={j} style={{display:"flex",gap:10,marginBottom:9,fontSize:12,color:T1,lineHeight:1.6}}><span style={{marginTop:1,flexShrink:0}}>{Icon.check}</span><span>{it}</span></div>))}</Card>))}
    </div>
  </div>);
}

function S_Team() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="About Us" num={9} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 32px 0", letterSpacing: "-1px" }}>Who We Are</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <Card><div style={{fontSize:22,fontWeight:700,color:DARK,marginBottom:2}}>Uddit</div><div style={{fontSize:13,color:BLUE,fontWeight:600,marginBottom:18}}>AI Engineer & Full Stack Developer — NIT Jaipur '25</div>
      <p style={{fontSize:13,color:T2,lineHeight:1.75,margin:"0 0 24px 0"}}>Production-grade AI systems, RAG architectures, scalable platforms. 500+ clients across logistics, education, legal tech, SaaS.</p>
      {[{icon:Icon.globe,l:"Portfolio",v:"uddit.site"},{icon:Icon.mail,l:"Email",v:"udditalerts247@gmail.com"},{icon:Icon.phone,l:"Phone",v:"+91 7456 886 877 / +91 8368 824 707"},{icon:Icon.linkedin,l:"LinkedIn",v:"linkedin.com/in/lorduddit-"},{icon:Icon.github,l:"GitHub",v:"github.com/UDDITwork"}].map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,fontSize:13}}><span style={{color:BLUE}}>{c.icon}</span><span style={{width:72,fontWeight:600,color:T3,fontSize:11}}>{c.l}</span><span style={{color:T1}}>{c.v}</span></div>))}</Card>
      <Card><div style={{fontSize:15,fontWeight:700,color:DARK,marginBottom:20}}>Production Systems & Clients</div>
      {[{n:"ShipSarthi",d:"PAN-India logistics — 500+ clients"},{n:"Zammer",d:"E-commerce infrastructure"},{n:"YourCareer",d:"Career platform"},{n:"Richie AI",d:"AI financial tools"},{n:"PatFace",d:"AI patent drafting"},{n:"Sivi Academy",d:"Education platform"},{n:"Gantavyam",d:"Travel & discovery"},{n:"Khandarkar",d:"Digital services"}].map((c,i)=>(<div key={i} style={{padding:"12px 0",borderBottom:i<7?"1px solid "+BORDER:"none",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:600,color:T1}}>{c.n}</span><span style={{fontSize:11,color:T2}}>{c.d}</span></div>))}</Card>
    </div>
  </div>);
}

function S_Engagement() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Engagement & Commercials" num={10} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Partnership Terms</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 40px 0" }}>Transparent, milestone-driven engagement.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24,marginBottom:40}}>
      {[{icon:Icon.dollar,l:"Development Cost",v:"5,00,000",s:"INR — Full MVP"},{icon:Icon.clock,l:"Timeline",v:"12 Weeks",s:"3 Months to Production"},{icon:Icon.zap,l:"Upfront",v:"30%",s:"1,50,000 INR to Start"}].map((d,i)=>(<Card key={i} style={{borderTop:"3px solid "+BLUE}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{color:BLUE}}>{d.icon}</span><span style={{fontSize:10,fontWeight:700,color:BLUE,letterSpacing:2,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>{d.l}</span></div><div style={{fontSize:38,fontWeight:800,color:DARK,letterSpacing:"-1px"}}>{d.v}</div><div style={{fontSize:13,color:T2,marginTop:4}}>{d.s}</div></Card>))}
    </div>
    <Card style={{marginBottom:32}}><div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:20}}>Payment Schedule</div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr style={{borderBottom:"2px solid "+DARK}}>
      {["Milestone","Timeline","Deliverables","Amount"].map(h=><th key={h} style={{textAlign:"left",padding:"12px 14px",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",color:DARK}}>{h}</th>)}
    </tr></thead><tbody>
      {[["Kickoff","Day 0","Upfront payment","1,50,000 (30%)"],["Phase 1","Week 4","Infra, auth, scaffold","1,00,000 (20%)"],["Phase 2","Week 8","Feed, video, communities","1,25,000 (25%)"],["Launch","Week 12","Events, trending, launch","1,25,000 (25%)"]].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid "+BORDER, background: i%2===0 ? "#f8fafc" : WHITE}}>{r.map((c,j)=><td key={j} style={{padding:"14px",color:j===0?T1:T2,fontWeight:j===0||j===3?600:400}}>{c}</td>)}</tr>))}
    </tbody></table></Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:40}}>
      <Card><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{color:BLUE}}>{Icon.check}</span><span style={{fontSize:14,fontWeight:700,color:DARK}}>What's Included</span></div>
      {["Mobile app (iOS + Android) — React Native","Web app (Next.js) + Admin dashboard","Full AWS backend infrastructure","Video/Reels pipeline with CDN","Community, Events, Trending systems","ElasticSearch, real-time chat, notifications","CI/CD pipeline and DevOps","Security audit + App Store submission","2 weeks post-launch bug fixes"].map((it,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:8,fontSize:12,color:T1}}><span style={{flexShrink:0}}>{Icon.check}</span>{it}</div>))}</Card>
      <Card><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{color:BLUE}}>{Icon.shield}</span><span style={{fontSize:14,fontWeight:700,color:DARK}}>Collaboration Guidelines</span></div>
      {[{t:"Feature Flexibility",d:"We remain flexible. Suggestions during development are welcome."},{t:"Change Management",d:"To protect the 12-week timeline, we request founders dedicate time upfront to finalize core features. Mid-sprint changes should be minimized to avoid disruption."},{t:"Recommendation",d:"Dedicate 2-3 days before kickoff to detail every feature and edge case. This saves weeks of rework."},{t:"Communication",d:"Weekly demos, shared channel, project dashboard for full transparency."},{t:"Our Role",d:"We support the entire journey — MVP to scale. This is a partnership; we are committed to Celebso's success."}].map((g,i)=>(<div key={i} style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:700,color:DARK,marginBottom:3}}>{g.t}</div><div style={{fontSize:12,color:T2,lineHeight:1.65}}>{g.d}</div></div>))}</Card>
    </div>
    <div style={{background:DARK,borderRadius:10,padding:52,color:"#fff",textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:30,fontWeight:700,marginBottom:14,letterSpacing:"-0.5px"}}>Let's Build Celebso Together</div>
      <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.8,maxWidth:560,margin:"0 auto 32px"}}>Your vision is validated. The platform is ready to be built. We are ready to build it.</p>
      <div style={{display:"flex",justifyContent:"center",gap:48,fontSize:13}}>
        {[{l:"Schedule",v:"cal.com/uddit-jl3ic4"},{l:"Email",v:"udditalerts247@gmail.com"},{l:"Phone",v:"+91 7456 886 877"}].map((c,i)=>(<div key={i}><div style={{color:"#64748b",fontSize:9,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{c.l}</div><div style={{fontWeight:600}}>{c.v}</div></div>))}
      </div>
    </div>
    <div style={{padding:"28px 0",borderTop:"1px solid "+BORDER,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24,fontSize:10,color:T3,lineHeight:1.65}}>
      <div><div style={{fontWeight:700,color:T2,marginBottom:6}}>Prepared by Uddit</div><div>uddit.site | udditalerts247@gmail.com</div><div>+91 7456 886 877 | +91 8368 824 707</div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{display:"inline-flex"}}>{Icon.linkedin}</span> linkedin.com/in/lorduddit-</div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{display:"inline-flex"}}>{Icon.github}</span> github.com/UDDITwork</div></div>
      <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:T2,marginBottom:6}}>Prepared For</div><div>Celebso | www.celebso.com</div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><span style={{display:"inline-flex"}}>{Icon.linkedin}</span> linkedin.com/company/celebso/</div><div>Er. Veer Singh (Founder & CEO)</div><div>Pradeep Kumar Bijarniya (Co-Founder)</div></div>
      <div style={{textAlign:"right"}}><div style={{fontWeight:700,color:T2,marginBottom:6}}>Document Reference</div><div>REF: CBL-2026-0318 | 18 March 2026, IST</div><div>Copyright 2026 Uddit. All rights reserved.</div></div>
    </div>
  </div>);
}

function S_Legal() {
  const lh = { fontSize: 13, color: T1, lineHeight: 1.85, margin: "0 0 16px 0" };
  const sh = { fontSize: 14, fontWeight: 700, color: DARK, margin: "28px 0 10px 0" };
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Legal Agreement" num={11} />
    <div style={{ maxWidth: 720, margin: "0 auto", background: WHITE, border: "1px solid " + BORDER, borderRadius: 10, boxShadow: SHADOW_MD, padding: "56px 52px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, paddingBottom: 28, borderBottom: "2px solid " + DARK }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: DARK, letterSpacing: "-0.5px" }}>CELEBSO</div>
          <div style={{ fontSize: 11, color: T2, marginTop: 4 }}>Technical Development Partnership</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T1 }}>Date: 18 March 2026</div>
          <div style={{ fontSize: 11, color: T2, marginTop: 2 }}>Ref: CBL-2026-0318/LEG</div>
        </div>
      </div>

      <div style={{ marginBottom: 32, padding: "20px 24px", background: "#f8fafc", borderRadius: 6, border: "1px solid " + BORDER }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T3, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>From (Developer)</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Uddit</div>
            <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>AI Engineer & Full Stack Developer<br/>NIT Jaipur, Rajasthan, India<br/>udditalerts247@gmail.com<br/>+91 7456 886 877</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T3, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>To (Client)</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Er. Veer Singh & Pradeep Kumar Bijarniya</div>
            <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>Celebso (Ooglesoft Private Limited)<br/>Jaipur, Rajasthan, India<br/>www.celebso.com</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 8, letterSpacing: "-0.3px" }}>Subject: Terms of Engagement, Confidentiality & Intellectual Property Agreement</div>
      <div style={{ width: 48, height: 2, background: BLUE, marginBottom: 24 }} />

      <p style={lh}>Dear Er. Veer Singh and Mr. Pradeep Kumar Bijarniya,</p>
      <p style={lh}>This letter sets forth the binding terms and conditions governing the technical development partnership between the undersigned parties for the Celebso platform. By executing this agreement or commencing work pursuant to the accompanying Technical Proposal (Ref: CBL-2026-0318), both parties acknowledge and agree to be bound by the terms outlined herein.</p>

      <div style={sh}>1. Scope of Work</div>
      <p style={lh}>The Developer shall design, develop, test, and deploy the Celebso platform as described in the accompanying Technical Proposal, including but not limited to: (a) mobile applications for iOS and Android using React Native; (b) a web application built with Next.js; (c) an administrative dashboard; (d) backend microservices architecture on AWS; (e) video/reels pipeline with CDN delivery; (f) community, events, trending, and search systems; and (g) CI/CD pipeline and DevOps infrastructure. The full scope is defined in Sections 3 through 8 of the Technical Proposal.</p>

      <div style={sh}>2. Project Timeline & Milestones</div>
      <p style={lh}>The project shall be executed over a period of twelve (12) weeks from the date of the first milestone payment, divided into three phases as outlined in the Development Roadmap (Section 8). Each phase concludes with a deliverable review and milestone payment. Delays caused by the Client (including but not limited to delayed feedback, scope changes, or unavailability for required reviews) shall extend the timeline by an equivalent period without penalty to the Developer.</p>

      <div style={sh}>3. Compensation & Payment Terms</div>
      <p style={lh}>The total project fee is INR 5,00,000 (Indian Rupees Five Lakhs Only), payable as follows: (a) INR 1,50,000 (30%) upon execution of this agreement, prior to commencement of work; (b) INR 1,00,000 (20%) upon completion of Phase 1 (Week 4); (c) INR 1,25,000 (25%) upon completion of Phase 2 (Week 8); (d) INR 1,25,000 (25%) upon final delivery and launch (Week 12). All payments shall be made within seven (7) business days of the milestone completion notice. Late payments exceeding fifteen (15) days shall accrue interest at the rate of 1.5% per month and may result in suspension of development activities until outstanding amounts are settled.</p>

      <div style={sh}>4. Confidentiality & Non-Disclosure</div>
      <p style={lh}>Both parties agree to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, technical architectures, user data schemas, and any other sensitive material exchanged during the course of this engagement. This obligation survives the termination of this agreement for a period of three (3) years. Neither party shall disclose such information to any third party without prior written consent, except as required by applicable law or regulation. The Developer may reference Celebso as a portfolio project with prior approval of the Client on the specific materials shared publicly.</p>

      <div style={sh}>5. Intellectual Property Rights</div>
      <p style={lh}>Upon receipt of full and final payment, all intellectual property rights, including source code, design assets, documentation, and system architecture created specifically for Celebso, shall be irrevocably transferred to and vest exclusively in the Client. The Developer retains the right to reuse general-purpose libraries, frameworks, and non-proprietary tools developed independently. Any pre-existing intellectual property brought into the project by either party shall remain the property of the originating party. The Client grants the Developer a limited license to use the Celebso name and logo solely for portfolio and marketing purposes.</p>

      <div style={sh}>6. Warranties & Quality Assurance</div>
      <p style={lh}>The Developer warrants that: (a) all code delivered shall be original and free from any third-party intellectual property claims; (b) the platform shall substantially conform to the specifications outlined in the Technical Proposal; (c) a two (2) week post-launch bug-fix period is included at no additional cost; (d) the platform shall be delivered with reasonable security measures consistent with industry standards, including OWASP Top 10 compliance. The Developer does not warrant uninterrupted or error-free operation of the platform, nor does it guarantee any specific business outcomes, user acquisition numbers, or revenue targets.</p>

      <div style={sh}>7. Limitation of Liability</div>
      <p style={lh}>In no event shall the Developer's total aggregate liability under this agreement exceed the total fees actually paid by the Client. The Developer shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, loss of data, business interruption, or loss of goodwill, regardless of the cause of action or theory of liability, even if advised of the possibility of such damages. The Client acknowledges that the platform is being delivered as an MVP and may require further development for production-scale operations.</p>

      <div style={sh}>8. Change Management</div>
      <p style={lh}>Any changes to the agreed scope of work must be submitted in writing and mutually agreed upon before implementation. Scope changes may affect the project timeline and total cost. The Developer shall provide a written estimate for any requested changes, including impact on timeline and cost, within five (5) business days of receiving the change request. Work on change requests shall commence only upon written approval from both parties.</p>

      <div style={sh}>9. Termination</div>
      <p style={lh}>Either party may terminate this agreement with thirty (30) days written notice. In the event of termination: (a) the Client shall pay for all work completed up to the date of termination, calculated on a pro-rata basis; (b) the Developer shall deliver all completed work product and documentation to the Client within fifteen (15) days of termination; (c) any advance payments for undelivered milestones shall be refunded within thirty (30) days, less any costs already incurred. Termination for material breach requires fifteen (15) days written notice with an opportunity to cure.</p>

      <div style={sh}>10. Non-Solicitation</div>
      <p style={lh}>During the term of this agreement and for a period of twelve (12) months following its completion or termination, neither party shall directly or indirectly solicit, recruit, or hire any employee, contractor, or key personnel of the other party who was involved in the execution of this project, without prior written consent.</p>

      <div style={sh}>11. Force Majeure</div>
      <p style={lh}>Neither party shall be held liable for delays or failure to perform obligations under this agreement due to circumstances beyond reasonable control, including but not limited to natural disasters, acts of government, pandemics, wars, civil unrest, internet service disruptions, or infrastructure failures. The affected party shall promptly notify the other party in writing and make reasonable efforts to mitigate the impact.</p>

      <div style={sh}>12. Dispute Resolution & Governing Law</div>
      <p style={lh}>This agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this agreement shall first be attempted to be resolved through good-faith negotiation between the parties. If negotiation fails within thirty (30) days, the dispute shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996, conducted in Jaipur, Rajasthan. The language of arbitration shall be English. The arbitrator's decision shall be final and binding on both parties.</p>

      <div style={sh}>13. Entire Agreement</div>
      <p style={lh}>This letter, together with the Technical Proposal (Ref: CBL-2026-0318) and any annexures thereto, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, commitments, offers, contracts, and other communications, whether written or oral, pertaining to the subject matter hereof. No amendment or modification shall be effective unless made in writing and signed by both parties.</p>

      <p style={{...lh, marginTop: 32}}>We look forward to a productive and successful partnership in building Celebso into a transformative platform for India's creator ecosystem.</p>
      <p style={lh}>Yours sincerely,</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40, paddingTop: 32, borderTop: "1px solid " + BORDER }}>
        <div>
          <div style={{ width: 180, borderBottom: "1px solid " + DARK, marginBottom: 10, paddingBottom: 48 }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Uddit</div>
          <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>AI Engineer & Full Stack Developer<br/>NIT Jaipur<br/>Date: _______________<br/>Place: _______________</div>
        </div>
        <div>
          <div style={{ width: 180, borderBottom: "1px solid " + DARK, marginBottom: 10, paddingBottom: 48 }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Er. Veer Singh</div>
          <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>Founder & CEO, Celebso<br/>Ooglesoft Private Limited<br/>Date: _______________<br/>Place: _______________</div>
        </div>
      </div>

      <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid " + BORDER, textAlign: "center" }}>
        <div style={{ fontSize: 9, color: T3, lineHeight: 1.6 }}>This document is confidential and intended solely for the named addressees. Unauthorized reproduction, distribution, or disclosure is strictly prohibited.</div>
        <div style={{ fontSize: 9, color: T3, marginTop: 4 }}>REF: CBL-2026-0318/LEG | 18 March 2026, IST | Copyright 2026 Uddit. All rights reserved.</div>
      </div>
    </div>
  </div>);
}

const SECS=[{id:"cover",label:"Cover"},{id:"align",label:"Vision"},{id:"market",label:"Market"},{id:"product",label:"Product"},{id:"arch",label:"Architecture"},{id:"data",label:"Data"},{id:"trending",label:"Trending"},{id:"devops",label:"DevOps"},{id:"timeline",label:"Roadmap"},{id:"team",label:"Team"},{id:"terms",label:"Terms"},{id:"legal",label:"Legal"}];

export default function CelebsoProposal() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const h = () => { const els = c.querySelectorAll("[data-s]"); let cur = 0; els.forEach((el, i) => { if (c.scrollTop >= el.offsetTop - 200) cur = i; }); setActive(cur); };
    c.addEventListener("scroll", h);
    return () => c.removeEventListener("scroll", h);
  }, []);
  const go = (i) => { const els = ref.current.querySelectorAll("[data-s]"); if (els[i]) els[i].scrollIntoView({ behavior: "smooth" }); };

  return (<div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, color: T1, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderBottom: "1px solid " + BORDER, background: WHITE, zIndex: 10, flexShrink: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={FOUNDER_IMG.LOGO} alt="Celebso" width={24} height={24} style={{ borderRadius: 4 }} />
        <span style={{ fontWeight: 800, fontSize: 16, color: DARK }}>CELEBSO</span>
        <span style={{ fontSize: 10, color: T3, fontFamily: "'JetBrains Mono', monospace" }}>Technical Proposal</span>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {SECS.map((s, i) => (<button key={s.id} onClick={() => go(i)} style={{ padding: "5px 11px", fontSize: 10, fontWeight: i === active ? 700 : 500, color: i === active ? BLUE : T3, background: i === active ? BLUE + "0a" : "transparent", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 200ms ease" }}>{s.label}</button>))}
      </div>
      <span style={{ fontSize: 10, color: T3, fontFamily: "'JetBrains Mono', monospace" }}>18 Mar 2026</span>
    </div>
    <div ref={ref} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
      {[S_Cover, S_Alignment, S_Market, S_Product, S_Arch, S_Data, S_Trending, S_DevOps, S_Timeline, S_Team, S_Engagement, S_Legal].map((Comp, i) => (<div key={i} data-s={SECS[i]?.id}><Comp />{i < 11 && <div style={{ height: 1, background: "linear-gradient(90deg, transparent, " + BORDER + ", transparent)", margin: "0 56px" }} />}</div>))}
    </div>
  </div>);
}