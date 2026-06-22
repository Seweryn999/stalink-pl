/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

/** Reusable font-family strings mapped to the next/font CSS variables. */
const FF = "var(--font-grotesk), sans-serif";
const FM = "var(--font-mono), monospace";

const EMAIL = "seweryn.stalinger@stalink.pl";
const PHONE_HREF = "tel:+48531087939";
const PHONE_LABEL = "+48 531 087 939";

const GLOBAL_CSS = `
  #stalink-root { scroll-behavior: smooth; }
  #stalink-root ::selection { background: rgba(34,211,238,.25); color:#fff; }
  #stalink-root [data-reveal] { opacity:0; transform:translateY(34px); will-change:opacity,transform; }
  #stalink-root [data-section] { scroll-margin-top: 90px; }
  @keyframes stl-floaty { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-32px); } }
  @keyframes stl-pulseDot { 0%,100%{ opacity:.4; } 50%{ opacity:1; } }
  @keyframes stl-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes stl-bobArrow { 0%,100%{ transform:translateY(0); opacity:.5;} 50%{ transform:translateY(8px); opacity:1; } }
  @keyframes stl-shimmer { to { background-position:200% center; } }
  @media (max-width:760px){
    #cursor-dot,#cursor-ring{ display:none!important; }
    #stalink-root{ cursor:auto!important; }
    #stalink-root .stl-grid-2 { grid-template-columns:1fr!important; }
    #stalink-root .stl-grid-3 { grid-template-columns:1fr!important; }
    #stalink-root .stl-grid-4 { grid-template-columns:repeat(2,1fr)!important; }
    #stalink-root .stl-grid-6 { grid-template-columns:1fr!important; }
    #stalink-root .stl-span-3,#stalink-root .stl-span-2 { grid-column:auto!important; }
    #stalink-root .stl-nav-links { display:none!important; }
    #stalink-root .stl-sidedots { display:none!important; }
    #stalink-root .stl-process-line { display:none!important; }
  }
`;

type ContactState = {
  name: string;
  email: string;
  message: string;
};

export default function StalinkLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [form, setForm] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hide reveal elements before paint to avoid a flash of fully-shown content.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(34px)";
    });
  }, []);

  // Port of the design comp's support.js: cursor, particles, scroll system
  // (reveal + counters + nav + side dots), magnetic, tilt, parallax.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    const rafs: number[] = [];
    const q = (sel: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(sel));

    // ---- Cursor ----
    (() => {
      const dot = document.getElementById("cursor-dot");
      const ring = document.getElementById("cursor-ring");
      if (!dot || !ring) return;
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my,
        s = 1,
        cs = 1;
      const move = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px)`;
      };
      const over = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        s = t.closest && t.closest("a,button,[data-magnetic]") ? 2.1 : 1;
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      cleanups.push(() => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
      });
      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        cs += (s - cs) * 0.15;
        ring.style.transform = `translate(${rx}px,${ry}px) scale(${cs})`;
        ring.style.opacity = cs > 1.4 ? "0.5" : "1";
        rafs.push(requestAnimationFrame(loop));
      };
      loop();
    })();

    // ---- Particles ----
    (() => {
      const c = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      let w = 0,
        h = 0;
      const pts: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      const resize = () => {
        const r = (c.parentElement as HTMLElement).getBoundingClientRect();
        w = r.width;
        h = r.height;
        c.width = w * dpr;
        c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);
      cleanups.push(() => window.removeEventListener("resize", resize));
      const N = Math.max(40, Math.min(110, Math.floor((w * h) / 13000)));
      for (let i = 0; i < N; i++)
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        });
      const mouse = { x: -9999, y: -9999 };
      const mm = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      window.addEventListener("mousemove", mm);
      cleanups.push(() => window.removeEventListener("mousemove", mm));
      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i],
              b = pts[j];
            const dx = a.x - b.x,
              dy = a.y - b.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 132) {
              ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 132) * 0.16})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        for (const p of pts) {
          const dm = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
          const near = dm < 150;
          ctx.fillStyle = near
            ? "rgba(167,139,250,0.95)"
            : "rgba(34,211,238,0.5)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, near ? 2.4 : 1.5, 0, 6.3);
          ctx.fill();
        }
        rafs.push(requestAnimationFrame(draw));
      };
      draw();
    })();

    // ---- Scroll system: progress, nav, side dots, reveal, counters ----
    (() => {
      const bar = document.getElementById("scroll-progress");
      const nav = document.getElementById("main-nav");
      const revealEls = q("[data-reveal]") as HTMLElement[];
      revealEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(34px)";
        el.style.willChange = "opacity,transform";
        (el as any)._revealed = false;
      });
      const counterEls = q("[data-count]") as HTMLElement[];
      counterEls.forEach((el) => ((el as any)._counted = false));
      const sections = q("[data-section]");
      const dots = q("[data-dot]");

      const tweenReveal = (el: HTMLElement) => {
        const delay = parseFloat(el.getAttribute("data-reveal") || "0");
        const dur = 780;
        setTimeout(() => {
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            el.style.opacity = String(e);
            el.style.transform = `translateY(${(1 - e) * 34}px)`;
            if (p < 1) requestAnimationFrame(step);
            else {
              el.style.transform = "none";
              el.style.willChange = "auto";
            }
          };
          requestAnimationFrame(step);
        }, delay);
      };

      const animateCount = (el: HTMLElement) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const dec = target % 1 !== 0 ? 1 : 0;
        const dur = 1700,
          start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + (target * e).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const tick = () => {
        const st = scrollY;
        const max = document.body.scrollHeight - innerHeight;
        if (bar) bar.style.width = (max > 0 ? (st / max) * 100 : 0) + "%";
        if (nav) {
          if (st > 40) {
            nav.style.background = "rgba(7,8,16,0.82)";
            nav.style.borderColor = "rgba(120,200,230,0.12)";
            nav.style.height = "64px";
          } else {
            nav.style.background = "rgba(7,8,16,0)";
            nav.style.borderColor = "rgba(120,200,230,0)";
            nav.style.height = "84px";
          }
        }
        let active: string | null = null;
        sections.forEach((sec) => {
          const r = sec.getBoundingClientRect();
          if (r.top <= innerHeight * 0.42 && r.bottom >= innerHeight * 0.42)
            active = sec.id;
        });
        if (active)
          dots.forEach((d) => {
            const on = d.getAttribute("data-dot") === active;
            d.style.background = on ? "#22d3ee" : "rgba(255,255,255,0.25)";
            d.style.transform = on ? "scale(1.7)" : "scale(1)";
            d.style.boxShadow = on ? "0 0 10px rgba(34,211,238,.8)" : "none";
          });
        revealEls.forEach((el) => {
          if (!(el as any)._revealed) {
            const r = el.getBoundingClientRect();
            if (r.top < innerHeight * 0.9 && r.bottom > 0) {
              (el as any)._revealed = true;
              tweenReveal(el);
            }
          }
        });
        counterEls.forEach((el) => {
          if (!(el as any)._counted) {
            const r = el.getBoundingClientRect();
            if (r.top < innerHeight * 0.85 && r.bottom > 0) {
              (el as any)._counted = true;
              animateCount(el);
            }
          }
        });
      };

      window.addEventListener("scroll", tick, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", tick));
      const poll = () => {
        tick();
        rafs.push(requestAnimationFrame(poll));
      };
      poll();
    })();

    // ---- Magnetic ----
    q("[data-magnetic]").forEach((el) => {
      const m = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.28}px,${y * 0.42}px)`;
      };
      const o = () => {
        el.style.transform = "translate(0,0)";
      };
      el.style.transition = "transform .25s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("mousemove", m as EventListener);
      el.addEventListener("mouseleave", o);
    });

    // ---- Tilt ----
    q("[data-tilt]").forEach((el) => {
      const m = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${
          px * 7
        }deg) translateY(-6px)`;
      };
      const o = () => {
        el.style.transform =
          "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      };
      el.style.transition = "transform .35s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("mousemove", m as EventListener);
      el.addEventListener("mouseleave", o);
    });

    // ---- Parallax ----
    (() => {
      const layers = q("[data-parallax]");
      if (!layers.length) return;
      const mm = (e: MouseEvent) => {
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => {
          const s = parseFloat(l.getAttribute("data-parallax") || "0");
          l.style.transform = `translate(${x * s}px,${y * s}px)`;
        });
      };
      window.addEventListener("mousemove", mm);
      cleanups.push(() => window.removeEventListener("mousemove", mm));
    })();

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {
          /* noop */
        }
      });
      rafs.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (name.length < 2) return setError("Podaj imię (min. 2 znaki).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Podaj poprawny adres e-mail.");
    if (message.length < 5) return setError("Wiadomość jest zbyt krótka.");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Błąd podczas wysyłania wiadomości.");
      }
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const tabBtn = (i: number): CSSProperties => ({
    textAlign: "left",
    cursor: "pointer",
    background: activeTab === i ? "rgba(34,211,238,.08)" : "transparent",
    border: `1px solid ${
      activeTab === i ? "rgba(34,211,238,.35)" : "rgba(255,255,255,.08)"
    }`,
    borderRadius: 18,
    padding: "22px 24px",
    transition: "background .3s,border-color .3s",
    fontFamily: "inherit",
  });
  const tabNum = (i: number): CSSProperties => ({
    fontFamily: FM,
    fontSize: 13,
    color: activeTab === i ? "#22d3ee" : "#5c6377",
    letterSpacing: ".12em",
  });

  const techTag: CSSProperties = {
    fontFamily: FM,
    fontSize: 12,
    color: "#cdd6e6",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    padding: "6px 12px",
    borderRadius: 999,
  };

  return (
    <div
      id="stalink-root"
      ref={rootRef}
      className={`${grotesk.variable} ${mono.variable}`}
      style={{
        fontFamily: FF,
        background: "#06070e",
        color: "#e8ecf4",
        position: "relative",
        cursor: "none",
        overflowX: "hidden",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      <div
        id="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          margin: "-3.5px 0 0 -3.5px",
          borderRadius: "50%",
          background: "#22d3ee",
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
      <div
        id="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          margin: "-19px 0 0 -19px",
          borderRadius: "50%",
          border: "1px solid rgba(34,211,238,.55)",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "width .25s ease,height .25s ease,opacity .25s ease",
        }}
      />

      {/* NAV */}
      <nav
        id="main-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 84,
          display: "flex",
          alignItems: "center",
          zIndex: 100,
          transition: "height .4s ease,background .4s ease,border-color .4s ease",
          borderBottom: "1px solid rgba(120,200,230,0)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          id="scroll-progress"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 2,
            width: 0,
            background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
            boxShadow: "0 0 12px rgba(34,211,238,.7)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 22px rgba(34,211,238,.45)",
              }}
            >
              <img
                src="/logo.svg"
                alt="STALINK"
                style={{
                  width: 18,
                  height: 18,
                  filter: "brightness(0) invert(1)",
                }}
              />
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: 21,
                letterSpacing: ".16em",
                color: "#fff",
              }}
            >
              STAL<span style={{ color: "#22d3ee" }}>INK</span>
            </span>
          </a>
          <div
            className="stl-nav-links"
            style={{ display: "flex", alignItems: "center", gap: 34 }}
          >
            {[
              ["#oferta", "Oferta"],
              ["#automatyzacja", "Automatyzacja AI"],
              ["#projekty", "Projekty"],
              ["#proces", "Proces"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  color: "#a9b2c6",
                  fontSize: 15,
                  transition: "color .25s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#a9b2c6")}
              >
                {label}
              </a>
            ))}
            <a
              href="#kontakt"
              data-magnetic="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                color: "#06070e",
                background: "#22d3ee",
                fontWeight: 600,
                fontSize: 14,
                padding: "11px 20px",
                borderRadius: 999,
                boxShadow:
                  "0 0 0 1px rgba(34,211,238,.4),0 8px 30px rgba(34,211,238,.25)",
              }}
            >
              Darmowa konsultacja
            </a>
          </div>
        </div>
      </nav>

      {/* SIDE DOTS */}
      <div
        className="stl-sidedots"
        style={{
          position: "fixed",
          right: 26,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {["top", "oferta", "automatyzacja", "projekty", "proces", "kontakt"].map(
          (id, i) => (
            <a
              key={id}
              href={`#${id}`}
              data-dot={id}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: i === 0 ? "#22d3ee" : "rgba(255,255,255,.25)",
                transition: "all .3s",
                display: "block",
              }}
            />
          )
        )}
      </div>

      {/* HERO */}
      <section
        id="top"
        data-section="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#06070e",
        }}
      >
        <canvas
          id="hero-canvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
        <div
          data-parallax="-26"
          style={{
            position: "absolute",
            top: "-12%",
            left: "-6%",
            width: "46vw",
            height: "46vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(34,211,238,.18),transparent 64%)",
            filter: "blur(36px)",
            zIndex: 0,
            animation: "stl-floaty 11s ease-in-out infinite",
          }}
        />
        <div
          data-parallax="28"
          style={{
            position: "absolute",
            bottom: "-18%",
            right: "-8%",
            width: "52vw",
            height: "52vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(167,139,250,.15),transparent 64%)",
            filter: "blur(46px)",
            zIndex: 0,
            animation: "stl-floaty 13s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)",
            backgroundSize: "62px 62px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 38%,black,transparent 72%)",
            maskImage:
              "radial-gradient(circle at 50% 38%,black,transparent 72%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "120px 32px 70px",
            textAlign: "center",
          }}
        >
          <div
            data-reveal="0"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: FM,
              fontSize: 12.5,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#22d3ee",
              border: "1px solid rgba(34,211,238,.3)",
              background: "rgba(34,211,238,.06)",
              padding: "8px 16px",
              borderRadius: 999,
              marginBottom: 34,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22d3ee",
                animation: "stl-pulseDot 2s infinite",
                boxShadow: "0 0 10px #22d3ee",
              }}
            />
            Web Development &nbsp;·&nbsp; Automatyzacja AI
          </div>

          <h1
            data-reveal="110"
            style={{
              fontWeight: 700,
              fontSize: "clamp(40px,7vw,84px)",
              lineHeight: 1.04,
              letterSpacing: "-.025em",
              margin: "0 0 30px",
              color: "#fff",
            }}
          >
            Strony, które{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg,#22d3ee,#a78bfa 55%,#22d3ee)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "stl-shimmer 5s linear infinite",
              }}
            >
              sprzedają.
            </span>
            <br />
            Automatyzacja, która pracuje.
          </h1>

          <p
            data-reveal="220"
            style={{
              fontSize: "clamp(16px,1.5vw,20px)",
              lineHeight: 1.6,
              color: "#9aa3b8",
              maxWidth: 620,
              margin: "0 auto 42px",
            }}
          >
            Projektuję szybkie, estetyczne strony w Next.js i wdrażam
            inteligentne automatyzacje AI — chatboty 24/7, rezerwacje online i
            system opinii Google, które przekuwają odwiedziny w klientów.
          </p>

          <div
            data-reveal="320"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#kontakt"
              data-magnetic="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "#06070e",
                background: "#22d3ee",
                fontWeight: 600,
                fontSize: 16,
                padding: "16px 30px",
                borderRadius: 999,
                boxShadow: "0 10px 40px rgba(34,211,238,.32)",
              }}
            >
              Umów darmową konsultację
              <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a
              href="#projekty"
              data-magnetic="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "#e8ecf4",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.14)",
                fontWeight: 500,
                fontSize: 16,
                padding: "16px 30px",
                borderRadius: 999,
              }}
            >
              Zobacz projekty
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 118,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#5c6377",
            fontFamily: FM,
            fontSize: 11,
            letterSpacing: ".2em",
          }}
        >
          SCROLL
          <span
            style={{
              fontSize: 18,
              color: "#22d3ee",
              animation: "stl-bobArrow 1.8s ease-in-out infinite",
            }}
          >
            ↓
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 4,
            borderTop: "1px solid rgba(255,255,255,.06)",
            background: "rgba(6,7,14,.6)",
            overflow: "hidden",
            padding: "18px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 54,
              width: "max-content",
              animation: "stl-marquee 26s linear infinite",
              fontFamily: FM,
              fontSize: 14,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#717a90",
              whiteSpace: "nowrap",
            }}
          >
            {[0, 1].map((k) => (
              <span
                key={k}
                style={{ display: "flex", gap: 54, color: "#717a90" }}
                aria-hidden={k === 1}
              >
                <span>Next.js</span>
                <span style={{ color: "#22d3ee" }}>✦</span>
                <span>React</span>
                <span style={{ color: "#a78bfa" }}>✦</span>
                <span>TypeScript</span>
                <span style={{ color: "#22d3ee" }}>✦</span>
                <span>Tailwind CSS</span>
                <span style={{ color: "#a78bfa" }}>✦</span>
                <span>AI Automation</span>
                <span style={{ color: "#22d3ee" }}>✦</span>
                <span>SEO</span>
                <span style={{ color: "#a78bfa" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 200,
            background: "linear-gradient(to bottom,transparent,#06070e)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </section>

      {/* STATS */}
      <section
        style={{
          position: "relative",
          background: "#06070e",
          padding: "30px 32px 70px",
        }}
      >
        <div
          data-reveal="0"
          className="stl-grid-4"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            border: "1px solid rgba(120,200,230,.1)",
            borderRadius: 24,
            background:
              "linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008))",
            padding: "48px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 24,
          }}
        >
          {(
            [
              ["98", "/100", "", "#fff", "0/100", "Wynik Lighthouse"],
              ["0.9", "s", "<", "#22d3ee", "<0.9s", "Czas ładowania"],
              ["24", "/7", "", "#fff", "24/7", "Chatbot AI online"],
              ["70", "%", "", "#a78bfa", "0%", "Niższe koszty obsługi"],
            ] as const
          ).map(([count, suffix, prefix, color, init, label], i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderRight:
                  i < 3 ? "1px solid rgba(255,255,255,.06)" : undefined,
              }}
            >
              <div
                data-count={count}
                data-suffix={suffix}
                data-prefix={prefix || undefined}
                style={{
                  fontSize: "clamp(36px,4.6vw,58px)",
                  fontWeight: 700,
                  color,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                {init}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 13.5,
                  color: "#8a93a8",
                  fontFamily: FM,
                  letterSpacing: ".03em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFERTA */}
      <section
        id="oferta"
        data-section="oferta"
        style={{
          position: "relative",
          background: "#080a14",
          padding: "110px 32px",
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            data-reveal="0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span style={{ width: 30, height: 1, background: "#22d3ee" }} />
            <span
              style={{
                fontFamily: FM,
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "#22d3ee",
              }}
            >
              Co oferuję
            </span>
          </div>
          <div
            data-reveal="60"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              marginBottom: 54,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "clamp(32px,4.6vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "-.02em",
                color: "#fff",
                maxWidth: 680,
              }}
            >
              Wszystko, czego potrzebuje
              <br />
              Twój biznes w sieci.
            </h2>
            <p
              style={{
                margin: 0,
                color: "#8a93a8",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: 380,
              }}
            >
              Od projektu i kodu, po inteligentne automatyzacje, które realnie
              odciążają Cię w codziennej obsłudze klientów.
            </p>
          </div>

          <div
            data-reveal="120"
            className="stl-grid-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: 22,
            }}
          >
            <div
              data-tilt="true"
              className="stl-span-3"
              style={{
                gridColumn: "span 3",
                background:
                  "linear-gradient(160deg,rgba(34,211,238,.07),rgba(255,255,255,.012))",
                border: "1px solid rgba(34,211,238,.16)",
                borderRadius: 24,
                padding: 38,
                position: "relative",
                overflow: "hidden",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(34,211,238,.18),transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <span
                style={{
                  fontFamily: FM,
                  color: "#22d3ee",
                  fontSize: 13,
                  letterSpacing: ".2em",
                }}
              >
                01
              </span>
              <h3
                style={{
                  margin: "18px 0 12px",
                  fontSize: 27,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Nowoczesne strony WWW
              </h3>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "#9aa3b8",
                  fontSize: 15.5,
                  lineHeight: 1.65,
                }}
              >
                Szybkie, responsywne i estetyczne strony w Next.js, React i
                TypeScript — zaprojektowane tak, by przekuwać odwiedziny w
                zapytania i sprzedaż.
              </p>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {["Next.js", "React", "TypeScript", "Tailwind"].map((t) => (
                  <span key={t} style={techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-tilt="true"
              className="stl-span-3"
              style={{
                gridColumn: "span 3",
                background:
                  "linear-gradient(160deg,rgba(167,139,250,.08),rgba(255,255,255,.012))",
                border: "1px solid rgba(167,139,250,.18)",
                borderRadius: 24,
                padding: 38,
                position: "relative",
                overflow: "hidden",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(167,139,250,.2),transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <span
                style={{
                  fontFamily: FM,
                  color: "#a78bfa",
                  fontSize: 13,
                  letterSpacing: ".2em",
                }}
              >
                02
              </span>
              <h3
                style={{
                  margin: "18px 0 12px",
                  fontSize: 27,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Automatyzacja AI
              </h3>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "#9aa3b8",
                  fontSize: 15.5,
                  lineHeight: 1.65,
                }}
              >
                Chatbot 24/7, rezerwacje online zintegrowane z Booksy i
                automatyczne zbieranie opinii Google — technologia, która
                pracuje za Ciebie.
              </p>
              <a
                href="#automatyzacja"
                style={{
                  marginTop: "auto",
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  color: "#a78bfa",
                  fontWeight: 600,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Zobacz szczegóły <span>→</span>
              </a>
            </div>

            {(
              [
                ["03", "SEO i widoczność", "Optymalizacja techniczna i treści, dzięki którym klienci znajdują Cię w Google."],
                ["04", "Wydajność", "Błyskawiczne ładowanie i wysokie wyniki Core Web Vitals na każdym urządzeniu."],
                ["05", "Wsparcie i rozwój", "Opieka po wdrożeniu, aktualizacje i rozwój strony wraz z Twoim biznesem."],
              ] as const
            ).map(([num, title, desc]) => (
              <div
                key={num}
                data-tilt="true"
                className="stl-span-2"
                style={{
                  gridColumn: "span 2",
                  background: "rgba(255,255,255,.025)",
                  border: "1px solid rgba(120,200,230,.1)",
                  borderRadius: 22,
                  padding: 30,
                  minHeight: 210,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: FM,
                    color: "#22d3ee",
                    fontSize: 13,
                    letterSpacing: ".2em",
                  }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    margin: "16px 0 10px",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#8a93a8",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATYZACJA */}
      <section
        id="automatyzacja"
        data-section="automatyzacja"
        style={{
          position: "relative",
          background: "#06070e",
          padding: "110px 32px",
          overflow: "hidden",
        }}
      >
        <div
          data-parallax="24"
          style={{
            position: "absolute",
            top: "10%",
            right: "-6%",
            width: "38vw",
            height: "38vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(167,139,250,.12),transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div
            data-reveal="0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span style={{ width: 30, height: 1, background: "#a78bfa" }} />
            <span
              style={{
                fontFamily: FM,
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "#a78bfa",
              }}
            >
              Automatyzacja AI
            </span>
          </div>
          <h2
            data-reveal="60"
            style={{
              margin: "0 0 16px",
              fontWeight: 700,
              fontSize: "clamp(32px,4.6vw,56px)",
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#fff",
              maxWidth: 760,
            }}
          >
            Inteligentne rozwiązania, które
            <br />
            pracują, gdy Ty odpoczywasz.
          </h2>
          <p
            data-reveal="120"
            style={{
              margin: "0 0 56px",
              color: "#8a93a8",
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            Wybierz obszar i zobacz, jak automatyzacja AI realnie odciąża Twój
            biznes.
          </p>

          <div
            className="stl-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: 34,
              alignItems: "start",
            }}
          >
            <div
              data-reveal="60"
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {(
                [
                  ["01", "Chatbot AI 24/7", "Natychmiastowe odpowiedzi i zbieranie leadów"],
                  ["02", "Rezerwacje online", "Integracja z Booksy i przypomnienia"],
                  ["03", "Opinie Google", "Automatyczne zbieranie ocen i SEO"],
                ] as const
              ).map(([num, title, desc], i) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  style={tabBtn(i)}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <span style={tabNum(i)}>{num}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          color: "#fff",
                          marginBottom: 3,
                        }}
                      >
                        {title}
                      </div>
                      <div style={{ fontSize: 13.5, color: "#8a93a8" }}>
                        {desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div
              data-reveal="120"
              style={{
                position: "relative",
                minHeight: 420,
                border: "1px solid rgba(120,200,230,.12)",
                borderRadius: 24,
                background:
                  "linear-gradient(165deg,rgba(255,255,255,.035),rgba(255,255,255,.008))",
                padding: 34,
                overflow: "hidden",
              }}
            >
              {/* Panel 0 — Chatbot */}
              <div style={{ display: activeTab === 0 ? "block" : "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 22,
                    paddingBottom: 18,
                    borderBottom: "1px solid rgba(255,255,255,.07)",
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "#06070e",
                    }}
                  >
                    S
                  </span>
                  <div>
                    <div
                      style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}
                    >
                      STALINK · Asystent
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#34d399",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#34d399",
                        }}
                      />
                      Online teraz
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: "78%",
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: "13px 16px",
                      borderRadius: "16px 16px 16px 4px",
                      color: "#cdd6e6",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                    }}
                  >
                    Cześć! W czym mogę pomóc? Chcesz umówić wizytę czy poznać
                    ofertę?
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      maxWidth: "78%",
                      background: "rgba(34,211,238,.14)",
                      border: "1px solid rgba(34,211,238,.3)",
                      padding: "13px 16px",
                      borderRadius: "16px 16px 4px 16px",
                      color: "#eaf6f9",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                    }}
                  >
                    Chciałbym zarezerwować strzyżenie na piątek.
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: "78%",
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: "13px 16px",
                      borderRadius: "16px 16px 16px 4px",
                      color: "#cdd6e6",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                    }}
                  >
                    Jasne! Mam wolne 14:00 i 16:30. Który termin rezerwuję?
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 22,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 14,
                    padding: "12px 16px",
                  }}
                >
                  <span style={{ flex: 1, color: "#5c6377", fontSize: 14 }}>
                    Napisz wiadomość…
                  </span>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#22d3ee",
                      color: "#06070e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Panel 1 — Rezerwacje */}
              <div style={{ display: activeTab === 1 ? "block" : "none" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#fff",
                    fontSize: 17,
                    marginBottom: 6,
                  }}
                >
                  Rezerwacja online
                </div>
                <div
                  style={{ fontSize: 13.5, color: "#8a93a8", marginBottom: 22 }}
                >
                  Bezpośrednio na stronie — zsynchronizowane z Booksy
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 22,
                  }}
                >
                  {(
                    [
                      ["Pon", false],
                      ["Pt 27", true],
                      ["Sob", false],
                    ] as const
                  ).map(([d, on]) => (
                    <span
                      key={d}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        background: on
                          ? "rgba(34,211,238,.14)"
                          : "rgba(255,255,255,.05)",
                        border: `1px solid ${
                          on ? "rgba(34,211,238,.35)" : "rgba(255,255,255,.1)"
                        }`,
                        color: on ? "#fff" : "#cdd6e6",
                        fontSize: 13.5,
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <div
                  className="stl-grid-3"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 10,
                    marginBottom: 24,
                  }}
                >
                  {(
                    [
                      ["12:00", false],
                      ["14:00", true],
                      ["16:30", false],
                    ] as const
                  ).map(([t, on]) => (
                    <span
                      key={t}
                      style={{
                        textAlign: "center",
                        padding: "12px 0",
                        borderRadius: 12,
                        background: on
                          ? "rgba(34,211,238,.14)"
                          : "rgba(255,255,255,.05)",
                        border: `1px solid ${
                          on ? "rgba(34,211,238,.4)" : "rgba(255,255,255,.1)"
                        }`,
                        color: on ? "#fff" : "#cdd6e6",
                        fontSize: 14,
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    background: "#22d3ee",
                    color: "#06070e",
                    textAlign: "center",
                    padding: 15,
                    borderRadius: 14,
                    fontWeight: 600,
                  }}
                >
                  Potwierdź rezerwację
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#8a93a8",
                    fontSize: 13,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#a78bfa",
                    }}
                  />
                  Klient dostaje przypomnienie SMS i e-mail
                </div>
              </div>

              {/* Panel 2 — Opinie */}
              <div style={{ display: activeTab === 2 ? "block" : "none" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#fff",
                    fontSize: 17,
                    marginBottom: 6,
                  }}
                >
                  Opinie Google
                </div>
                <div
                  style={{ fontSize: 13.5, color: "#8a93a8", marginBottom: 22 }}
                >
                  Automatyczne zbieranie ocen i powiadomienia w czasie
                  rzeczywistym
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                        }}
                      />
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 14.5,
                        }}
                      >
                        Anna K.
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#fbbf24",
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      ★★★★★
                    </span>
                  </div>
                  <div
                    style={{ color: "#cdd6e6", fontSize: 14, lineHeight: 1.55 }}
                  >
                    „Super obsługa i świetny efekt — rezerwacja online przez
                    stronę zajęła mi minutę. Polecam!”
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(52,211,153,.1)",
                    border: "1px solid rgba(52,211,153,.3)",
                    borderRadius: 14,
                    padding: "14px 18px",
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "rgba(52,211,153,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#34d399",
                      fontSize: 15,
                    }}
                  >
                    ✓
                  </span>
                  <div>
                    <div
                      style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}
                    >
                      Nowa opinia 5★
                    </div>
                    <div style={{ color: "#8a93a8", fontSize: 12.5 }}>
                      Powiadomienie wysłane do właściciela
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJEKTY */}
      <section
        id="projekty"
        data-section="projekty"
        style={{
          position: "relative",
          background: "#080a14",
          padding: "110px 32px",
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            data-reveal="0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span style={{ width: 30, height: 1, background: "#22d3ee" }} />
            <span
              style={{
                fontFamily: FM,
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "#22d3ee",
              }}
            >
              Projekty
            </span>
          </div>
          <div
            data-reveal="60"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              marginBottom: 48,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "clamp(32px,4.6vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "-.02em",
                color: "#fff",
              }}
            >
              Wybrane realizacje
            </h2>
            <p
              style={{
                margin: 0,
                color: "#8a93a8",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: 380,
              }}
            >
              Strony i aplikacje, które łączą estetykę ze skutecznością.
            </p>
          </div>

          {/* Featured */}
          <div
            data-reveal="120"
            className="stl-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1.08fr .92fr",
              border: "1px solid rgba(120,200,230,.14)",
              borderRadius: 24,
              overflow: "hidden",
              background: "rgba(255,255,255,.02)",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: 380,
                overflow: "hidden",
              }}
            >
              <img
                src="/images/bbhairspa.png"
                alt="BB Hair Spa"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg,transparent 40%,rgba(8,10,20,.85))",
                }}
              />
            </div>
            <div
              style={{
                padding: 46,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  alignSelf: "flex-start",
                  fontFamily: FM,
                  fontSize: 11,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,.35)",
                  padding: "5px 12px",
                  borderRadius: 999,
                  marginBottom: 20,
                }}
              >
                ★ Wyróżniony
              </span>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                BB Hair Spa
              </h3>
              <p
                style={{
                  margin: "0 0 24px",
                  color: "#9aa3b8",
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                Strona salonu fryzjerskiego (Krystian Wojewoda Hair Design) w
                Next.js — responsywna, SEO-friendly, z eleganckim, ciemnym
                stylem i rezerwacją online.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 28,
                }}
              >
                {["Next.js", "SEO", "Rezerwacje"].map((t) => (
                  <span key={t} style={techTag}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#kontakt"
                data-magnetic="true"
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  color: "#06070e",
                  background: "#22d3ee",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "13px 24px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Zobacz projekt <span>→</span>
              </a>
            </div>
          </div>

          {/* Grid of 3 */}
          <div
            data-reveal="120"
            className="stl-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {(
              [
                ["/images/taskFlow.png", "TaskFlow AI", "Web App", "#a78bfa", "Aplikacja do inteligentnego zarządzania zadaniami i harmonogramem."],
                ["/images/expenseTracker.png", "Finance Tracker", "Web App", "#22d3ee", "Aplikacja do śledzenia finansów osobistych zbudowana w Next.js."],
                ["/images/filmoteka.png", "Filmoteka-JS", "JavaScript", "#a78bfa", "Aplikacja do katalogowania i wyszukiwania filmów."],
              ] as const
            ).map(([img, title, tag, tagColor, desc]) => (
              <div
                key={title}
                data-tilt="true"
                style={{
                  border: "1px solid rgba(120,200,230,.1)",
                  borderRadius: 22,
                  overflow: "hidden",
                  background: "rgba(255,255,255,.025)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 190,
                    overflow: "hidden",
                    background: "#0c1020",
                  }}
                >
                  <img
                    src={img}
                    alt={title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
                <div style={{ padding: 26 }}>
                  <span
                    style={{
                      fontFamily: FM,
                      fontSize: 11,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: tagColor,
                    }}
                  >
                    {tag}
                  </span>
                  <h3
                    style={{
                      margin: "10px 0 8px",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "#8a93a8",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div
            data-reveal="80"
            style={{
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              border: "1px dashed rgba(34,211,238,.3)",
              borderRadius: 22,
              background:
                "linear-gradient(120deg,rgba(34,211,238,.05),rgba(167,139,250,.04))",
              padding: "36px 40px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Następny projekt może być Twój.
              </h3>
              <p style={{ margin: 0, color: "#8a93a8", fontSize: 15 }}>
                Darmowa konsultacja w sprawie Twojej strony lub aplikacji.
              </p>
            </div>
            <a
              href="#kontakt"
              data-magnetic="true"
              style={{
                textDecoration: "none",
                color: "#06070e",
                background: "#22d3ee",
                fontWeight: 600,
                fontSize: 15,
                padding: "15px 28px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              Porozmawiajmy <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* O MNIE */}
      <section
        id="o-mnie"
        data-section="o-mnie"
        style={{
          position: "relative",
          background: "#06070e",
          padding: "110px 32px",
          overflow: "hidden",
        }}
      >
        <div
          data-parallax="-22"
          style={{
            position: "absolute",
            bottom: 0,
            left: "-6%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(34,211,238,.1),transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="stl-grid-2"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            display: "grid",
            gridTemplateColumns: ".85fr 1.15fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div data-reveal="0" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: 26,
                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                opacity: 0.5,
                filter: "blur(14px)",
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(120,200,230,.2)",
                aspectRatio: "4/5",
              }}
            >
              <img
                src="/images/seweryn.jpg"
                alt="Seweryn Stalinger"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -16,
                right: -16,
                background: "rgba(7,8,16,.92)",
                border: "1px solid rgba(120,200,230,.18)",
                borderRadius: 16,
                padding: "14px 18px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  color: "#22d3ee",
                  letterSpacing: ".1em",
                }}
              >
                Frontend / Fullstack
              </div>
              <div style={{ fontSize: 13, color: "#8a93a8", marginTop: 2 }}>
                Next.js · React · TypeScript
              </div>
            </div>
          </div>
          <div>
            <div
              data-reveal="40"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 30, height: 1, background: "#22d3ee" }} />
              <span
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "#22d3ee",
                }}
              >
                O mnie
              </span>
            </div>
            <h2
              data-reveal="80"
              style={{
                margin: "0 0 22px",
                fontWeight: 700,
                fontSize: "clamp(30px,4.2vw,50px)",
                lineHeight: 1.08,
                letterSpacing: "-.02em",
                color: "#fff",
              }}
            >
              Cześć, jestem Seweryn Stalinger.
            </h2>
            <p
              data-reveal="120"
              style={{
                margin: "0 0 22px",
                color: "#9aa3b8",
                fontSize: 17,
                lineHeight: 1.7,
              }}
            >
              Frontend developer specjalizujący się w Next.js, React, TypeScript
              i Tailwind CSS. Łączę estetykę z realną skutecznością sprzedażową —
              tworzę strony, które nie tylko dobrze wyglądają, ale przede
              wszystkim{" "}
              <span style={{ color: "#e8ecf4" }}>
                przekuwają odwiedziny w klientów
              </span>
              .
            </p>
            <div
              data-reveal="160"
              style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
            >
              {(
                [
                  ["CERTYFIKAT", "GoIT Fullstack Developer", "#22d3ee"],
                  ["CERTYFIKAT", "Meta Advanced React", "#a78bfa"],
                ] as const
              ).map(([label, title, color]) => (
                <div
                  key={title}
                  style={{
                    flex: 1,
                    minWidth: 180,
                    border: "1px solid rgba(120,200,230,.12)",
                    borderRadius: 16,
                    padding: "18px 20px",
                    background: "rgba(255,255,255,.025)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FM,
                      fontSize: 12,
                      color,
                      letterSpacing: ".08em",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}
                  >
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section
        id="proces"
        data-section="proces"
        style={{
          position: "relative",
          background: "#080a14",
          padding: "110px 32px",
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            data-reveal="0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span style={{ width: 30, height: 1, background: "#a78bfa" }} />
            <span
              style={{
                fontFamily: FM,
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "#a78bfa",
              }}
            >
              Jak pracujemy
            </span>
          </div>
          <h2
            data-reveal="60"
            style={{
              margin: "0 0 56px",
              fontWeight: 700,
              fontSize: "clamp(32px,4.6vw,56px)",
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#fff",
              maxWidth: 680,
            }}
          >
            Prosty proces, konkretny efekt.
          </h2>

          <div
            data-reveal="120"
            className="stl-grid-4"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 24,
            }}
          >
            <div
              className="stl-process-line"
              style={{
                position: "absolute",
                top: 28,
                left: "8%",
                right: "8%",
                height: 1,
                background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
                opacity: 0.4,
              }}
            />
            {(
              [
                ["01", "Darmowa konsultacja", "Omawiamy Twoje potrzeby, cele i pomysły — bez zobowiązań.", "#22d3ee"],
                ["02", "Wycena i plan", "Przejrzysta wycena oraz harmonogram dopasowany do projektu.", "#22d3ee"],
                ["03", "Budowa i wdrożenie", "Tworzę szybką, estetyczną stronę i wdrażam ją razem z automatyzacją.", "#a78bfa"],
                ["04", "Wsparcie i rozwój", "Opieka po starcie, optymalizacja i rozwój wraz z Twoim biznesem.", "#a78bfa"],
              ] as const
            ).map(([num, title, desc, color]) => (
              <div key={num} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background:
                      color === "#22d3ee"
                        ? "rgba(34,211,238,.1)"
                        : "rgba(167,139,250,.1)",
                    border: `1px solid ${
                      color === "#22d3ee"
                        ? "rgba(34,211,238,.35)"
                        : "rgba(167,139,250,.35)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FM,
                    fontWeight: 700,
                    color,
                    fontSize: 18,
                    marginBottom: 22,
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 19,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#8a93a8",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section
        id="kontakt"
        data-section="kontakt"
        style={{
          position: "relative",
          background: "#06070e",
          padding: "110px 32px",
          overflow: "hidden",
        }}
      >
        <div
          data-parallax="20"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: "46vw",
            height: "46vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(34,211,238,.12),transparent 64%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="stl-grid-2"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div
              data-reveal="0"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 30, height: 1, background: "#22d3ee" }} />
              <span
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "#22d3ee",
                }}
              >
                Kontakt
              </span>
            </div>
            <h2
              data-reveal="60"
              style={{
                margin: "0 0 18px",
                fontWeight: 700,
                fontSize: "clamp(32px,4.4vw,52px)",
                lineHeight: 1.06,
                letterSpacing: "-.02em",
                color: "#fff",
              }}
            >
              Zbudujmy coś,
              <br />
              co realnie zarabia.
            </h2>
            <p
              data-reveal="100"
              style={{
                margin: "0 0 36px",
                color: "#9aa3b8",
                fontSize: 17,
                lineHeight: 1.65,
                maxWidth: 420,
              }}
            >
              Napisz, czego potrzebujesz — odpowiadam zwykle w ciągu godziny.
              Pierwsza konsultacja jest bezpłatna.
            </p>
            <div
              data-reveal="140"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 30,
              }}
            >
              {(
                [
                  ["MAIL", EMAIL, `mailto:${EMAIL}`],
                  ["TEL", PHONE_LABEL, PHONE_HREF],
                ] as const
              ).map(([tag, label, href]) => (
                <a
                  key={tag}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                    color: "#e8ecf4",
                    border: "1px solid rgba(120,200,230,.12)",
                    borderRadius: 14,
                    padding: "16px 18px",
                    background: "rgba(255,255,255,.02)",
                    transition: "border-color .3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(34,211,238,.4)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(120,200,230,.12)")
                  }
                >
                  <span
                    style={{
                      fontFamily: FM,
                      fontSize: 12,
                      color: "#22d3ee",
                      width: 54,
                    }}
                  >
                    {tag}
                  </span>
                  <span style={{ fontSize: 15.5 }}>{label}</span>
                </a>
              ))}
            </div>
            <div data-reveal="180" style={{ display: "flex", gap: 12 }}>
              {(
                [
                  ["GitHub", "https://github.com/Seweryn999"],
                  [
                    "LinkedIn",
                    "https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/",
                  ],
                ] as const
              ).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  data-magnetic="true"
                  style={{
                    textDecoration: "none",
                    color: "#cdd6e6",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12,
                    padding: "12px 20px",
                    background: "rgba(255,255,255,.03)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div
            data-reveal="120"
            style={{
              border: "1px solid rgba(120,200,230,.14)",
              borderRadius: 24,
              background:
                "linear-gradient(165deg,rgba(255,255,255,.04),rgba(255,255,255,.01))",
              padding: 36,
            }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {(
                  [
                    ["name", "Imię", "Twoje imię", "text"],
                    ["email", "E-mail", "twoj@email.pl", "email"],
                  ] as const
                ).map(([field, label, placeholder, type]) => (
                  <div key={field}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: FM,
                        fontSize: 11,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "#8a93a8",
                        marginBottom: 8,
                      }}
                    >
                      {label}
                    </label>
                    <input
                      name={field}
                      type={type}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 12,
                        padding: "14px 16px",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontSize: 15,
                        outline: "none",
                        transition: "border-color .3s",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#22d3ee")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(255,255,255,.1)")
                      }
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: FM,
                      fontSize: 11,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#8a93a8",
                      marginBottom: 8,
                    }}
                  >
                    Wiadomość
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Opisz krótko swój projekt…"
                    value={form.message}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      color: "#fff",
                      fontFamily: "inherit",
                      fontSize: 15,
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color .3s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#22d3ee")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,.1)")
                    }
                  />
                </div>
                {error && (
                  <div style={{ color: "#fb7185", fontSize: 13.5 }}>{error}</div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 4,
                    cursor: loading ? "not-allowed" : "pointer",
                    background: "#22d3ee",
                    color: "#06070e",
                    border: "none",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 16,
                    padding: 16,
                    borderRadius: 14,
                    boxShadow: "0 10px 30px rgba(34,211,238,.25)",
                    transition: "transform .2s",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {loading ? "Wysyłanie…" : "Wyślij wiadomość"}
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "30px 10px",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(52,211,153,.15)",
                    border: "1px solid rgba(52,211,153,.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#34d399",
                    fontSize: 28,
                    marginBottom: 18,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 20,
                    marginBottom: 8,
                  }}
                >
                  Dziękuję za wiadomość!
                </div>
                <div style={{ color: "#8a93a8", fontSize: 15 }}>
                  Odpowiem najszybciej, jak to możliwe — zwykle w ciągu godziny.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#05060c",
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "48px 32px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/logo.svg"
                alt="STALINK"
                style={{
                  width: 16,
                  height: 16,
                  filter: "brightness(0) invert(1)",
                }}
              />
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: ".16em",
                color: "#fff",
              }}
            >
              STAL<span style={{ color: "#22d3ee" }}>INK</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 26,
              alignItems: "center",
              fontSize: 14,
            }}
          >
            {(
              [
                [EMAIL, `mailto:${EMAIL}`, false],
                [PHONE_LABEL, PHONE_HREF, false],
                ["GitHub", "https://github.com/Seweryn999", true],
                [
                  "LinkedIn",
                  "https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/",
                  true,
                ],
              ] as const
            ).map(([label, href, blank]) => (
              <a
                key={label}
                href={href}
                target={blank ? "_blank" : undefined}
                rel={blank ? "noopener" : undefined}
                style={{
                  textDecoration: "none",
                  color: "#8a93a8",
                  transition: "color .3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#22d3ee")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#8a93a8")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "28px auto 0",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.05)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
            color: "#5c6377",
            fontSize: 13,
          }}
        >
          <span>
            © {new Date().getFullYear()} Seweryn Stalinger · STALINK. Wszelkie
            prawa zastrzeżone.
          </span>
          <span style={{ fontFamily: FM, letterSpacing: ".06em" }}>
            Zaprojektowane &amp; zakodowane w Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
