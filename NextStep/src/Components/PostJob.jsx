import { useContext, useState } from "react";
import { Briefcase, GraduationCap, Building2, FileText, Send, CheckCircle2 } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const ACCENT = "#E8A33D";
const INK = "#000000";

export default function PostJob() {
  const {
    job, setJob,
    position, setPosition,
    name, setName,
    remuneration, setremuneration,
    description, setdescription,
    usub, setUsub,
    ubody, setBody,
  } = useContext(AppContext);

  const [jobType, setJobType] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = (event) => {
    setJobType(event.target.value);
  };

  const handleSubject = (e) => {
    setUsub(e.target.value);
  };
  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handlePosition = (event) => setPosition(event.target.value);
  const handleName = (event) => setName(event.target.value);
  const handleremuneration = (event) => setremuneration(event.target.value);
  const handledescription = (event) => setdescription(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("nexepUser");
    if (!storedUser) {
      alert("Please log in first.");
      return;
    }
    const { id: userId } = JSON.parse(storedUser);

    const newJobs = {
  type: jobType,
  position,
  name,
  remuneration: Number(remuneration),
  description,
};

    try {
      const res = await axios.post(
        `http://localhost:8081/postjobs/${userId}`,
        newJobs
      );
      setJob([...job, res.data]);

      setJobType("");
      setPosition("");
      setName("");
      setremuneration("");
      setdescription("");
     

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Something went wrong while posting. Please try again.");
    }
  };

  function SuccessOverlay({ show }) {
    if (!show) return null;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <div
          className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-3 shadow-xl"
          style={{ animation: "popIn 0.3s ease-out" }}
        >
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="none"
              stroke="#22C55E"
              strokeWidth="4"
              style={{
                strokeDasharray: 201,
                strokeDashoffset: 201,
                animation: "circleDraw 0.5s ease-out forwards",
              }}
            />
            <path
              d="M20 37 L31 48 L52 24"
              fill="none"
              stroke="#22C55E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animation: "checkDraw 0.35s ease-out 0.45s forwards",
              }}
            />
          </svg>
          <p className="font-semibold text-lg" style={{ color: INK }}>
            Job posted successfully!
          </p>
          <p className="text-sm text-gray-400">Candidates can now see this opening.</p>
        </div>

        <style>{`
          @keyframes circleDraw { to { stroke-dashoffset: 0; } }
          @keyframes checkDraw { to { stroke-dashoffset: 0; } }
          @keyframes popIn {
            from { transform: scale(0.85); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <SuccessOverlay show={showSuccess} />
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1c1c1a] mb-4">
            <Briefcase className="w-6 h-6 text-[#f0efe8]" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold text-[#1c1c1a] tracking-tight">
            Post an Opportunity
          </h1>
          <p className="text-sm text-[#1c1c1a]/60 mt-1">
            Share a job or internship opening with the community
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(28,28,26,0.08)] border border-[#1c1c1a]/[0.06] p-8 space-y-6"
        >
          {/* Job Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-[#1c1c1a] mb-2.5">
              Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                value="Full-Time"
                onClick={handleClick}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                  jobType === "Full-Time"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Full-time Job
              </button>
              <button
                type="button"
                value="Internship"
                onClick={handleClick}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                  jobType === "Internship"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Internship
              </button>
            </div>
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Job Position
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="position"
                name="position"
                type="text"
                value={position}
                onChange={handlePosition}
                placeholder="e.g. Frontend Developer"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="remuneration" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              remuneration
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="remuneration"
                name="remuneration"
                type="text"
                value={remuneration}
                onChange={handleremuneration}
                placeholder="e.g. 5 LPA"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={name}
                onChange={handleName}
                placeholder="e.g. Nexep Technologies"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Job description
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1c1c1a]/35" />
              <textarea
                id="description"
                name="description"
                rows={5}
                value={description}
                onChange={handledescription}
                placeholder="Describe responsibilities, requirements, and what makes this opportunity a good fit..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none resize-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10"
              />
            </div>

            
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1c1c1a] text-[#f0efe8] font-medium py-3.5 text-sm transition-all duration-200 hover:bg-[#1c1c1a]/90 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, error, icon, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
        {icon}
        {label} {required && <span style={{ color: ACCENT }}>*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}