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
      style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "2px solid " + BORDER }}
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
    <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, " + BLUE + "06 0%, transparent 70%)", pointerEvents: "none" }} />
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
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", lineHeight: 1.2, letterSpacing: "-1px" }}>We've Studied Your Journey. We Understand Your Vision.</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 40px 0" }}>Before writing a single line of code, we conducted a thorough audit of Celebso's public presence, founder communications, community-building efforts, and strategic positioning over the past 12+ months. What we found was not just a product concept — but a deeply held conviction to democratize opportunity for India's creators and entrepreneurs.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {quotes.map((q,i)=>(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
        <img src={q.img} alt={q.author} width={42} height={42} style={{ borderRadius: 8, objectFit: "cover", border: "1.5px solid " + BORDER }} />
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
      <svg viewBox="0 0 840 520" style={{width:"100%",maxWidth:840}}>
        <defs><marker id="pa" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155" /></marker></defs>
        <text x={30} y={20} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>101 — CLIENT LAYER</text>
        <PBox x={30} y={28} w={120} h={40} label="iOS Application" sub="React Native" />
        <PBox x={160} y={28} w={120} h={40} label="Android App" sub="React Native" />
        <PBox x={290} y={28} w={120} h={40} label="Web App" sub="Next.js / React" />
        <PBox x={420} y={28} w={130} h={40} label="Admin Dashboard" sub="React + Tailwind" />
        <PBox x={680} y={28} w={140} h={40} label="AWS CloudFront CDN" sub="Edge Delivery" />
        <PArrow x1={330} y1={68} x2={330} y2={96} />
        <text x={30} y={94} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>102 — API GATEWAY</text>
        <PBox x={30} y={100} w={530} h={40} label="AWS API Gateway + WAF + Rate Limiter + JWT Validation" sub="Auth | Routing | DDoS Protection | IP Filtering" />
        <PArrow x1={295} y1={140} x2={295} y2={168} />
        <text x={30} y={166} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>103 — LOAD BALANCER</text>
        <PBox x={30} y={172} w={530} h={34} label="AWS Application Load Balancer (ALB) — Round Robin + Health Checks" />
        <PArrow x1={295} y1={206} x2={295} y2={230} />
        <text x={30} y={228} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>104 — MICROSERVICES (AWS ECS FARGATE)</text>
        <PBox x={30} y={236} w={100} h={48} label="User Service" sub="Auth + Profiles" />
        <PBox x={138} y={236} w={100} h={48} label="Feed Service" sub="Algo + Ranking" />
        <PBox x={246} y={236} w={100} h={48} label="Video Service" sub="Upload + HLS" />
        <PBox x={354} y={236} w={100} h={48} label="Community Svc" sub="Groups + Chat" />
        <PBox x={462} y={236} w={100} h={48} label="Event Service" sub="RSVP + Listing" />
        <PBox x={580} y={236} w={80} h={48} label="Search Svc" sub="ElasticSearch" />
        <PBox x={668} y={236} w={80} h={48} label="Notify Svc" sub="Push / Email" />
        <PBox x={756} y={236} w={70} h={48} label="Analytics" sub="Metrics" />
        <PArrow x1={350} y1={284} x2={350} y2={310} />
        <text x={30} y={308} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>105 — MESSAGE QUEUE / EVENT BUS</text>
        <PBox x={30} y={314} w={280} h={36} label="Apache Kafka" sub="Async Event Streaming" />
        <PBox x={320} y={314} w={240} h={36} label="AWS SQS / SNS" sub="Task Queue + Pub/Sub" />
        <PArrow x1={295} y1={350} x2={295} y2={378} />
        <text x={30} y={376} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>106 — DATA LAYER</text>
        <PBox x={30} y={384} w={120} h={48} label="PostgreSQL (RDS)" sub="Users, Events, Meta" />
        <PBox x={158} y={384} w={120} h={48} label="MongoDB Atlas" sub="Posts, Comments" />
        <PBox x={286} y={384} w={110} h={48} label="Redis Cluster" sub="Cache + Sessions" />
        <PBox x={404} y={384} w={100} h={48} label="AWS S3" sub="Media Objects" />
        <PBox x={512} y={384} w={120} h={48} label="ElasticSearch" sub="Full-Text Search" />
        <PBox x={640} y={384} w={120} h={48} label="MediaConvert" sub="Video Transcode" />
        <text x={30} y={460} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif",letterSpacing:1}}>107 — MONITORING & OBSERVABILITY</text>
        <PBox x={30} y={468} w={160} h={36} label="AWS CloudWatch" sub="Metrics + Alarms" />
        <PBox x={198} y={468} w={130} h={36} label="Prometheus + Grafana" sub="Dashboards" />
        <PBox x={336} y={468} w={120} h={36} label="Sentry" sub="Error Tracking" />
        <PBox x={464} y={468} w={120} h={36} label="AWS X-Ray" sub="Distributed Tracing" />
      </svg>
    </Card>
    <div style={{fontSize:14,fontWeight:700,color:DARK,marginBottom:20}}>Technology Stack</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      {[{c:"Mobile",i:"React Native, Expo, TypeScript",icon:Icon.layout},{c:"Frontend Web",i:"Next.js 14+, React, Tailwind CSS",icon:Icon.globe},{c:"Backend",i:"Node.js, Express/Fastify, GraphQL",icon:Icon.server},{c:"Databases",i:"PostgreSQL, MongoDB, Redis",icon:Icon.database},{c:"Cloud — AWS",i:"ECS Fargate, S3, CloudFront, RDS, SQS",icon:Icon.server},{c:"Video Pipeline",i:"MediaConvert, HLS, Adaptive Bitrate",icon:Icon.video},{c:"Search",i:"ElasticSearch (profiles, content, events)",icon:Icon.trending},{c:"Real-time",i:"Socket.io, Firebase Push (FCM/APNs)",icon:Icon.zap},{c:"CI/CD",i:"GitHub Actions, Docker, Terraform",icon:Icon.shield}].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"16px 18px",background:WHITE,border:"1px solid "+BORDER,borderRadius:8,boxShadow:SHADOW}}><span style={{color:BLUE,marginTop:1}}>{t.icon}</span><div><div style={{fontSize:10,fontWeight:700,color:BLUE,letterSpacing:1,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>{t.c}</div><div style={{fontSize:12,color:T1,marginTop:3}}>{t.i}</div></div></div>))}
    </div>
  </div>);
}

function S_Data() {
  return (<div style={{ padding: "96px 56px" }}>
    <SH label="Data & Video Infrastructure" num={5} />
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>Where Every Byte Lives</h2>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 2 — VIDEO / REELS DATA PIPELINE</div>
      <svg viewBox="0 0 840 200" style={{width:"100%",maxWidth:840}}>
        <defs><marker id="pa2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
        <PBox x={10} y={10} w={120} h={44} label="User Upload" sub="Video / Reel" />
        <PArrow x1={130} y1={32} x2={160} y2={32} />
        <PBox x={160} y={10} w={110} h={44} label="API Server" sub="Validate + Auth" />
        <PArrow x1={270} y1={32} x2={300} y2={32} />
        <PBox x={300} y={10} w={110} h={44} label="S3 Raw Bucket" sub="ap-south-1" />
        <PArrow x1={410} y1={32} x2={440} y2={32} />
        <PBox x={440} y={10} w={130} h={44} label="MediaConvert" sub="Transcode HLS" />
        <PArrow x1={570} y1={32} x2={600} y2={32} />
        <PBox x={600} y={10} w={110} h={44} label="S3 Processed" sub="Multi-bitrate" />
        <PArrow x1={710} y1={32} x2={740} y2={32} />
        <PBox x={740} y={10} w={90} h={44} label="CloudFront" sub="CDN Edge" />
        <text x={10} y={82} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>TEXT POSTS + SOCIAL DATA</text>
        <PBox x={10} y={90} w={120} h={40} label="Text Post" sub="Create/Update" />
        <PArrow x1={130} y1={110} x2={160} y2={110} />
        <PBox x={160} y={90} w={110} h={40} label="Feed Service" sub="Process + Index" />
        <PArrow x1={270} y1={110} x2={300} y2={110} />
        <PBox x={300} y={90} w={110} h={40} label="MongoDB" sub="Posts, Comments" />
        <PArrow x1={410} y1={110} x2={440} y2={110} />
        <PBox x={440} y={90} w={110} h={40} label="ElasticSearch" sub="Search Index" />
        <PArrow x1={550} y1={110} x2={600} y2={110} />
        <PBox x={600} y={90} w={110} h={40} label="Redis Cache" sub="Hot Feed TTL:5m" />
        <text x={10} y={158} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>USER DATA + AUTH</text>
        <PBox x={10} y={164} w={120} h={40} label="Registration" sub="Profile + KYC" />
        <PArrow x1={130} y1={184} x2={160} y2={184} />
        <PBox x={160} y={164} w={110} h={40} label="Auth Service" sub="JWT + OAuth" />
        <PArrow x1={270} y1={184} x2={300} y2={184} />
        <PBox x={300} y={164} w={130} h={40} label="PostgreSQL (RDS)" sub="Encrypted, Multi-AZ" />
        <PArrow x1={430} y1={184} x2={460} y2={184} />
        <PBox x={460} y={164} w={110} h={40} label="Redis Sessions" sub="Token Cache 24h" />
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
    <h2 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>How Discovery, Trending & Communities Work</h2>
    <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 660, margin: "0 0 36px 0" }}>The core differentiator — surfacing emerging talent across categories.</p>
    <Card style={{marginBottom:32,overflowX:"auto"}}>
      <div style={{fontSize:10,fontWeight:700,color:DARK,letterSpacing:2,textTransform:"uppercase",marginBottom:20,fontFamily:"'JetBrains Mono',monospace"}}>FIG. 3 — TRENDING / VIRALITY + COMMUNITY + EVENT SYSTEM</div>
      <svg viewBox="0 0 840 260" style={{width:"100%",maxWidth:840}}>
        <defs><marker id="pa3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
        <PBox x={10} y={10} w={140} h={44} label="User Interaction" sub="View, Like, Share, Save" />
        <PArrow x1={150} y1={32} x2={180} y2={32} />
        <PBox x={180} y={10} w={130} h={44} label="Kafka Event Bus" sub="Real-time Events" />
        <PArrow x1={310} y1={32} x2={340} y2={32} />
        <PBox x={340} y={10} w={150} h={44} label="Trending Worker" sub="Score Calc (60s)" />
        <PArrow x1={490} y1={32} x2={520} y2={32} />
        <PBox x={520} y={10} w={140} h={44} label="Redis Sorted Sets" sub="Category Rankings" />
        <PArrow x1={660} y1={32} x2={690} y2={32} />
        <PBox x={690} y={10} w={130} h={44} label="Feed Service" sub="Serve to Users" />
        <rect x={10} y={68} width={810} height={44} fill="#f8fafc" stroke="#334155" strokeWidth={0.75} rx={3} />
        <text x={25} y={86} style={{fontSize:9,fontWeight:"600",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>FORMULA: Score = (Views x 1) + (Likes x 2) + (Comments x 3) + (Shares x 5) + (Saves x 4) * e^(-0.1 * hours_since_post)</text>
        <text x={25} y={102} style={{fontSize:8,fill:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Content exceeding category-median + 2 std deviations enters Trending. Re-calculated every 60 seconds per category.</text>
        <text x={10} y={136} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>COMMUNITY LIFECYCLE</text>
        <PBox x={10} y={142} w={110} h={36} label="Create" sub="Founder Action" />
        <PArrow x1={120} y1={160} x2={145} y2={160} />
        <PBox x={145} y={142} w={110} h={36} label="Community Svc" sub="CRUD + Members" />
        <PArrow x1={255} y1={160} x2={280} y2={160} />
        <PBox x={280} y={142} w={110} h={36} label="PostgreSQL" sub="Roles, Members" />
        <PArrow x1={390} y1={160} x2={415} y2={160} />
        <PBox x={415} y={142} w={110} h={36} label="Activity Feed" sub="MongoDB" />
        <PArrow x1={525} y1={160} x2={550} y2={160} />
        <PBox x={550} y={142} w={100} h={36} label="WebSocket" sub="Real-time Chat" />
        <PArrow x1={650} y1={160} x2={675} y2={160} />
        <PBox x={675} y={142} w={90} h={36} label="Moderation" sub="AI + Manual" />
        <text x={10} y={204} style={{fontSize:9,fontWeight:"700",fill:"#1e293b",fontFamily:"'DM Sans',sans-serif"}}>EVENT LIFECYCLE</text>
        <PBox x={10} y={210} w={110} h={36} label="Create Event" sub="Founder / Comm." />
        <PArrow x1={120} y1={228} x2={145} y2={228} />
        <PBox x={145} y={210} w={100} h={36} label="Event Svc" sub="Validate + Store" />
        <PArrow x1={245} y1={228} x2={270} y2={228} />
        <PBox x={270} y={210} w={100} h={36} label="ElasticSearch" sub="Geo + Category" />
        <PArrow x1={370} y1={228} x2={395} y2={228} />
        <PBox x={395} y={210} w={90} h={36} label="RSVP Engine" sub="Capacity Mgmt" />
        <PArrow x1={485} y1={228} x2={510} y2={228} />
        <PBox x={510} y={210} w={100} h={36} label="Notification" sub="Push + Cal Sync" />
        <PArrow x1={610} y1={228} x2={635} y2={228} />
        <PBox x={635} y={210} w={100} h={36} label="Post-Event" sub="Analytics + Media" />
        <PArrow x1={735} y1={228} x2={755} y2={228} />
        <PBox x={755} y={210} w={70} h={36} label="Archive" sub="S3 + DB" />
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
      <svg viewBox="0 0 840 100" style={{width:"100%",maxWidth:840}}>
        <defs><marker id="pa4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
        <PBox x={10} y={10} w={90} h={44} label="Developer" sub="Git Push" />
        <PArrow x1={100} y1={32} x2={120} y2={32} />
        <PBox x={120} y={10} w={90} h={44} label="GitHub" sub="Source" />
        <PArrow x1={210} y1={32} x2={230} y2={32} />
        <PBox x={230} y={10} w={110} h={44} label="GitHub Actions" sub="CI: Lint + Test" />
        <PArrow x1={340} y1={32} x2={360} y2={32} />
        <PBox x={360} y={10} w={100} h={44} label="Docker Build" sub="Container" />
        <PArrow x1={460} y1={32} x2={480} y2={32} />
        <PBox x={480} y={10} w={90} h={44} label="AWS ECR" sub="Registry" />
        <PArrow x1={570} y1={32} x2={590} y2={32} />
        <PBox x={590} y={10} w={110} h={44} label="ECS Fargate" sub="Blue/Green" />
        <PArrow x1={700} y1={32} x2={720} y2={32} />
        <PBox x={720} y={10} w={60} h={44} label="LIVE" sub="Production" />
        <PBox x={10} y={64} w={110} h={30} label="Terraform (IaC)" />
        <PBox x={130} y={64} w={110} h={30} label="Auto-Scaling" />
        <PBox x={250} y={64} w={110} h={30} label="Rate Limiting" />
        <PBox x={370} y={64} w={110} h={30} label="Health Checks" />
        <PBox x={490} y={64} w={130} h={30} label="Canary Releases" />
        <PBox x={630} y={64} w={150} h={30} label="Instant Rollback" />
      </svg>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      {[{icon:Icon.shield,t:"DevSecOps & Data Security",items:["OWASP Top 10 compliance at WAF layer","AES-256 at rest, TLS 1.3 in transit","Bcrypt (factor 12), JWT + refresh rotation","AWS Secrets Manager — zero hardcoded creds","GDPR-aligned: export, deletion, consent","Dependency scanning (Snyk) on every PR"]},{icon:Icon.server,t:"Site Reliability Engineering",items:["99.9% uptime SLO, automated alerting","Auto-scale: 70% CPU out, 30% in (2-20 instances)","Viral surge: pre-warmed CDN, Redis auto-expand","API p99 < 200ms, CDN TTFB < 50ms India","PgBouncer connection pooling, read replicas","Chaos engineering in staging"]},{icon:Icon.globe,t:"Traffic & Latency Management",items:["CloudFront 30+ Indian PoPs, sub-50ms","API caching at edge for public endpoints","HTTP/2, keep-alive, image WebP conversion","Route 53 DNS failover, multi-region","Mobile offline-first with SQLite sync","Lazy loading, responsive srcset"]},{icon:Icon.database,t:"Deployment Strategy",items:["Blue/Green via ECS — zero downtime","Feature flags for progressive rollout","Staging mirrors production 1:1","Flyway DB migrations — versioned, reversible","Canary: 5% then 25% then 100% with auto-rollback","Weekly sprints, bi-weekly releases, <30min hotfix"]}].map((s,i)=>(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{color:BLUE}}>{s.icon}</span><span style={{fontSize:14,fontWeight:700,color:DARK}}>{s.t}</span></div>{s.items.map((it,j)=>(<div key={j} style={{display:"flex",gap:10,marginBottom:8,fontSize:12,color:T1,lineHeight:1.6}}><span style={{marginTop:1,flexShrink:0}}>{Icon.check}</span><span>{it}</span></div>))}</Card>))}
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
      {[{icon:Icon.globe,l:"Portfolio",v:"uddit.site"},{icon:Icon.mail,l:"Email",v:"udditalerts247@gmail.com"},{icon:Icon.phone,l:"Phone",v:"+91 7456 886 877 / +91 8368 824 707"},{icon:Icon.link,l:"LinkedIn",v:"linkedin.com/in/lorduddit-"},{icon:Icon.link,l:"GitHub",v:"github.com/UDDITwork"}].map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,fontSize:13}}><span style={{color:BLUE}}>{c.icon}</span><span style={{width:72,fontWeight:600,color:T3,fontSize:11}}>{c.l}</span><span style={{color:T1}}>{c.v}</span></div>))}</Card>
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
      <div><div style={{fontWeight:700,color:T2,marginBottom:6}}>Prepared by Uddit</div><div>uddit.site | udditalerts247@gmail.com</div><div>+91 7456 886 877 | +91 8368 824 707</div><div>LinkedIn: linkedin.com/in/lorduddit-</div><div>GitHub: github.com/UDDITwork</div></div>
      <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:T2,marginBottom:6}}>Prepared For</div><div>Celebso | www.celebso.com</div><div>https://www.linkedin.com/company/celebso/</div><div>Er. Veer Singh (Founder & CEO)</div><div>Pradeep Kumar Bijarniya (Co-Founder)</div></div>
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