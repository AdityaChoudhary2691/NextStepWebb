import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import logo from '../assets/logo.jpeg'

import { CircleUserRound, Link2, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from "react-router";

export default function FresherDashboard() {
  const { job, candidates } = useContext(AppContext);
  const storedUser = JSON.parse(localStorage.getItem("nexepUser") || "{}");
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nexepUser");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="fd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,380;0,9..144,560;1,9..144,420&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .fd-root {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Inter', sans-serif;
          color: #0a0a0a;
        }

        .fd-topbar {
          background: #0a0a0a;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fd-logo {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .fd-user-wrap {
          position: relative;
        }
        .fd-user-trigger {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 999px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .fd-user-trigger:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .fd-chevron {
          transition: transform 0.15s ease;
        }
        .fd-chevron.open {
          transform: rotate(180deg);
        }

        .fd-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          min-width: 190px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
          overflow: hidden;
          z-index: 20;
        }
        .fd-dropdown-item {
          all: unset;
          box-sizing: border-box;
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-size: 13px;
          color: #0a0a0a;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .fd-dropdown-item:hover {
          background: #f7f6f2;
        }
        .fd-dropdown-item.danger {
          color: #b91c1c;
        }
        .fd-dropdown-divider {
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin: 4px 0;
        }

        .fd-hero {
          padding: 56px 48px 24px;
          max-width: 900px;
        }
        .fd-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a8a86;
          margin-bottom: 10px;
        }
        .fd-headline {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 34px;
          line-height: 1.15;
          margin: 0 0 8px;
        }
        .fd-sub {
          font-size: 14px;
          color: #6b6b68;
          margin: 0;
        }

        .fd-actions {
          display: flex;
          gap: 16px;
          padding: 32px 48px;
          flex-wrap: wrap;
        }
        .fd-card {
          flex: 1;
          min-width: 260px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 16px;
          padding: 28px;
          background: #f7f6f2;
        }
        .fd-card h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          margin: 0 0 8px;
        }
        .fd-card p {
          font-size: 13px;
          color: #6b6b68;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .fd-btn {
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
        .fd-btn:hover { opacity: 0.85; }
        .fd-btn.outline {
          background: transparent;
          color: #0a0a0a;
          border: 1px solid rgba(0,0,0,0.15);
        }

        .fd-stats {
          display: flex;
          gap: 40px;
          padding: 8px 48px 56px;
          border-top: 1px solid rgba(0,0,0,0.08);
          margin: 8px 48px 0;
        }
        .fd-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 560;
        }
        .fd-stat-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a8a86;
        }
      `}</style>

      <div className="fd-topbar">
        <Link to="/"><img src={logo} alt="" className='w-22 h-14 rounded'/></Link>

        <div className="fd-user-wrap" ref={menuRef}>
          <button
            type="button"
            className="fd-user-trigger"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <CircleUserRound size={25} />
            {storedUser.username || "Fresher"}
            <ChevronDown size={14} className={`fd-chevron ${menuOpen ? "open" : ""}`} />
          </button>

          {menuOpen && (
            <div className="fd-dropdown">
              <Link
                to="/YourCard"
                className="fd-dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                My Posted
              </Link>
              <Link
                to="/myapplications"
                className="fd-dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                My Applications
              </Link>
              <div className="fd-dropdown-divider" />
              <button
                type="button"
                className="fd-dropdown-item danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fd-hero">
        <div className="fd-eyebrow">Fresher Dashboard</div>
        <h1 className="fd-headline">Your first offer starts here.</h1>
        <p className="fd-sub">
          Build your profile so recruiters can find you, or browse open roles.
        </p>
      </div>

      <div className="fd-actions">
        <div className="fd-card">
          <h3>Post your profile</h3>
          <p>Add your skills, resume, and a short video intro.</p>
          <Link to="/postskills" className="fd-btn">Post Your Profile →</Link>
        </div>
        <div className="fd-card">
          <h3>Browse open roles</h3>
          <p>See jobs and internships posted by recruiters.</p>
          <Link to="/findjobs" className="fd-btn outline">Browse Jobs →</Link>
        </div>
      </div>

      <div className="fd-stats">
        <div>
          <div className="fd-stat-num">{job.length}</div>
          <div className="fd-stat-label">Open Roles</div>
        </div>
        
      </div>
    </div>
  );
}