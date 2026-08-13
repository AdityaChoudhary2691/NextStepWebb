import { useState } from "react";

/**
 * Launchbay — Login / Sign up
 * Black & white, two-sided marketplace framing (Fresher vs Recruiter).
 * Single source of truth: `role` drives both the hero mark and the form.
 */

const COPY = {
  fresher: {
    letter: "F",
    eyebrow: "CANDIDATE ACCESS",
    headline: "Your first offer starts here.",
    sub: "Build a profile employers actually read — resume, projects, a short video intro.",
    cta: "Sign in as Fresher",
    ctaNew: "Create fresher account",
  },
  recruiter: {
    letter: "R",
    eyebrow: "EMPLOYER ACCESS",
    headline: "Hire the freshers others overlook.",
    sub: "Post roles, browse verified candidates, skip the resume-pile guesswork.",
    cta: "Sign in as Recruiter",
    ctaNew: "Create recruiter account",
  },
};

export default function LoginForm() {
  const [role, setRole] = useState("fresher");
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const c = COPY[role];
  const isSignup = mode === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your auth endpoint.
    console.log({ role, mode, username, password });
  };

  return (
    <div className="lb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,380;0,9..144,560;1,9..144,420&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        * { box-sizing: border-box; }

        .lb-root {
          --ink: #0a0a0a;
          --paper: #ffffff;
          --paper-dim: #f1f1ef;
          --line-on-dark: rgba(255,255,255,0.16);
          --line-on-light: rgba(0,0,0,0.13);
          --grey-500: #8a8a86;
          --grey-700: #3c3c3a;

          min-height: 100vh;
          width: 100%;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          background: var(--paper);
          font-family: 'Inter', sans-serif;
          color: var(--ink);
        }

        .lb-mono {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ---------- HERO (left) ---------- */
        .lb-hero {
          position: relative;
          background: var(--ink);
          color: var(--paper);
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .lb-brand {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 560;
          letter-spacing: -0.01em;
        }

        .lb-rolelist {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
        }
        .lb-rolelist button {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 4px 0;
          color: rgba(255,255,255,0.38);
          transition: color 0.25s ease;
        }
        .lb-rolelist button.active { color: var(--paper); }
        .lb-rolelist .lb-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; }

        .lb-mark-wrap {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 24px 0;
        }
        .lb-mark {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 380;
          font-size: clamp(180px, 22vw, 320px);
          line-height: 1;
          color: var(--paper);
          transition: opacity 0.35s ease;
          user-select: none;
        }
        .lb-mark-ghost {
          position: absolute;
          font-family: 'Fraunces', serif;
          font-weight: 380;
          font-size: clamp(180px, 22vw, 320px);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px var(--line-on-dark);
          transform: translate(18px, 14px);
          z-index: -1;
          user-select: none;
        }

        .lb-heroFoot { max-width: 340px; }
        .lb-eyebrow { font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 10px; }
        .lb-headline {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 28px;
          line-height: 1.15;
          margin: 0 0 10px;
        }
        .lb-sub { font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.55); margin: 0; }

        /* ---------- FORM (right) ---------- */
        .lb-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
        }
        .lb-card { width: 100%; max-width: 380px; }

        .lb-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid var(--line-on-light);
          border-radius: 999px;
          padding: 3px;
          position: relative;
          margin-bottom: 40px;
        }
        .lb-toggle button {
          all: unset;
          text-align: center;
          padding: 9px 0;
          font-size: 12px;
          cursor: pointer;
          border-radius: 999px;
          position: relative;
          z-index: 1;
          color: var(--grey-500);
          transition: color 0.3s ease;
        }
        .lb-toggle button.active { color: var(--paper); }
        .lb-toggle-thumb {
          position: absolute;
          top: 3px;
          bottom: 3px;
          left: 3px;
          width: calc(50% - 3px);
          background: var(--ink);
          border-radius: 999px;
          transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .lb-toggle-thumb.recruiter { transform: translateX(100%); }

        .lb-formhead { margin-bottom: 28px; }
        .lb-formhead h1 {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 26px;
          margin: 0 0 6px;
        }
        .lb-formhead p { margin: 0; font-size: 13px; color: var(--grey-500); }

        .lb-field { margin-bottom: 16px; }
        .lb-field label {
          display: block;
          font-size: 11px;
          color: var(--grey-500);
          margin-bottom: 7px;
        }
        .lb-inputwrap { position: relative; }
        .lb-field input {
          width: 100%;
          padding: 13px 14px;
          background: var(--paper-dim);
          border: 1px solid transparent;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .lb-field input:focus {
          border-color: var(--ink);
          background: var(--paper);
        }
        .lb-pw-toggle {
          all: unset;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          color: var(--grey-500);
          cursor: pointer;
          letter-spacing: 0.05em;
        }
        .lb-pw-toggle:hover { color: var(--ink); }

        .lb-submit {
          all: unset;
          box-sizing: border-box;
          width: 100%;
          text-align: center;
          padding: 14px 0;
          background: var(--ink);
          color: var(--paper);
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 6px;
          transition: opacity 0.2s ease;
        }
        .lb-submit:hover { opacity: 0.85; }

        .lb-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
          font-size: 11px;
          color: var(--grey-500);
        }
        .lb-divider::before, .lb-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--line-on-light);
        }

        .lb-google {
          all: unset;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 0;
          border: 1px solid var(--line-on-light);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .lb-google:hover { border-color: var(--ink); background: var(--paper-dim); }

        .lb-switch {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: var(--grey-500);
        }
        .lb-switch button {
          all: unset;
          cursor: pointer;
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 860px) {
          .lb-root { grid-template-columns: 1fr; }
          .lb-hero { min-height: 260px; padding: 32px 24px; }
          .lb-mark-wrap { margin: 12px 0; }
          .lb-mark, .lb-mark-ghost { font-size: 110px; }
          .lb-heroFoot { max-width: none; }
          .lb-panel { padding: 36px 24px 56px; }
        }
      `}</style>

      {/* ---------- HERO ---------- */}
      <div className="lb-hero">
        <div className="lb-brand">Nexep</div>

        <div className="lb-mark-wrap">
          <span className="lb-mark-ghost" aria-hidden="true">
            {role === "fresher" ? "R" : "F"}
          </span>
          <span className="lb-mark">{c.letter}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div className="lb-heroFoot">
            <div className="lb-eyebrow lb-mono">{c.eyebrow}</div>
            <h2 className="lb-headline">{c.headline}</h2>
            <p className="lb-sub">{c.sub}</p>
          </div>

          <div className="lb-rolelist">
            <button
              className={role === "fresher" ? "active" : ""}
              onClick={() => setRole("fresher")}
              type="button"
            >
              <span className="lb-num">01</span> Fresher
            </button>
            <button
              className={role === "recruiter" ? "active" : ""}
              onClick={() => setRole("recruiter")}
              type="button"
            >
              <span className="lb-num">02</span> Recruiter
            </button>
          </div>
        </div>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="lb-panel">
        <div className="lb-card">
          <div className="lb-toggle" role="tablist" aria-label="Choose account type">
            <div className={`lb-toggle-thumb ${role === "recruiter" ? "recruiter" : ""}`} />
            <button
              type="button"
              className={role === "fresher" ? "active" : ""}
              onClick={() => setRole("fresher")}
              role="tab"
              aria-selected={role === "fresher"}
            >
              Fresher
            </button>
            <button
              type="button"
              className={role === "recruiter" ? "active" : ""}
              onClick={() => setRole("recruiter")}
              role="tab"
              aria-selected={role === "recruiter"}
            >
              Recruiter
            </button>
          </div>

          <div className="lb-formhead">
            <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
            <p>
              {isSignup
                ? `Set up access as a ${role}.`
                : `Sign in to continue as a ${role}.`}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="lb-field">
              <label htmlFor="lb-username">Username</label>
              <input
                id="lb-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourname"
                required
              />
            </div>

            <div className="lb-field">
              <label htmlFor="lb-password">Password</label>
              <div className="lb-inputwrap">
                <input
                  id="lb-password"
                  type={showPw ? "text" : "password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingRight: 56 }}
                  required
                />
                <button
                  type="button"
                  className="lb-pw-toggle"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button type="submit" className="lb-submit">
              {isSignup ? c.ctaNew : c.cta}
            </button>
          </form>

          <div className="lb-divider">OR</div>

          <button type="button" className="lb-google">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.6 12.23c0-.75-.07-1.47-.19-2.16H12v4.1h5.4a4.62 4.62 0 0 1-2 3.03v2.5h3.24c1.9-1.75 2.96-4.33 2.96-7.47z"
                stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
              />
              <path
                d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H3.06v2.58A10 10 0 0 0 12 22z"
                stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
              />
              <path
                d="M6.41 13.92a5.98 5.98 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9l3.35-2.58z"
                stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
              />
              <path
                d="M12 6.05c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.94 9.94 0 0 0 12 2 10 10 0 0 0 3.06 7.5l3.35 2.58C7.2 7.8 9.4 6.05 12 6.05z"
                stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
              />
            </svg>
            Continue with Google
          </button>

          <div className="lb-switch">
            {isSignup ? (
              <>Already have an account? <button type="button" onClick={() => setMode("signin")}>Sign in</button></>
            ) : (
              <>New to Launchbay? <button type="button" onClick={() => setMode("signup")}>Sign up</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}