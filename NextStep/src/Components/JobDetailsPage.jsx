import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Building2,
  Clock,
  IndianRupee,
  CheckCircle2,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const INK = "#1c1c1a";
const CREAM = "#f0efe8";
const ACCENT = "#E8A33D";

/**
 * JobDetailsPage
 * ----------
 * Reads jobs straight from AppContext (the same `job` array PostJob writes
 * to) and renders the full detail view for one of them: job type, salary,
 * internship duration (internships only, with a fallback if missing),
 * prior skills required, description, company brief, and an Apply Now
 * action.
 *
 * Routing: sits on `/details/:id` and pulls the id via useParams(). You can
 * also pass a `jobId` prop directly (e.g. from a modal) to skip the route
 * param, or a `jobProp` to bypass the context lookup entirely.
 */
export default function JobDetailsPage({ jobId, jobProp }) {
  const { job } = useContext(AppContext);
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const targetId = jobId ?? routeId;

  const selectedJob =
    jobProp ??
    job.find((j) => String(j.id ?? j._id) === String(targetId));

  if (!selectedJob) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        <p className="text-sm tracking-wide uppercase text-[#1c1c1a]/40">
          No job selected.
        </p>
      </div>
    );
  }

  const {
    type,
    position,
    name: company,
    remuneration,
    description,
    companyBrief,
    skillsRequired,
    durationMonths,
    location,
  } = selectedJob;

  const isInternship = type?.toLowerCase() === "internship";

  const handleApply = async () => {
    if (hasApplied || isApplying) return;

    const storedUser = localStorage.getItem("nexepUser");
    if (!storedUser) {
      alert("Please log in first.");
      return;
    }
    const { id: userId } = JSON.parse(storedUser);
    const jobIdForApply = selectedJob.id ?? selectedJob._id;

    setIsApplying(true);
    try {
      // TODO: wire this up once the apply endpoint exists on the backend, e.g.
      // await axios.post(`${API_URL}/applyjob/${jobIdForApply}/${userId}`);
      setHasApplied(true);
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("Something went wrong while applying. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: CREAM }}>
      <div className="max-w-2xl mx-auto px-6 py-10 pb-32">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#1c1c1a]/50 hover:text-[#1c1c1a] transition-colors"
        >
          <ArrowLeft size={15} />
          Back to listings
        </button>

        {/* Hero */}
        <div
          className="rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(28,28,26,0.10)]"
          style={{ backgroundColor: INK }}
        >
          <div className="px-8 pt-8 pb-7">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 border"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              {isInternship ? <GraduationCap size={13} /> : <Briefcase size={13} />}
              {type}
            </span>

            <h1
              className="mt-5 text-3xl font-bold tracking-tight"
              style={{ color: CREAM }}
            >
              {position}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: `${CREAM}99` }}>
              <span className="flex items-center gap-1.5">
                <Building2 size={14} />
                {company}
              </span>
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {location}
                </span>
              )}
            </div>
          </div>

          {/* Fact chips strip */}
          <div
            className="grid gap-px"
            style={{
              backgroundColor: `${CREAM}14`,
              gridTemplateColumns: `repeat(${isInternship ? 2 : 1}, minmax(0, 1fr))`,
            }}
          >
            {isInternship && (
              <FactChip
                icon={<Clock size={16} />}
                label="Duration"
                value={
                  durationMonths
                    ? `${durationMonths} month${durationMonths > 1 ? "s" : ""}`
                    : "Not specified"
                }
              />
            )}
            <FactChip
              icon={<IndianRupee size={16} />}
              label="Salary"
              value={remuneration != null ? String(remuneration) : "Not specified"}
            />
          </div>
        </div>

        {/* Skills required */}
        {skillsRequired?.length > 0 && (
          <Section title="Prior Skills Required">
            <ul className="flex flex-wrap gap-2">
              {skillsRequired.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-1.5 text-sm rounded-full px-3.5 py-1.5"
                  style={{ backgroundColor: `${INK}08`, color: INK }}
                >
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Job description */}
        {description && (
          <Section title="Job Description">
            <p className="text-[#1c1c1a]/70 leading-relaxed text-[15px]">{description}</p>
          </Section>
        )}

        {/* Company brief */}
        {companyBrief && (
          <Section title={`About ${company}`}>
            <p className="text-[#1c1c1a]/70 leading-relaxed text-[15px]">{companyBrief}</p>
          </Section>
        )}
      </div>

      {/* Sticky apply bar */}
      <div
        className="fixed bottom-0 left-0 right-0 backdrop-blur border-t"
        style={{ backgroundColor: `${CREAM}f2`, borderColor: `${INK}0f` }}
      >
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="text-sm text-[#1c1c1a]/50 hidden sm:block">
            {company} · {type}
          </div>
          <button
            onClick={handleApply}
            disabled={hasApplied || isApplying}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl font-semibold py-3.5 px-10 text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
            style={{
              backgroundColor: hasApplied ? "#059669" : INK,
              color: CREAM,
            }}
          >
            {hasApplied ? "Applied ✓" : isApplying ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FactChip({ icon, label, value }) {
  return (
    <div className="px-8 py-4 flex items-center gap-3" style={{ backgroundColor: INK }}>
      <div style={{ color: ACCENT }}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest" style={{ color: `${CREAM}70` }}>
          {label}
        </p>
        <p className="font-semibold" style={{ color: CREAM }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-6 bg-white rounded-3xl shadow-[0_8px_30px_rgba(28,28,26,0.05)] border border-[#1c1c1a]/[0.06] p-8">
      <h2 className="text-xs font-semibold text-[#1c1c1a]/50 mb-3.5 uppercase tracking-widest">
        {title}
      </h2>
      {children}
    </section>
  );
}