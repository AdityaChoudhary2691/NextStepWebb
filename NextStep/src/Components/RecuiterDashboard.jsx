import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router";

export default function RecruiterDashboard() {
  const { job, candidates, usub, setUsub, ubody, setBody } = useContext(AppContext);
  const storedUser = JSON.parse(localStorage.getItem("nexepUser") || "{}");

  return (
    <div className="rd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,380;0,9..144,560;1,9..144,420&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .rd-root {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Inter', sans-serif;
          color: #0a0a0a;
        }

        .rd-topbar {
          background: #0a0a0a;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rd-logo {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 18px;
          color: #fff;
        }
        .rd-user {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }

        .rd-hero {
          padding: 56px 48px 24px;
          max-width: 900px;
        }
        .rd-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a8a86;
          margin-bottom: 10px;
        }
        .rd-headline {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 34px;
          line-height: 1.15;
          margin: 0 0 8px;
        }
        .rd-sub {
          font-size: 14px;
          color: #6b6b68;
          margin: 0;
        }

        .rd-actions {
          display: flex;
          gap: 16px;
          padding: 32px 48px;
          flex-wrap: wrap;
        }
        .rd-card {
          flex: 1;
          min-width: 260px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 16px;
          padding: 28px;
          background: #f7f6f2;
        }
        .rd-card h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          margin: 0 0 8px;
        }
        .rd-card p {
          font-size: 13px;
          color: #6b6b68;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .rd-btn {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #0a0a0a;
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .rd-btn:hover { opacity: 0.85; }
        .rd-btn.outline {
          background: transparent;
          color: #0a0a0a;
          border: 1px solid rgba(0,0,0,0.15);
        }

        .rd-stats {
          display: flex;
          gap: 40px;
          padding: 8px 48px 32px;
          border-top: 1px solid rgba(0,0,0,0.08);
          margin: 8px 48px 0;
        }
        .rd-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 560;
        }
        .rd-stat-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a8a86;
        }

        .rd-emailsection {
          padding: 8px 48px 56px;
        }
        .rd-emailcard {
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 16px;
          padding: 32px;
          max-width: 560px;
          background: #fff;
        }
        .rd-emailcard h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          margin: 0 0 4px;
        }
        .rd-emailcard p.hint {
          font-size: 13px;
          color: #6b6b68;
          margin: 0 0 24px;
        }
        .rd-field { margin-bottom: 16px; }
        .rd-field label {
          display: block;
          font-size: 11px;
          color: #8a8a86;
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .rd-field input, .rd-field textarea {
          width: 100%;
          padding: 13px 14px;
          background: #f7f6f2;
          border: 1px solid transparent;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #0a0a0a;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .rd-field input:focus, .rd-field textarea:focus {
          border-color: #0a0a0a;
          background: #fff;
        }
        .rd-field textarea {
          resize: vertical;
          min-height: 120px;
        }
      `}</style>

      <div className="rd-topbar">
        <span className="rd-logo">Nexep</span>
        <span className="rd-user">{storedUser.username || "Recruiter"}</span>
      </div>

      <div className="rd-hero">
        <div className="rd-eyebrow">Recruiter Dashboard</div>
        <h1 className="rd-headline">Hire the freshers others overlook.</h1>
        <p className="rd-sub">
          Post a role, browse candidates, or set up your offer email template.
        </p>
      </div>

      <div className="rd-actions">
        <div className="rd-card">
          <h3>Post a job</h3>
          <p>Share a full-time or internship opening.</p>
          <Link to="/postjobs" className="rd-btn">Post a Job →</Link>
        </div>
        <div className="rd-card">
          <h3>Browse candidates</h3>
          <p>See fresher profiles, resumes, and video intros.</p>
          <Link to="/findskills" className="rd-btn outline">Browse Candidates →</Link>
        </div>
      </div>

      <div className="rd-stats">
        <div>
          <div className="rd-stat-num">{job.length}</div>
          <div className="rd-stat-label">Jobs Posted</div>
        </div>
        <div>
          <div className="rd-stat-num">{candidates.length}</div>
          <div className="rd-stat-label">Candidates</div>
        </div>
      </div>

      <div className="rd-emailsection">
        <div className="rd-emailcard">
          <h3>Offer email template</h3>
          <p className="hint">
            Set a common subject and body — reused whenever you send an offer to a candidate.
          </p>

          <div className="rd-field">
            <label htmlFor="rd-usub">Subject</label>
            <input
              id="rd-usub"
              type="text"
              value={usub}
              onChange={(e) => setUsub(e.target.value)}
              placeholder="You're shortlisted for Frontend Engineer at Nexep"
            />
          </div>

          <div className="rd-field">
            <label htmlFor="rd-ubody">Body</label>
            <textarea
              id="rd-ubody"
              value={ubody}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi {name}, we're excited to offer you..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}