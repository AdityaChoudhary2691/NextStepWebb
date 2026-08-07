import React, { useContext, useState } from "react";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  FileText,
  Video,
  ExternalLink,
  FolderGit2,
  Send,
  Check,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";

const ACCENT = "#E8A33D";
const INK = "#000000";

export default function CandidateCard(){
  const {candidates}=useContext(AppContext)
  const [offerSent, setOfferSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSendOffer() {
    if (offerSent || sending) return;
    setSending(true);
    // Hook up to your real "send offer" API call here.
    Promise.resolve(onSendOffer?.())
      .catch(() => {})
      .finally(() => {
        setSending(false);
        setOfferSent(true);
      });
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  function formatSize(bytes) {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen flex items-center pt-12 pb-6 px-6 justify-center p-6 flex-wrap gap-5" style={{ backgroundColor: "#F7F8FB", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {candidates.map((value,index)=>(
      <div
        className="w-full max-w-sm min-h-180   justify-center rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white"
      >
        {/* Header */}
        <div
          className="h-24 relative"
          style={{ background: `linear-gradient(135deg, ${INK}, #2B2B2B)` }}
        >
          <span
            className="absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            {value.applyingf}
          </span>
          <div
            className="absolute -bottom-9 left-6 rounded-full flex items-center justify-center text-xl font-bold text-white border-4 border-white shrink-0"
            style={{
              backgroundColor: ACCENT,
              width: "72px",
              height: "72px",
              minWidth: "72px",
              minHeight: "72px",
              aspectRatio: "1 / 1",
            }}
          >
            {initials || <User size={26} />}
          </div>
        </div>

        {/* Body */}
        <div className="pt-12 pb-6 px-6">
          <h3 className="font-bold text-xl" style={{ color: INK }}>
            {value.username}
          </h3>
          <p className="text-sm text-gray-400 mb-5">{value.uemail}</p>

          <div className="space-y-3 text-sm">
            <Row icon={<Phone size={15} />} label="Mobile" value={value.mobileno} />
            <Row
              icon={<GraduationCap size={15} />}
              label="Status"
              value={
                value.ustatus === "studying"
                  ? `Studying · Class of ${value.upassoutYear}`
                  : "Passed out"
              }
            />
            <Row icon={<Briefcase size={15} />} label="Applying for" value={value.applyingf} />
          </div>

          {value.skill?.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">
                SKILLS
              </p>
              <div className="flex flex-wrap gap-1.5">
                {value.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{ backgroundColor: "#FEF6EA", color: INK, border: "1px solid #F3D9A8" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

        

          <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
            <AttachmentRow
              icon={<FileText size={15} />}
              label="Resume"
              file={value.uresume}
              formatSize={formatSize}
            />
            <AttachmentRow
              icon={<Video size={15} />}
              label="Video intro"
              file={value.uvedio}
              formatSize={formatSize}
            />
          </div>
        </div>

        {/* Footer action */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={handleSendOffer}
            disabled={sending || offerSent}
            className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-transform disabled:cursor-default"
            style={
              offerSent
                ? { backgroundColor: "#E7F4EC", color: "#3A7D5C" }
                : { backgroundColor: ACCENT, color: "white" }
            }
          >
            {offerSent ? (
              <>
                <Check size={16} /> Offer letter sent
              </>
            ) : sending ? (
              "Sending…"
            ) : (
              <>
                <Send size={15} /> Send offer letter
              </>
            )}
          </button>
        </div>
      </div>
      ))}
      
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-gray-400">
        {icon}
        {label}
      </span>
      <span className="font-medium" style={{ color: INK }}>
        {value}
      </span>
    </div>
  );
}

function AttachmentRow({ icon, label, file, formatSize }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: file ? "#FEF6EA" : "#F3F4F6", color: file ? INK : "#B0B5BF" }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: file ? INK : "#B0B5BF" }}>
            {label}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {file ? `${file.name} · ${formatSize(file.size)}` : "Not attached"}
          </p>
        </div>
      </div>

      {file ? (
        <a
          href={file.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md shrink-0 hover:opacity-80"
          style={{ backgroundColor: "#F1F4F9", color: INK }}
        >
          Open <ExternalLink size={12} />
        </a>
      ) : (
        <span className="text-xs text-gray-300 shrink-0">—</span>
      )}
    </div>
  );
}
