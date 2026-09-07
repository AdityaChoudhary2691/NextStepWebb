import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { CircleUserRound, ChevronDown } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function Navbar1({ defaultName = "User" }) {
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
    <>
      <style>{`
        .fd-topbar {
          background: #0a0a0a;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
            {storedUser.username || defaultName}
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
    </>
  );
}