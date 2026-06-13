// HeroSection.tsx
// Pure CSS/div hero — no Three.js needed.
// Uses your robot image + CSS keyframe icon burst + float effect.
// Put your robot image in: public/robot.png  (or update ROBOT_IMG below)
// Icons are rendered as emoji chips — swap the content for <img> tags pointing to your /icons folder

import { useEffect, useRef } from "react";
import { Link } from "react-router";

const ROBOT_IMG = "/src/assets/images/rob.png"; // ← point to your robot image

const ICONS = [
  { emoji: "💸", label: "Send money",     tx: "-18px",  ty: "-175px", rot: "-8deg",  fy: "-8px",  delay: "0.05s", floatDelay: "0.7s"  },
  { emoji: "💳", label: "Virtual card",   tx: "95px",   ty: "-155px", rot: "6deg",   fy: "-10px", delay: "0.12s", floatDelay: "1.1s"  },
  { emoji: "📊", label: "Analytics",      tx: "175px",  ty: "-90px",  rot: "10deg",  fy: "-7px",  delay: "0.2s",  floatDelay: "1.5s"  },
  { emoji: "🔒", label: "Security",       tx: "195px",  ty: "20px",   rot: "-5deg",  fy: "-9px",  delay: "0.28s", floatDelay: "0.9s"  },
  { emoji: "🌐", label: "Global",         tx: "145px",  ty: "120px",  rot: "8deg",   fy: "-6px",  delay: "0.36s", floatDelay: "1.3s"  },
  { emoji: "⚡", label: "Instant",        tx: "-105px", ty: "-130px", rot: "-12deg", fy: "-11px", delay: "0.44s", floatDelay: "1.7s"  },
  { emoji: "🛡️", label: "Protection",    tx: "-165px", ty: "-30px",  rot: "4deg",   fy: "-8px",  delay: "0.52s", floatDelay: "0.5s"  },
  { emoji: "💰", label: "Savings",        tx: "50px",   ty: "-210px", rot: "-3deg",  fy: "-9px",  delay: "0.6s",  floatDelay: "2.0s"  },
];

const css = `
  @keyframes robotFloat {
    0%,100%{transform:translateX(-50%) translateY(0)}
    50%{transform:translateX(-50%) translateY(-12px)}
  }
  @keyframes iconBurst {
    0%   { opacity:0; transform:translate(-50%,-50%) scale(0) rotate(0deg) }
    45%  { opacity:1; transform:translate(var(--tx),var(--ty)) scale(1.18) rotate(var(--rot)) }
    65%  { transform:translate(var(--tx),var(--ty)) scale(0.94) rotate(var(--rot)) }
    100% { opacity:1; transform:translate(var(--tx),var(--ty)) scale(1) rotate(var(--rot)) }
  }
  @keyframes iconFloat {
    0%,100%{ transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) translateY(0) scale(1) }
    40%    { transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) translateY(var(--fy)) scale(1.05) }
    70%    { transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) translateY(calc(var(--fy)*-0.4)) scale(0.97) }
  }
  @keyframes burstGlow {
    0%  { opacity:0; transform:translate(-50%,-50%) scale(0.1) }
    30% { opacity:1; transform:translate(-50%,-50%) scale(1) }
    100%{ opacity:0; transform:translate(-50%,-50%) scale(2) }
  }
  @keyframes burstRing {
    0%  { opacity:0.9; transform:translate(-50%,-50%) scale(0) }
    100%{ opacity:0;   transform:translate(-50%,-50%) scale(1) }
  }
  @keyframes sparkle {
    0%  { opacity:0; transform:translate(-50%,-50%) scale(0) rotate(0deg) }
    20% { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(45deg) }
    100%{ opacity:0; transform:translate(calc(-50% + var(--sx)),calc(-50% + var(--sy))) scale(0) rotate(200deg) }
  }
  .hero-icon {
    position:absolute; left:50%; top:50%;
    width:52px; height:52px; border-radius:14px;
    display:flex; align-items:center; justify-content:center;
    font-size:24px; opacity:0; pointer-events:none; z-index:10;
    background:linear-gradient(135deg,rgba(25,38,90,0.93),rgba(15,25,65,0.96));
    box-shadow:0 8px 28px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(110,160,255,0.18);
  }
  .hero-icon.active {
    animation:
      iconBurst 0.72s cubic-bezier(.22,1.45,.36,1) forwards var(--delay),
      iconFloat 3.8s ease-in-out infinite var(--float-delay);
  }
`;

export default function Hero() {
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const glowRef  = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const launched = useRef(false);

  function spawnSparkles() {
    const cont = sparkRef.current;
    if (!cont) return;
    cont.innerHTML = "";
    const chars = ["✦","✧","★","·","⋆","✴"];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist  = 55 + Math.random() * 45;
      const el    = document.createElement("div");
      el.textContent = chars[i % chars.length];
      el.style.cssText = `
        position:absolute;left:0;top:0;
        font-size:${10 + Math.random() * 9}px;
        color:rgba(160,210,255,0.95);
        --sx:${Math.cos(angle)*dist}px;
        --sy:${Math.sin(angle)*dist}px;
        animation:sparkle 0.95s ease-out forwards ${i*0.065}s;
        pointer-events:none;
      `;
      cont.appendChild(el);
    }
    setTimeout(() => { if (cont) cont.innerHTML = ""; }, 1400);
  }

  function triggerBurst() {
    if (launched.current) return;
    launched.current = true;

    [glowRef, ring1Ref, ring2Ref].forEach((r, i) => {
      if (!r.current) return;
      const anims = ["burstGlow 0.95s ease-out forwards","burstRing 0.75s ease-out forwards","burstRing 1.0s ease-out 0.1s forwards"];
      r.current.style.animation = anims[i];
    });
    spawnSparkles();

    iconsRef.current.forEach((el) => {
      if (!el) return;
      el.classList.remove("active");
      void el.offsetWidth;
      el.classList.add("active");
    });
  }

  useEffect(() => {
    const t = setTimeout(triggerBurst, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>
      <section style={{
        position:"relative", minHeight:"100vh", display:"flex", alignItems:"center",
        overflow:"hidden",
        background:"linear-gradient(135deg,#0d0f23 0%,#111433 50%,#0a0d1e 100%)"
      }}>
        {/* dot grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(60,80,200,0.13) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none"}} />
        {/* glow blob */}
        <div style={{position:"absolute",top:-100,right:-60,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(50,100,255,0.1) 0%,transparent 70%)",pointerEvents:"none"}} />

        <div style={{position:"relative",zIndex:5,width:"100%",maxWidth:1280,margin:"0 auto",padding:"80px 48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>

          {/* ─ LEFT: text ─ */}
          <div style={{display:"flex",flexDirection:"column",gap:20,maxWidth:460}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(60,100,255,0.14)",border:"1px solid rgba(80,140,255,0.28)",color:"#7eb3ff",padding:"6px 16px",borderRadius:99,fontSize:12,fontWeight:600,width:"fit-content"}}>
              ✦ AI-powered financial ecosystem
            </span>
            <h1 style={{fontSize:"clamp(2rem,4vw,3.4rem)",fontWeight:900,color:"#fff",lineHeight:1.06,letterSpacing:"-0.02em",margin:0}}>
              Smart Digital{" "}
              <span style={{background:"linear-gradient(90deg,#5b8eff,#00d4ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Wallet</span>
              <br />For Modern Finance
            </h1>
            <p style={{fontSize:14,color:"rgba(200,215,255,0.65)",lineHeight:1.65,margin:0}}>
              Send money globally, manage virtual cards, track spending, and automate payments through one intelligent financial platform.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link to="/wallet" style={{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#3a6bff,#1a44cc)",color:"#fff",padding:"12px 24px",borderRadius:12,fontWeight:700,fontSize:14,textDecoration:"none",boxShadow:"0 4px 24px rgba(58,107,255,0.42)"}}>
                Launch Wallet ↗
              </Link>
              <button style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",color:"#d0deff",padding:"12px 20px",borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer"}}>
                ▶ Watch Demo
              </button>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["🛡 Bank-level Security","📊 Real-time Analytics","🌐 Global Transfers"].map(t=>(
                <span key={t} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(200,215,255,0.72)",padding:"5px 12px",borderRadius:8,fontSize:12}}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ─ RIGHT: robot + icons ─ */}
          <div style={{position:"relative",height:"clamp(400px,60vh,640px)"}}>

            {/* burst glow */}
            <div ref={glowRef} style={{position:"absolute",left:"62%",top:"36%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(110,180,255,0.55) 0%,rgba(70,120,255,0.18) 45%,transparent 70%)",transform:"translate(-50%,-50%) scale(0)",opacity:0,pointerEvents:"none",zIndex:3}} />
            <div ref={ring1Ref} style={{position:"absolute",left:"62%",top:"36%",width:170,height:170,borderRadius:"50%",border:"2.5px solid rgba(120,200,255,0.8)",transform:"translate(-50%,-50%) scale(0)",opacity:0,pointerEvents:"none",zIndex:3}} />
            <div ref={ring2Ref} style={{position:"absolute",left:"62%",top:"36%",width:240,height:240,borderRadius:"50%",border:"1.5px solid rgba(80,160,255,0.4)",transform:"translate(-50%,-50%) scale(0)",opacity:0,pointerEvents:"none",zIndex:3}} />
            {/* sparkles anchor */}
            <div ref={sparkRef} style={{position:"absolute",left:"62%",top:"36%",zIndex:5,pointerEvents:"none"}} />

            {/* ground shadow */}
            <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:180,height:22,background:"radial-gradient(ellipse,rgba(60,100,255,0.22) 0%,transparent 75%)",filter:"blur(6px)"}} />

            {/* robot image */}
            <img
              src={ROBOT_IMG}
              alt="SPARK7 robot holding a phone"
              onLoad={() => { launched.current = false; setTimeout(triggerBurst, 300); }}
              style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",height:"92%",objectFit:"contain",objectPosition:"bottom center",filter:"drop-shadow(0 20px 60px rgba(30,80,255,0.35)) drop-shadow(0 0 40px rgba(0,180,255,0.14))",animation:"robotFloat 4s ease-in-out infinite",zIndex:2}}
            />

            {/* floating icon chips */}
            {ICONS.map((ic, i) => (
              <div
                key={i}
                ref={el => { if(el) iconsRef.current[i]=el; }}
                className="hero-icon"
                title={ic.label}
                style={{
                  "--tx": ic.tx,
                  "--ty": ic.ty,
                  "--rot": ic.rot,
                  "--fy": ic.fy,
                  "--delay": ic.delay,
                  "--float-delay": ic.floatDelay,
                } as React.CSSProperties}
              >
                {ic.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}