import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { User, Phone, GraduationCap, Briefcase, FileText, Video, Check, Send } from "lucide-react";
import axios from "axios";

const ACCENT = "#E8A33D";
const INK = "#000000";



export default function CandidateCard({ onSendOffer }) {
  const { candidates,setCandidates } = useContext(AppContext);
 const [offerSentMap, setOfferSentMap] = useState({});
const [sendingMap, setSendingMap] = useState({});


  
  const deleteSkill = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/skills/${id}`, {
        method: 'DELETE'
      });
      const data = await res.text(); // your endpoint returns "deleted" as plain text
      console.log(data);

      
      setCandidates(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  function getInitials(name) {
    return (name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
  }

   const handleSend = async (value) => {
  const id = value.id;
  try {
    setSendingMap(prev => ({ ...prev, [id]: true }));
    await axios.post("http://localhost:8081/sended", {
      toEmail: value.uemail,
      subject: value.usub,
      body: value.ubody,
    });
    alert("Email sent successfully!");
  } finally {
    setOfferSentMap(prev => ({ ...prev, [id]: true }));
    setSendingMap(prev => ({ ...prev, [id]: false }));
  }
};

  function formatSize(bytes) {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  if (candidates.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F7F8FB", fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <h1 className="text-lg font-semibold text-gray-400">No applications</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center pt-12 pb-6 px-6 justify-center p-6 flex-wrap gap-5" style={{ backgroundColor: "#F7F8FB", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {candidates.map((value, index) => (
        <div
          key={value._id || value.id || index}
          className="w-full max-w-sm min-h-180 justify-center rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white"
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
              {getInitials(value.username) || <User size={26} />}
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

            {value.uskills?.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">
                  SKILLS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {value.uskills.map((s) => (
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
  <ResumeRow candidate={value} />
  <VideoRow candidate={value} />
</div>
          </div>

          {/* Footer action */}
          <div className="px-6 pb-6 flex gap-5">
            <button onClick={(e)=>deleteSkill(value.id)}  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors w-1/2">Delete</button>
            <button
  type="button"
  onClick={() => handleSend(value)}
  disabled={sendingMap[value.id] || offerSentMap[value.id]}
  className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-transform disabled:cursor-default w-1/2"
  style={
    offerSentMap[value.id]
      ? { backgroundColor: "#E7F4EC", color: "#3A7D5C" }
      : { backgroundColor: ACCENT, color: "white" }
  }
>
  {offerSentMap[value.id] ? (
    <>
      <Check size={16} /> Offer letter sent
    </>
  ) : sendingMap[value.id] ? (
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
      <span className="flex items-center gap-1.5 text-gray-400">
        {icon} {label}
      </span>
      <span className="font-medium text-right" style={{ color: INK }}>
        {value || "—"}
      </span>
    </div>
  );
}

function AttachmentRow({ icon, label, file, formatSize }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-gray-400">
        {icon} {label}
      </span>
      <span className="font-medium text-right truncate max-w-[160px]" style={{ color: INK }}>
        {file ? (typeof file === "object" ? `${file.name} (${formatSize(file.size)})` : file) : "Not provided"}
      </span>
    </div>
  );
}
function ResumeRow({ candidate }) {
  const hasResume = !!candidate.resumeName;
  const url = `http://localhost:8081/skills/${candidate.id}/resume`;

  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-gray-400">
        <FileText size={15} /> Resume
      </span>
      {hasResume ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-right truncate max-w-[160px] hover:underline"
          style={{ color: "#E8A33D" }}
        >
          {candidate.resumeName}
        </a>
      ) : (
        <span className="font-medium text-right" style={{ color: "#000" }}>
          Not provided
        </span>
      )}
    </div>
  );
}

function VideoRow({ candidate }) {
  const [showVideo, setShowVideo] = useState(false);
  const hasVideo = !!candidate.videoName;
  const url = `http://localhost:8081/skills/${candidate.id}/video`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-gray-400">
          <Video size={15} /> Video intro
        </span>
        {hasVideo ? (
          <button
            type="button"
            onClick={() => setShowVideo((s) => !s)}
            className="font-medium hover:underline"
            style={{ color: "#E8A33D" }}
          >
            {showVideo ? "Hide" : "Play"}
          </button>
        ) : (
          <span className="font-medium" style={{ color: "#000" }}>
            Not provided
          </span>
        )}
      </div>
      {showVideo && hasVideo && (
        <video controls className="w-full mt-2 rounded-lg">
          <source src={url} type={candidate.videoType} />
        </video>
      )}
    </div>
  );
}