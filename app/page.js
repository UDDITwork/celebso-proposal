"use client";
import { useState, useEffect, useRef } from "react";

import { createContext, useContext } from "react";

function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth <= bp);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, [bp]);
  return m;
}

const MobileCtx = createContext(false);
function useM() { return useContext(MobileCtx); }

const BLUE = "#1e40af";
const DARK = "#0f172a";
const BODY = "#475569";
const MUTED = "#94a3b8";
const BG1 = "#ffffff";
const BG2 = "#f8fafc";
const BORDER = "#e2e8f0";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'DM Sans', sans-serif";

const FOUNDER_IMG = {
  VS: "https://media.licdn.com/dms/image/v2/D5603AQFnVv7ZC-7IbQ/profile-displayphoto-crop_800_800/B56Zj0dwjxHMAU-/0/1756448099488?e=1775692800&v=beta&t=mxJCAAV3GRZ57p9Qz-kwy5JbFcFOdnSgENhFrZCuWUk",
  PK: "https://media.licdn.com/dms/image/v2/D4D03AQH2euhHgPN0Hw/profile-displayphoto-crop_800_800/B4DZg3CmJ_GQAI-/0/1753270087786?e=1775692800&v=beta&t=zlvB39BzIG2QtyUA9y1WnHJ0IBZBDNrRdrD2CovnsNw",
  LOGO: "https://media.licdn.com/dms/image/v2/D4E0BAQHm9DpoFlZFRA/company-logo_200_200/company-logo_200_200/0/1722409452704/celebso_logo?e=2147483647&v=beta&t=kJpje4OQHM8q6iwGSUJomXYAEaKe3CNBdkFyyrwK3Aw",
};

function Img({ src, size = 48, alt = "" }) {
  return <img src={src} alt={alt} width={size} height={size} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />;
}

function Sec({ children, bg = BG1, id }) {
  return <div id={id} style={{ padding: "var(--sec-pad) 0", background: bg }}><div style={{ maxWidth: 960, margin: "0 auto", padding: "0 var(--pad)" }}>{children}</div></div>;
}

function Label({ text }) {
  return <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: MUTED, fontFamily: MONO, marginBottom: 20 }}>{text}</div>;
}

function Pill({ children }) {
  return <span style={{ display: "inline-block", padding: "4px 12px", background: BG2, borderRadius: 20, fontSize: 11, fontWeight: 500, color: BODY, marginRight: 8, marginBottom: 8, border: "1px solid " + BORDER }}>{children}</span>;
}

function PBox({ x, y, w, h, label, sub, fill }) {
  return (<g>
    <rect x={x} y={y} width={w} height={h} fill={fill||"#fff"} stroke="#334155" strokeWidth={0.75} rx={3} />
    <text x={x+w/2} y={y+(sub?h/2-5:h/2+1)} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: sub?10:9.5, fontWeight:"600", fill:"#1e293b", fontFamily:SANS }}>{label}</text>
    {sub && <text x={x+w/2} y={y+h/2+9} textAnchor="middle" dominantBaseline="middle" style={{ fontSize:8, fill:"#64748b", fontFamily:SANS }}>{sub}</text>}
  </g>);
}
function PArrow({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth={0.75} markerEnd="url(#pa)" />;
}

/* ===== COVER ===== */
function S_Cover() {
  const m = useM();
  return (<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: m ? "80px 20px" : "80px 48px", position: "relative", background: BG1 }}>
    {!m && <img src="/vectors/partnership.png" alt="" style={{ position: "absolute", right: 48, bottom: 80, width: 300, opacity: 0.7, pointerEvents: "none" }} />}
    <div style={{ position: "absolute", top: m ? 20 : 40, left: m ? 20 : 48, display: "flex", alignItems: "center", gap: 14 }}>
      <img src={FOUNDER_IMG.LOGO} alt="Celebso" width={28} height={28} style={{ borderRadius: 6 }} />
      <span style={{ fontWeight: 700, fontSize: 18, color: DARK, letterSpacing: "-0.3px" }}>CELEBSO</span>
      {!m && <span style={{ fontSize: 9, color: MUTED, fontFamily: MONO, letterSpacing: 2, marginLeft: 8 }}>CONFIDENTIAL</span>}
    </div>
    <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: m ? 10 : 11, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: MUTED, marginBottom: m ? 20 : 32, fontFamily: MONO }}>Technical Proposal</div>
      <h1 style={{ fontSize: m ? 32 : 56, fontWeight: 300, color: DARK, lineHeight: 1.08, margin: "0 0 20px 0", letterSpacing: m ? "-1px" : "-2px" }}>
        Building India's Stage for 100 Million+ <span style={{ fontWeight: 700, color: BLUE }}>Dreamers</span>
      </h1>
      <p style={{ fontSize: m ? 15 : 17, color: BODY, lineHeight: 1.9, maxWidth: 520, margin: m ? "0 0 36px 0" : "0 0 56px 0" }}>
        A comprehensive technical blueprint and development partnership proposal for Celebso — where LinkedIn meets Instagram, purpose-built for India's creator and startup ecosystem.
      </p>
      <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: m ? 20 : 32, marginBottom: m ? 32 : 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={FOUNDER_IMG.VS} size={44} alt="Er. Veer Singh" />
          <div><div style={{ fontSize: 14, fontWeight: 600, color: DARK }}>Er. Veer Singh</div><div style={{ fontSize: 12, color: MUTED }}>Founder & CEO</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={FOUNDER_IMG.PK} size={44} alt="Pradeep Kumar Bijarniya" />
          <div><div style={{ fontSize: 14, fontWeight: 600, color: DARK }}>Pradeep Kumar Bijarniya</div><div style={{ fontSize: 12, color: MUTED }}>Co-Founder</div></div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: m ? 20 : 56, paddingTop: 24, borderTop: "1px solid " + BORDER }}>
        {[{l:"Prepared By",v:"Uddit",s:"AI Engineer & Full Stack Developer"},{l:"Date",v:"18 March 2026",s:"REF: CBL-2026-0318"},{l:"Profile",v:"celebso.com",s:"linkedin.com/company/celebso"}].map((d,i)=>(<div key={i}><div style={{fontSize:9,fontWeight:600,letterSpacing:2,color:MUTED,textTransform:"uppercase",marginBottom:4,fontFamily:MONO}}>{d.l}</div><div style={{fontSize:14,fontWeight:600,color:DARK}}>{d.v}</div><div style={{fontSize:12,color:BODY,marginTop:2}}>{d.s}</div></div>))}
      </div>
    </div>
  </div>);
}

/* ===== VISION ===== */
function S_Alignment() {
  const quotes = [
    {author:"Er. Veer Singh",role:"Founder & CEO",img:FOUNDER_IMG.VS,text:"Celebso is not just a platform. It's a movement. In a world where talent struggles to be seen, Celebso is being built to change the spotlight.",date:"Mar 2026",src:"LinkedIn"},
    {author:"Celebso",role:"Company Page",img:FOUNDER_IMG.LOGO,text:"Find the right co-founder, investors and build valuable industry connections. The world's first social media platform designed to seamlessly connect entrepreneurs, co-founders, and investors.",date:"Mar 2025",src:"LinkedIn"},
    {author:"Er. Veer Singh",role:"Founder & CEO",img:FOUNDER_IMG.VS,text:"In the new Work-Based Economy, Celebso is your launchpad. Show your skills. Get noticed. Become a star. Not just looks. Not just likes. Real Work = Real Fame.",date:"Aug 2025",src:"LinkedIn"},
    {author:"Pradeep Kumar Bijarniya",role:"Co-Founder",img:FOUNDER_IMG.PK,text:"Not long ago, Celebso was just a vision — a platform where entrepreneurs, investors, creators, and brands could come together. We didn't just build a brand. We built a belief system.",date:"Aug 2025",src:"LinkedIn"},
  ];
  const m = useM();
  return (<Sec bg={BG2} id="vision">
    <Label text="01 — Vision Alignment" />
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <img src="/vectors/community.png" alt="" style={{ width: "100%", maxWidth: 640, opacity: 0.85 }} />
    </div>
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 16px 0", lineHeight: 1.2, letterSpacing: "-1px" }}>We've Studied Your Journey.<br/><span style={{ fontWeight: 700 }}>We Understand Your Vision.</span></h2>
    <p style={{ fontSize: 15, color: BODY, lineHeight: 1.9, maxWidth: 600, margin: "0 0 48px 0" }}>Before writing a single line of code, we conducted a thorough audit of Celebso's public presence, founder communications, and strategic positioning over the past 12+ months.</p>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 24 : 32 }}>
      {quotes.map((q,i)=>(<div key={i} style={{ paddingBottom: 24, borderBottom: "1px solid " + BORDER }}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <Img src={q.img} size={36} alt={q.author} />
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:DARK}}>{q.author}</div><div style={{fontSize:11,color:MUTED}}>{q.role}</div></div>
          <span style={{fontSize:10,color:MUTED,fontFamily:MONO}}>{q.date}</span>
        </div>
        <p style={{fontSize:14,color:BODY,lineHeight:1.8,margin:0,paddingLeft:m ? 0 : 48,fontStyle:"italic"}}>"{q.text}"</p>
      </div>))}
    </div>
  </Sec>);
}

/* ===== MARKET ===== */
function S_Market() {
  const m = useM();
  return (<Sec id="market">
    <Label text="02 — Market Landscape" />
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 36px 0", letterSpacing: "-1px" }}>The White Space <span style={{ fontWeight: 700 }}>Celebso Fills</span></h2>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: m ? 24 : 48, marginBottom: m ? 36 : 56 }}>
      {[{m:"$100B+",l:"Creator economy by 2030"},{m:"100M+",l:"Creators in India"},{m:"900M+",l:"Internet users"},{m:"Zero",l:"Platforms unifying LinkedIn + Instagram for India"}].map((d,i)=>(<div key={i}><div style={{fontSize: m ? 28 : 36,fontWeight:800,color:BLUE,letterSpacing:"-1px"}}>{d.m}</div><div style={{fontSize:13,color:BODY,marginTop:6,lineHeight:1.5}}>{d.l}</div></div>))}
    </div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
      <thead><tr style={{borderBottom:"2px solid "+DARK}}>
        {["Platform","Focus","Gap Celebso Fills"].map(h=><th key={h} style={{textAlign:"left",padding:"14px 0",fontWeight:600,fontSize:11,letterSpacing:1,textTransform:"uppercase",color:DARK}}>{h}</th>)}
      </tr></thead>
      <tbody>{[["LinkedIn","Professional networking","No creator content, no video, not built for India's vernacular talent"],["Instagram","Visual content & reels","No professional networking, no community structure, no events"],["ShareChat / Moj","Regional short-form video","Entertainment-only, no professional or startup layer"],["TagMango","Creator monetization","Tool-based, not a social platform"],["Kofluence","Brand-creator matching","B2B marketplace, not consumer social"]].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid "+BORDER}}>{r.map((c,j)=><td key={j} style={{padding:"14px 16px 14px 0",color:j===0?DARK:BODY,fontWeight:j===0?600:400}}>{c}</td>)}</tr>))}</tbody>
    </table>
  </Sec>);
}

/* ===== PRODUCT ===== */
function S_Product() {
  const m = useM();
  const f=[{t:"Categorized Content Feed",d:"Music, comedy, tech, startups, art — each with trending. AI-driven ranking surfaces emerging talent by category."},{t:"Video & Reels Engine",d:"Short-form reels, long-form video, images, text. Vertical swipe player. HLS adaptive bitrate (240p-1080p). Per-reel analytics."},{t:"Community Layer",d:"Discoverable communities — AI builders, filmmakers, hip-hop. Any founder can create. Activity feeds, member directories, moderation."},{t:"Events Ecosystem",d:"Event listing, RSVP, attendee profiles, community-hosted events. Search by category, city, price. Calendar integration."},{t:"Creator Hub & Profiles",d:"Portfolio, skill tags, collaboration history, endorsements. Verified badges. Content analytics dashboard."},{t:"Founder & Startup Hub",d:"Event/community pages by founders. Co-founder discovery, investor connections. DMs for collaboration."}];
  return (<Sec bg={BG2} id="product">
    <Label text="03 — Product Blueprint" />
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 36px 0", letterSpacing: "-1px" }}>Where LinkedIn Meets Instagram —<br/><span style={{ fontWeight: 700 }}>Purpose-Built for India</span></h2>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr 1fr", gap: 28, marginBottom: m ? 36 : 56 }}>
      {[{src:"/vectors/content-feed.png",label:"Categorized Feed"},{src:"/vectors/reels-player.png",label:"Video & Reels"},{src:"/vectors/creator-profile.png",label:"Creator Profiles"}].map((v,i)=>(<div key={i} style={{textAlign:"center"}}>
        <img src={v.src} alt={v.label} style={{width:"100%",maxWidth:200,margin:"0 auto 14px",display:"block"}} />
        <div style={{fontSize:13,fontWeight:600,color:DARK}}>{v.label}</div>
      </div>))}
    </div>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {f.map((feat,i)=>(<div key={i} style={{ marginBottom: 36, display: "flex", gap: m ? 16 : 24, alignItems: "flex-start" }}>
        <div style={{ fontSize: m ? 32 : 48, fontWeight: 200, color: BLUE, lineHeight: 1, flexShrink: 0, width: m ? 40 : 56, textAlign: "right", fontFamily: MONO }}>{String(i+1).padStart(2,"0")}</div>
        <div><div style={{ fontSize: m ? 17 : 20, fontWeight: 700, color: DARK, marginBottom: 6 }}>{feat.t}</div><p style={{ fontSize: 14, color: BODY, lineHeight: 1.8, margin: 0 }}>{feat.d}</p></div>
      </div>))}
    </div>
  </Sec>);
}

/* ===== ARCHITECTURE ===== */
function S_Arch() {
  const m = useM();
  return (<Sec id="arch">
    <Label text="04 — System Architecture" />
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 12px 0", letterSpacing: "-1px" }}>Production-Grade <span style={{ fontWeight: 700 }}>System Architecture</span></h2>
    <p style={{ fontSize: 15, color: BODY, lineHeight: 1.9, maxWidth: 560, margin: "0 0 40px 0" }}>Horizontal scalability, low-latency content delivery, millions of concurrent users.</p>
    <div style={{overflowX:"auto",marginBottom:48}}>
      <svg viewBox="0 0 880 720" style={{width:"100%",maxWidth:880}}>
        <defs><marker id="pa" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155" /></marker></defs>
        <rect x={20} y={10} width={540} height={95} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Client Layer 101</text>
        <PBox x={30} y={34} w={120} h={36} label="iOS App 101A" sub="React Native" />
        <PBox x={158} y={34} w={120} h={36} label="Android App 101B" sub="React Native" />
        <PBox x={286} y={34} w={130} h={36} label="Web App 101C" sub="Next.js / React" />
        <PBox x={424} y={34} w={126} h={36} label="Admin Panel 101D" sub="React + Tailwind" />
        <rect x={600} y={10} width={260} height={95} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={26} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Content Delivery 102</text>
        <PBox x={610} y={34} w={240} h={36} label="AWS CloudFront CDN 102A" sub="30+ Indian Edge PoPs" />
        <PArrow x1={290} y1={105} x2={290} y2={125} />
        <PArrow x1={730} y1={105} x2={730} y2={125} />
        <rect x={20} y={125} width={840} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={141} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>API Gateway + Security 103</text>
        <PBox x={30} y={149} w={150} h={32} label="API Gateway 103A" sub="REST + GraphQL" />
        <PBox x={188} y={149} w={120} h={32} label="WAF 103B" sub="DDoS + IP Filter" />
        <PBox x={316} y={149} w={120} h={32} label="Rate Limiter 103C" sub="Throttling" />
        <PBox x={444} y={149} w={140} h={32} label="JWT Validator 103D" sub="Auth + Token" />
        <PBox x={592} y={149} w={130} h={32} label="Route 53 DNS 103E" sub="Failover" />
        <PBox x={730} y={149} w={120} h={32} label="Load Balancer 103F" sub="ALB" />
        <PArrow x1={430} y1={205} x2={430} y2={228} />
        <rect x={20} y={228} width={840} height={118} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={244} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Microservices 104 — AWS ECS Fargate</text>
        <PBox x={30} y={252} w={115} h={44} label="User Service 104A" sub="Auth + Profiles" />
        <PBox x={153} y={252} w={115} h={44} label="Feed Service 104B" sub="Algo + Ranking" />
        <PBox x={276} y={252} w={115} h={44} label="Video Service 104C" sub="Upload + HLS" />
        <PBox x={399} y={252} w={115} h={44} label="Community 104D" sub="Groups + Chat" />
        <PBox x={522} y={252} w={105} h={44} label="Event Svc 104E" sub="RSVP + Listing" />
        <PBox x={635} y={252} w={105} h={44} label="Search Svc 104F" sub="Full-Text" />
        <PBox x={748} y={252} w={102} h={44} label="Notify Svc 104G" sub="Push + Email" />
        <PBox x={30} y={304} w={115} h={32} label="Analytics 104H" sub="Metrics" />
        <PBox x={153} y={304} w={115} h={32} label="Chat Svc 104I" sub="WebSocket" />
        <PBox x={276} y={304} w={115} h={32} label="Creator Hub 104J" sub="Portfolio" />
        <PBox x={399} y={304} w={115} h={32} label="Moderation 104K" sub="AI + Manual" />
        <PArrow x1={430} y1={346} x2={430} y2={370} />
        <rect x={20} y={370} width={540} height={75} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={386} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Event Bus 105</text>
        <PBox x={30} y={394} w={160} h={36} label="Kafka 105A" sub="Event Stream" />
        <PBox x={198} y={394} w={160} h={36} label="SQS 105B" sub="Task Queue" />
        <PBox x={366} y={394} w={184} h={36} label="SNS 105C" sub="Pub/Sub" />
        <rect x={600} y={370} width={260} height={75} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={386} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Cache 106</text>
        <PBox x={610} y={394} w={120} h={36} label="Redis 106A" sub="Sessions + Feed" />
        <PBox x={738} y={394} w={112} h={36} label="Edge Cache 106B" sub="CDN TTL" />
        <PArrow x1={290} y1={445} x2={290} y2={470} />
        <PArrow x1={730} y1={445} x2={730} y2={470} />
        <rect x={20} y={470} width={540} height={110} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={486} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Data Layer 107</text>
        <PBox x={30} y={494} w={125} h={40} label="PostgreSQL 107A" sub="Users, Events" />
        <PBox x={163} y={494} w={125} h={40} label="MongoDB 107B" sub="Posts, Comments" />
        <PBox x={296} y={494} w={125} h={40} label="ElasticSearch 107C" sub="Search" />
        <PBox x={429} y={494} w={121} h={40} label="TimescaleDB 107D" sub="Analytics" />
        <rect x={600} y={470} width={260} height={110} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={486} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Media + Storage 108</text>
        <PBox x={610} y={494} w={240} h={32} label="AWS S3 108A" sub="Raw + Processed" />
        <PBox x={610} y={534} w={115} h={32} label="MediaConvert 108B" sub="HLS Transcode" />
        <PBox x={733} y={534} w={117} h={32} label="Rekognition 108C" sub="Moderation" />
        <line x1={290} y1={580} x2={290} y2={600} stroke="#334155" strokeWidth={0.75} />
        <line x1={730} y1={580} x2={730} y2={600} stroke="#334155" strokeWidth={0.75} />
        <line x1={290} y1={600} x2={730} y2={600} stroke="#334155" strokeWidth={0.75} />
        <PArrow x1={510} y1={600} x2={510} y2={620} />
        <rect x={20} y={620} width={840} height={80} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={636} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Monitoring 109</text>
        <PBox x={30} y={644} w={150} h={36} label="CloudWatch 109A" sub="Metrics" />
        <PBox x={188} y={644} w={150} h={36} label="Prometheus 109B" sub="Grafana" />
        <PBox x={346} y={644} w={120} h={36} label="Sentry 109C" sub="Errors" />
        <PBox x={474} y={644} w={130} h={36} label="X-Ray 109D" sub="Tracing" />
        <PBox x={612} y={644} w={120} h={36} label="PagerDuty 109E" sub="Incidents" />
        <PBox x={740} y={644} w={110} h={36} label="ELK 109F" sub="Logs" />
        <text x={440} y={714} textAnchor="middle" style={{fontSize:9,fontWeight:"500",fill:MUTED,fontFamily:SANS}}>FIG. 1 — Celebso Platform: High-Level System Architecture</text>
      </svg>
    </div>
    <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: MUTED, fontFamily: MONO }}>Technology Stack</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
      {["React Native","Next.js 14","TypeScript","Expo","Tailwind CSS","Node.js","Express","Fastify","GraphQL","PostgreSQL","MongoDB Atlas","Redis Cluster","ElasticSearch","AWS ECS Fargate","AWS S3","CloudFront CDN","MediaConvert","SQS / SNS","Apache Kafka","Socket.io","Firebase FCM","Docker","GitHub Actions","Terraform","Sentry","Prometheus","Grafana"].map((t,i)=>(<Pill key={i}>{t}</Pill>))}
    </div>
  </Sec>);
}

/* ===== DATA ===== */
function S_Data() {
  return (<Sec bg={BG2} id="data">
    <Label text="05 — Data & Video Infrastructure" />
    <h2 style={{ fontSize: 36, fontWeight: 300, color: DARK, margin: "0 0 40px 0", letterSpacing: "-1px" }}>Where Every <span style={{ fontWeight: 700 }}>Byte Lives</span></h2>
    <div style={{overflowX:"auto",marginBottom:48}}>
      <svg viewBox="0 0 880 340" style={{width:"100%",maxWidth:880}}>
        <defs><marker id="pa2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
        <rect x={20} y={10} width={840} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={26} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Video Pipeline 201</text>
        <PBox x={30} y={34} w={100} h={36} label="Upload 201A" sub="Video / Reel" />
        <PArrow x1={130} y1={52} x2={148} y2={52} />
        <PBox x={148} y={34} w={100} h={36} label="API 201B" sub="Validate" />
        <PArrow x1={248} y1={52} x2={266} y2={52} />
        <PBox x={266} y={34} w={110} h={36} label="S3 Raw 201C" sub="ap-south-1" />
        <PArrow x1={376} y1={52} x2={394} y2={52} />
        <PBox x={394} y={34} w={120} h={36} label="MediaConvert 201D" sub="HLS Transcode" />
        <PArrow x1={514} y1={52} x2={532} y2={52} />
        <PBox x={532} y={34} w={120} h={36} label="S3 Processed 201E" sub="Multi-bitrate" />
        <PArrow x1={652} y1={52} x2={670} y2={52} />
        <PBox x={670} y={34} w={90} h={36} label="CDN 201F" sub="CloudFront" />
        <PArrow x1={760} y1={52} x2={778} y2={52} />
        <PBox x={778} y={34} w={72} h={36} label="User 201G" sub="Player" />
        <rect x={20} y={115} width={540} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={131} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Social Data 202</text>
        <PBox x={30} y={139} w={100} h={36} label="Post 202A" sub="Create" />
        <PArrow x1={130} y1={157} x2={148} y2={157} />
        <PBox x={148} y={139} w={110} h={36} label="Feed Svc 202B" sub="Rank" />
        <PArrow x1={258} y1={157} x2={276} y2={157} />
        <PBox x={276} y={139} w={110} h={36} label="MongoDB 202C" sub="Posts" />
        <PArrow x1={386} y1={157} x2={404} y2={157} />
        <PBox x={404} y={139} w={146} h={36} label="ElasticSearch 202D" sub="Index" />
        <rect x={600} y={115} width={260} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={131} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Cache 203</text>
        <PBox x={610} y={139} w={115} h={36} label="Feed Cache 203A" sub="TTL 5m" />
        <PBox x={733} y={139} w={117} h={36} label="Session 203B" sub="TTL 24h" />
        <rect x={20} y={220} width={540} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={30} y={236} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Auth Pipeline 204</text>
        <PBox x={30} y={244} w={110} h={36} label="Register 204A" sub="Profile" />
        <PArrow x1={140} y1={262} x2={158} y2={262} />
        <PBox x={158} y={244} w={120} h={36} label="Auth Svc 204B" sub="JWT + OAuth" />
        <PArrow x1={278} y1={262} x2={296} y2={262} />
        <PBox x={296} y={244} w={130} h={36} label="PostgreSQL 204C" sub="Multi-AZ" />
        <PArrow x1={426} y1={262} x2={444} y2={262} />
        <PBox x={444} y={244} w={106} h={36} label="Redis 204D" sub="Sessions" />
        <rect x={600} y={220} width={260} height={90} fill="none" stroke="#334155" strokeWidth={1.2} />
        <text x={610} y={236} style={{fontSize:9,fontWeight:"700",fill:DARK,fontFamily:SANS,letterSpacing:1}}>Real-Time 205</text>
        <PBox x={610} y={244} w={115} h={36} label="WebSocket 205A" sub="Socket.io" />
        <PBox x={733} y={244} w={117} h={36} label="Push 205B" sub="FCM / APNs" />
        <text x={440} y={334} textAnchor="middle" style={{fontSize:9,fontWeight:"500",fill:MUTED,fontFamily:SANS}}>FIG. 2 — Data Flow + Video Pipeline</text>
      </svg>
    </div>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: DARK, marginBottom: 12 }}>Redis Cache Strategy</div>
      <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, margin: 0 }}>Feed cache with 5-minute TTL reduces MongoDB reads by 70%. Session cache at 24h TTL cuts auth DB lookups by 80%. Trending scores update every 60 seconds via background workers. Event RSVP counts use write-through pattern with 2-minute TTL for real-time accuracy.</p>
    </div>
  </Sec>);
}

/* ===== TRENDING ===== */
function S_Trending() {
  const m = useM();
  return (<Sec id="trending">
    <Label text="06 — Discovery & Virality" />
    <div style={{ display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "center", gap: m ? 24 : 40, marginBottom: 48 }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 14px 0", letterSpacing: "-1px" }}>How Trending & <span style={{ fontWeight: 700 }}>Communities Work</span></h2>
        <p style={{ fontSize: 15, color: BODY, lineHeight: 1.9, maxWidth: 480, margin: 0 }}>The core differentiator — surfacing emerging talent across categories with weighted scoring and time-decay algorithms.</p>
      </div>
      {!m && <img src="/vectors/virality.png" alt="" style={{ width: 200, flexShrink: 0, opacity: 0.8 }} />}
    </div>
    <div style={{ maxWidth: 680, margin: "0 auto", padding: m ? "20px 16px" : "28px 32px", background: BG2, borderRadius: 4, marginBottom: 48, fontFamily: MONO, fontSize: m ? 10 : 12, color: BODY, lineHeight: 1.8, overflowX: "auto" }}>
      <div style={{ fontWeight: 600, color: DARK, marginBottom: 8 }}>Virality Formula</div>
      Score = (Views x 1) + (Likes x 2) + (Comments x 3) + (Shares x 5) + (Saves x 4) * e^(-0.1 * hours_since_post)<br/>
      Trending threshold: category-median + 2 standard deviations. Recalculated every 60 seconds.
    </div>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {[{n:"01",t:"Virality Detection",d:"Weighted scoring with time-decay. Per-category trending. Velocity monitoring. Anti-spam heuristics."},{n:"02",t:"Community Governance",d:"Role-based access: Admin, Moderator, Member. ElasticSearch discovery. Activity feeds. Growth analytics per community."},{n:"03",t:"Event Discovery",d:"Geo-indexed search. Category, city, price filters. RSVP with waitlist. Calendar sync. Post-event gallery and analytics."}].map((c,i)=>(<div key={i} style={{ display: "flex", gap: 24, marginBottom: 36, alignItems: "flex-start" }}>
        <div style={{ fontSize: 48, fontWeight: 200, color: BLUE, lineHeight: 1, flexShrink: 0, width: 56, textAlign: "right", fontFamily: MONO }}>{c.n}</div>
        <div><div style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 6 }}>{c.t}</div><p style={{ fontSize: 14, color: BODY, lineHeight: 1.8, margin: 0 }}>{c.d}</p></div>
      </div>))}
    </div>
  </Sec>);
}

/* ===== DEVOPS ===== */
function S_DevOps() {
  const m = useM();
  return (<Sec bg={BG2} id="devops">
    <Label text="07 — DevOps & Security" />
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 36px 0", letterSpacing: "-1px" }}>Deployment, SRE & <span style={{ fontWeight: 700 }}>DevSecOps</span></h2>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {[{t:"DevSecOps & Data Security",d:"OWASP Top 10 compliance at WAF layer. AES-256 at rest, TLS 1.3 in transit. Bcrypt factor 12 with JWT + refresh rotation. AWS Secrets Manager for zero hardcoded credentials. GDPR-aligned data export, deletion, and consent. Dependency scanning via Snyk on every PR."},{t:"Site Reliability Engineering",d:"99.9% uptime SLO with automated alerting. Auto-scale at 70% CPU out, 30% in (2-20 instances). Viral surge handling with pre-warmed CDN and Redis auto-expand. API p99 under 200ms, CDN TTFB under 50ms across India. PgBouncer connection pooling with read replicas."},{t:"Deployment Strategy",d:"Blue/Green deployments via ECS for zero downtime. Feature flags for progressive rollout. Staging mirrors production 1:1. Flyway DB migrations — versioned and reversible. Canary releases: 5%, then 25%, then 100% with automatic rollback. Weekly sprints, bi-weekly releases, under 30 minute hotfix SLA."}].map((s,i)=>(<div key={i} style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 8 }}>{s.t}</div>
        <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, margin: 0 }}>{s.d}</p>
      </div>))}
    </div>
  </Sec>);
}

/* ===== TIMELINE ===== */
function S_Timeline() {
  const m = useM();
  const ph=[{p:"Phase 1 — Foundation",dur:"Weeks 1-4",d:"AWS infrastructure via Terraform. CI/CD pipeline. User service with OAuth 2.0 and JWT. Database schemas for PostgreSQL and MongoDB. React Native scaffold with navigation, design system, and auth. Admin dashboard foundation."},{p:"Phase 2 — Core Platform",dur:"Weeks 5-8",d:"Feed engine with algorithmic ranking and category filters. Video upload pipeline through S3, MediaConvert, HLS, and CDN. Reels player with vertical swipe and adaptive bitrate. Community system. ElasticSearch integration. Push notifications."},{p:"Phase 3 — Growth + Launch",dur:"Weeks 9-12",d:"Events system with RSVP and community hosting. Trending engine with category scoring and virality detection. Real-time chat via WebSocket. Creator analytics dashboard. Security audit and pen testing. App Store submission and soft launch."}];
  return (<Sec id="timeline">
    <Label text="08 — Development Roadmap" />
    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 300, color: DARK, margin: "0 0 36px 0", letterSpacing: "-1px" }}>12-Week <span style={{ fontWeight: 700 }}>MVP Execution Plan</span></h2>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {ph.map((p,i)=>(<div key={i} style={{ display: "flex", gap: 24, marginBottom: 40, alignItems: "flex-start" }}>
        <div style={{ fontSize: 48, fontWeight: 200, color: BLUE, lineHeight: 1, flexShrink: 0, width: 56, textAlign: "right", fontFamily: MONO }}>{String(i+1).padStart(2,"0")}</div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: DARK }}>{p.p}</div>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: MONO }}>{p.dur}</span>
          </div>
          <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, margin: 0 }}>{p.d}</p>
        </div>
      </div>))}
    </div>
  </Sec>);
}

/* ===== TEAM ===== */
function S_Team() {
  return (<Sec bg={BG2} id="team">
    <Label text="09 — About Us" />
    <h2 style={{ fontSize: 36, fontWeight: 300, color: DARK, margin: "0 0 48px 0", letterSpacing: "-1px" }}>Who <span style={{ fontWeight: 700 }}>We Are</span></h2>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 4 }}>Uddit</div>
      <div style={{ fontSize: 14, color: BLUE, fontWeight: 500, marginBottom: 20 }}>AI Engineer & Full Stack Developer — NIT Jaipur '25</div>
      <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, marginBottom: 28 }}>Production-grade AI systems, RAG architectures, scalable platforms. 500+ clients across logistics, education, legal tech, and SaaS.</p>
      <div style={{ fontSize: 13, color: BODY, lineHeight: 2 }}>
        uddit.site &nbsp;&middot;&nbsp; udditalerts247@gmail.com &nbsp;&middot;&nbsp; +91 7456 886 877<br/>
        linkedin.com/in/lorduddit- &nbsp;&middot;&nbsp; github.com/UDDITwork
      </div>
      <div style={{ marginTop: 36, borderTop: "1px solid " + BORDER, paddingTop: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 12 }}>Production Systems</div>
        <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, margin: 0 }}>ShipSarthi (PAN-India logistics, 500+ clients), Zammer (e-commerce), YourCareer (career platform), Richie AI (financial tools), PatFace (AI patent drafting), Sivi Academy (education), Gantavyam (travel), Khandarkar (digital services).</p>
      </div>
    </div>
  </Sec>);
}

/* ===== PRICING ===== */
function S_Engagement() {
  const m = useM();
  return (<><Sec id="terms">
    <Label text="10 — Partnership Terms" />
    <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto", marginBottom: 56 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: MUTED, fontFamily: MONO, marginBottom: 12 }}>Development Cost</div>
      <div style={{ fontSize: m ? 48 : 68, fontWeight: 800, color: DARK, letterSpacing: "-2px", lineHeight: 1 }}>5,00,000</div>
      <div style={{ fontSize: 15, color: BODY, marginTop: 8 }}>INR — Full MVP Development</div>
    </div>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,marginBottom:48}}>
        <thead><tr style={{borderBottom:"2px solid "+DARK}}>
          {["Milestone","Timeline","Deliverables","Amount"].map(h=><th key={h} style={{textAlign:"left",padding:"12px 0",fontWeight:600,fontSize:11,letterSpacing:1,textTransform:"uppercase",color:DARK}}>{h}</th>)}
        </tr></thead>
        <tbody>{[["Kickoff","Day 0","Upfront payment","1,50,000 (30%)"],["Phase 1","Week 4","Infra, auth, scaffold","1,00,000 (20%)"],["Phase 2","Week 8","Feed, video, communities","1,25,000 (25%)"],["Launch","Week 12","Events, trending, launch","1,25,000 (25%)"]].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid "+BORDER}}>{r.map((c,j)=><td key={j} style={{padding:"14px 16px 14px 0",color:j===3?DARK:BODY,fontWeight:j===0||j===3?600:400}}>{c}</td>)}</tr>))}</tbody>
      </table>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 8 }}>What's Included</div>
        <p style={{ fontSize: 14, color: BODY, lineHeight: 1.9, margin: 0 }}>Mobile app (iOS + Android) via React Native, web application (Next.js) with admin dashboard, full AWS backend infrastructure, video/reels pipeline with CDN, community and events and trending systems, ElasticSearch with real-time chat and notifications, CI/CD pipeline and DevOps, security audit with App Store submission, and 2 weeks of post-launch bug fixes.</p>
      </div>
    </div>
  </Sec>
  <div style={{ background: DARK, padding: m ? "64px 20px" : "128px 48px", textAlign: "center" }}>
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <h2 style={{ fontSize: m ? 24 : 36, fontWeight: 300, color: "#ffffff", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>Let's Build Celebso Together</h2>
      <p style={{ fontSize: m ? 14 : 15, color: "#94a3b8", lineHeight: 1.9, margin: "0 0 32px 0" }}>Your vision is validated. The platform is ready to be built. We are ready to build it.</p>
      <div style={{ display: "flex", flexDirection: m ? "column" : "row", justifyContent: "center", gap: m ? 20 : 56, fontSize: 13 }}>
        {[{l:"Schedule",v:"cal.com/uddit-jl3ic4"},{l:"Email",v:"udditalerts247@gmail.com"},{l:"Phone",v:"+91 7456 886 877"}].map((c,i)=>(<div key={i}><div style={{color:"#64748b",fontSize:9,letterSpacing:1,textTransform:"uppercase",marginBottom:4,fontFamily:MONO}}>{c.l}</div><div style={{color:"#e2e8f0",fontWeight:500,fontSize: m ? 12 : 13}}>{c.v}</div></div>))}
      </div>
    </div>
  </div>
  <div style={{ padding: m ? "24px 20px" : "32px 48px", borderTop: "1px solid " + BORDER, display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", gap: m ? 12 : 0, fontSize: 11, color: MUTED, lineHeight: 1.6, background: BG1 }}>
    <div>Prepared by Uddit &middot; uddit.site &middot; linkedin.com/in/lorduddit- &middot; github.com/UDDITwork</div>
    <div>Celebso &middot; celebso.com &middot; Er. Veer Singh &middot; Pradeep Kumar Bijarniya</div>
    <div>REF: CBL-2026-0318 &middot; 18 March 2026</div>
  </div></>);
}

/* ===== LEGAL ===== */
function S_Legal() {
  const m = useM();
  const p = { fontSize: 13, color: "#1e293b", lineHeight: 2, margin: "0 0 18px 0", fontFamily: "Georgia, 'Times New Roman', serif" };
  const h = { fontSize: 13, fontWeight: 700, color: DARK, margin: "32px 0 10px 0", fontFamily: "Georgia, 'Times New Roman', serif" };
  return (<div style={{ padding: m ? "48px 20px" : "96px 48px", background: "#fefefe" }} id="legal">
    <div style={{ maxWidth: 680, margin: "0 auto", border: "1px solid " + BORDER, borderRadius: 2, padding: m ? "32px 20px" : "64px 56px", background: "#ffffff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, paddingBottom: 28, borderBottom: "2px solid " + DARK }}>
        <div><div style={{ fontWeight: 700, fontSize: 18, color: DARK, fontFamily: "Georgia, serif" }}>CELEBSO</div><div style={{ fontSize: 11, color: MUTED, marginTop: 4, fontFamily: "Georgia, serif" }}>Technical Development Partnership</div></div>
        <div style={{ textAlign: "right", fontFamily: "Georgia, serif" }}><div style={{ fontSize: 12, fontWeight: 600, color: DARK }}>18 March 2026</div><div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Ref: CBL-2026-0318/LEG</div></div>
      </div>
      <div style={{ marginBottom: 36, padding: m ? "16px" : "20px 24px", background: "#fafafa", border: "1px solid " + BORDER, display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 20 : 24, fontFamily: "Georgia, serif" }}>
        <div><div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>From (Developer)</div><div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>Uddit</div><div style={{ fontSize: 12, color: BODY, lineHeight: 1.6 }}>AI Engineer & Full Stack Developer<br/>NIT Jaipur, Rajasthan, India<br/>udditalerts247@gmail.com</div></div>
        <div><div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>To (Client)</div><div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>Er. Veer Singh & Pradeep Kumar Bijarniya</div><div style={{ fontSize: 12, color: BODY, lineHeight: 1.6 }}>Celebso (Ooglesoft Private Limited)<br/>Jaipur, Rajasthan, India<br/>www.celebso.com</div></div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 28, fontFamily: "Georgia, serif" }}>Subject: Terms of Engagement, Confidentiality & Intellectual Property Agreement</div>
      <p style={p}>Dear Er. Veer Singh and Mr. Pradeep Kumar Bijarniya,</p>
      <p style={p}>This letter sets forth the binding terms and conditions governing the technical development partnership between the undersigned parties for the Celebso platform. By executing this agreement or commencing work pursuant to the accompanying Technical Proposal (Ref: CBL-2026-0318), both parties acknowledge and agree to be bound by the terms outlined herein.</p>
      <div style={h}>1. Scope of Work</div>
      <p style={p}>The Developer shall design, develop, test, and deploy the Celebso platform as described in the accompanying Technical Proposal, including but not limited to mobile applications for iOS and Android using React Native, a web application built with Next.js, an administrative dashboard, backend microservices architecture on AWS, video/reels pipeline with CDN delivery, community, events, trending, and search systems, and CI/CD pipeline and DevOps infrastructure.</p>
      <div style={h}>2. Project Timeline & Milestones</div>
      <p style={p}>The project shall be executed over twelve (12) weeks from the date of the first milestone payment. Each phase concludes with a deliverable review and milestone payment. Delays caused by the Client shall extend the timeline by an equivalent period without penalty to the Developer.</p>
      <div style={h}>3. Compensation & Payment Terms</div>
      <p style={p}>The total project fee is INR 5,00,000 (Indian Rupees Five Lakhs Only), payable as follows: INR 1,50,000 (30%) upon execution, INR 1,00,000 (20%) upon Phase 1 completion, INR 1,25,000 (25%) upon Phase 2 completion, and INR 1,25,000 (25%) upon final delivery and launch. Late payments exceeding fifteen (15) days shall accrue interest at 1.5% per month.</p>
      <div style={h}>4. Confidentiality & Non-Disclosure</div>
      <p style={p}>Both parties agree to maintain strict confidentiality regarding all proprietary information exchanged during this engagement. This obligation survives termination for three (3) years. Neither party shall disclose such information to any third party without prior written consent.</p>
      <div style={h}>5. Intellectual Property Rights</div>
      <p style={p}>Upon receipt of full payment, all intellectual property rights created specifically for Celebso shall be irrevocably transferred to the Client. The Developer retains the right to reuse general-purpose libraries and non-proprietary tools.</p>
      <div style={h}>6. Warranties & Quality Assurance</div>
      <p style={p}>The Developer warrants that all code shall be original, the platform shall substantially conform to specifications, and a two (2) week post-launch bug-fix period is included. The Developer does not guarantee specific business outcomes or revenue targets.</p>
      <div style={h}>7. Limitation of Liability</div>
      <p style={p}>The Developer's total aggregate liability shall not exceed fees actually paid. The Developer shall not be liable for indirect, incidental, consequential, or punitive damages.</p>
      <div style={h}>8. Change Management</div>
      <p style={p}>Scope changes must be submitted in writing and mutually agreed upon. The Developer shall provide estimates within five (5) business days of receiving change requests.</p>
      <div style={h}>9. Termination</div>
      <p style={p}>Either party may terminate with thirty (30) days written notice. The Client shall pay for all completed work on a pro-rata basis. Advance payments for undelivered milestones shall be refunded within thirty (30) days.</p>
      <div style={h}>10. Non-Solicitation</div>
      <p style={p}>For twelve (12) months following completion, neither party shall solicit or hire key personnel of the other party involved in this project.</p>
      <div style={h}>11. Force Majeure</div>
      <p style={p}>Neither party shall be liable for delays due to circumstances beyond reasonable control, including natural disasters, pandemics, or infrastructure failures.</p>
      <div style={h}>12. Dispute Resolution</div>
      <p style={p}>This agreement shall be governed by Indian law. Disputes shall be resolved through good-faith negotiation, failing which binding arbitration under the Arbitration and Conciliation Act, 1996, conducted in Jaipur, Rajasthan.</p>
      <div style={h}>13. Entire Agreement</div>
      <p style={p}>This letter and the Technical Proposal constitute the entire agreement and supersede all prior communications. No amendment shall be effective unless in writing and signed by both parties.</p>
      <p style={{...p, marginTop: 40}}>We look forward to a productive partnership in building Celebso into a transformative platform for India's creator ecosystem.</p>
      <p style={p}>Yours sincerely,</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 48, paddingTop: 32, borderTop: "1px solid " + BORDER }}>
        <div><div style={{ width: 160, borderBottom: "1px solid " + DARK, marginBottom: 10, paddingBottom: 56 }} /><div style={{ fontSize: 14, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif" }}>Uddit</div><div style={{ fontSize: 12, color: BODY, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>AI Engineer & Full Stack Developer<br/>Date: _______________<br/>Place: _______________</div></div>
        <div><div style={{ width: 160, borderBottom: "1px solid " + DARK, marginBottom: 10, paddingBottom: 56 }} /><div style={{ fontSize: 14, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif" }}>Er. Veer Singh</div><div style={{ fontSize: 12, color: BODY, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>Founder & CEO, Celebso<br/>Date: _______________<br/>Place: _______________</div></div>
      </div>
      <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid " + BORDER, textAlign: "center", fontFamily: "Georgia, serif" }}>
        <div style={{ fontSize: 9, color: MUTED, lineHeight: 1.6 }}>This document is confidential and intended solely for the named addressees.<br/>REF: CBL-2026-0318/LEG &middot; 18 March 2026 &middot; Copyright 2026 Uddit.</div>
      </div>
    </div>
  </div>);
}

/* ===== MAIN ===== */
const SECS=[{id:"cover",label:"Cover"},{id:"vision",label:"Vision"},{id:"market",label:"Market"},{id:"product",label:"Product"},{id:"arch",label:"Architecture"},{id:"data",label:"Data"},{id:"trending",label:"Trending"},{id:"devops",label:"DevOps"},{id:"timeline",label:"Roadmap"},{id:"team",label:"Team"},{id:"terms",label:"Terms"},{id:"legal",label:"Legal"}];

export default function CelebsoProposal() {
  const mobile = useIsMobile();
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

  return (<MobileCtx.Provider value={mobile}><div style={{ fontFamily: SANS, background: BG1, color: BODY, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + BORDER, background: BG1, zIndex: 10, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={FOUNDER_IMG.LOGO} alt="Celebso" width={20} height={20} style={{ borderRadius: 4 }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: DARK }}>CELEBSO</span>
      </div>
      <div className="nav-sections" style={{ display: "flex", gap: 1 }}>
        {SECS.map((s, i) => (<button key={s.id} onClick={() => go(i)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: i === active ? 600 : 400, color: i === active ? DARK : MUTED, background: "transparent", border: "none", cursor: "pointer", fontFamily: SANS, transition: "color 200ms", borderBottom: i === active ? "1.5px solid " + DARK : "1.5px solid transparent" }}>{s.label}</button>))}
      </div>
      <span style={{ fontSize: 10, color: MUTED, fontFamily: MONO }}>18 Mar 2026</span>
    </div>
    <div ref={ref} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
      {[S_Cover, S_Alignment, S_Market, S_Product, S_Arch, S_Data, S_Trending, S_DevOps, S_Timeline, S_Team, S_Engagement, S_Legal].map((Comp, i) => (<div key={i} data-s={SECS[i]?.id}><Comp /></div>))}
    </div>
  </div></MobileCtx.Provider>);
}