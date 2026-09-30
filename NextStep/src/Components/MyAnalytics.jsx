import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

/* ---------- Config ---------- */
const API_BASE = import.meta.env.VITE_API_URL;
const USE_MOCK = false;

/*
  Endpoints this page expects (Spring Boot):
    GET {API_BASE}/analytics/recruiter/{userId}?range=30d
    GET {API_BASE}/analytics/candidate/{userId}?range=30d
  Response shapes match MOCK below.
*/
const MOCK = {
  RECRUITER: {
    jobs: { total: 24, active: 15, expired: 9 },
    funnel: { views: 4820, applications: 612, interviews: 148, offers: 37 },
    responseHours: { average: 18.5, target: 24, trend: [31, 28, 26, 22, 24, 20, 18.5] },
    demographics: {
      skills: [["Java", 210], ["React", 176], ["Python", 158], ["SQL", 141], ["Spring Boot", 96]],
      education: [["B.Tech / B.E.", 388], ["BCA / B.Sc", 121], ["MCA / M.Tech", 74], ["Diploma", 29]],
      location: [["Delhi NCR", 231], ["Bengaluru", 148], ["Pune", 97], ["Hyderabad", 82], ["Remote", 54]],
    },
    postings: [
      { title: "Java Backend Trainee", status: "Active", views: 1120, applications: 164 },
      { title: "React Frontend Intern", status: "Active", views: 980, applications: 131 },
      { title: "QA Engineer Trainee", status: "Expired", views: 540, applications: 71 },
    ],
  },
  CANDIDATE: {
    counts: { applied: 18, shortlisted: 7, interviews: 3, offers: 1 },
    responseHours: { average: 52, trend: [70, 64, 60, 58, 55, 54, 52] }, // how fast recruiters reply to you
    profileViews: 46,
    skillsInDemand: [["Java", 12], ["Spring Boot", 9], ["SQL", 8], ["React", 5]],
    applications: [
      { job: "Java Backend Trainee", company: "Acme Tech", status: "Interview", appliedOn: "2026-09-21" },
      { job: "React Frontend Intern", company: "Pixel Labs", status: "Shortlisted", appliedOn: "2026-09-18" },
      { job: "Data Analyst (Fresher)", company: "Numera", status: "Applied", appliedOn: "2026-09-25" },
      { job: "QA Trainee", company: "Bytewise", status: "Rejected", appliedOn: "2026-09-10" },
    ],
  },
};

/* ---------- Helpers ---------- */
const pct = (a, b) => (b ? ((a / b) * 100).toFixed(1) : "0.0");
const RANGES = ["7d", "30d", "90d"];
const ring = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6F80]";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("nexepUser") || "{}");
  } catch {
    return {};
  }
}

function useAnalytics(user, range) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const kind = user.role === "RECRUITER" ? "RECRUITER" : "CANDIDATE";
  const userId = user.id ?? user.userId;

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: "" });

    if (USE_MOCK) {
      const t = setTimeout(() => !cancelled && setState({ data: MOCK[kind], loading: false, error: "" }), 250);
      return () => { cancelled = true; clearTimeout(t); };
    }

    fetch(`${API_BASE}/analytics/${kind.toLowerCase()}/${userId}?range=${range}`)
      .then((r) => { if (!r.ok) throw new Error(`Server returned ${r.status}`); return r.json(); })
      .then((data) => !cancelled && setState({ data, loading: false, error: "" }))
      .catch((e) => !cancelled && setState({ data: null, loading: false, error: e.message }));
    return () => { cancelled = true; };
  }, [kind, userId, range]);

  return { ...state, kind };
}

/* ---------- Shared building blocks ---------- */
function Panel({ title, note, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 ${className}`}>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {note && <p className="mt-0.5 text-sm text-slate-500">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-slate-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function Funnel({ stages }) {
  const shade = ["#0F4C5C", "#1D6F80", "#3B93A3", "#E09F3E"];
  const W = 640, H = 64, GAP = 6;
  const widthOf = (v) => Math.max((v / (stages[0].value || 1)) * W, 60);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${stages.length * (H + GAP)}`} className="w-full" role="img"
        aria-label={`Funnel: ${stages.map((s) => `${s.label} ${s.value}`).join(", ")}`}>
        {stages.map((s, i) => {
          const top = widthOf(s.value);
          const bottom = widthOf(stages[i + 1]?.value ?? s.value * 0.85);
          const y = i * (H + GAP);
          const x1 = (W - top) / 2, x2 = (W - bottom) / 2;
          return (
            <g key={s.label}>
              <polygon points={`${x1},${y} ${x1 + top},${y} ${x2 + bottom},${y + H} ${x2},${y + H}`}
                fill={shade[Math.min(i, shade.length - 1)]} />
              <text x={W / 2} y={y + H / 2 - 4} textAnchor="middle" fill="#fff" fontSize="13">{s.label}</text>
              <text x={W / 2} y={y + H / 2 + 16} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="600">
                {s.value.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        {stages.slice(1).map((s, i) => (
          <li key={s.label} className="rounded-lg bg-slate-50 p-3">
            <span className="block text-slate-500">{stages[i].label} → {s.label}</span>
            <b className="text-slate-900">{pct(s.value, stages[i].value)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarList({ rows, color = "#1D6F80" }) {
  const max = Math.max(...rows.map((r) => r[1]), 1);
  return (
    <ul className="space-y-3">
      {rows.map(([name, n]) => (
        <li key={name}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-slate-700">{name}</span>
            <span className="tabular-nums text-slate-500">{n}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full" style={{ width: `${(n / max) * 100}%`, background: color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Sparkline({ points, target, label }) {
  const W = 300, H = 90, P = 8;
  const top = Math.max(...points, target ?? 0) * 1.1;
  const min = Math.min(...points) * 0.8;
  const x = (i) => P + (i / Math.max(points.length - 1, 1)) * (W - P * 2);
  const y = (v) => H - P - ((v - min) / (top - min || 1)) * (H - P * 2);
  const d = points.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={label}>
      {target != null && <line x1={P} x2={W - P} y1={y(target)} y2={y(target)} stroke="#E09F3E" strokeDasharray="4 4" />}
      <path d={d} fill="none" stroke="#0F4C5C" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#0F4C5C" />)}
    </svg>
  );
}

const STATUS_STYLE = {
  Active: "bg-emerald-50 text-emerald-700",
  Expired: "bg-slate-100 text-slate-500",
  Applied: "bg-slate-100 text-slate-600",
  Shortlisted: "bg-sky-50 text-sky-700",
  Interview: "bg-amber-50 text-amber-700",
  Offer: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
};
const Badge = ({ children }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[children] || STATUS_STYLE.Applied}`}>{children}</span>
);

/* ---------- Recruiter view ---------- */
function RecruiterView({ d, range }) {
  const [tab, setTab] = useState("skills");
  const [sortBy, setSortBy] = useState("views");
  const f = d.funnel || {};
  const r = d.responseHours;
  const hasApps = f.applications != null;

  const postings = useMemo(
    () =>
      (d.postings || [])
        .map((p) => ({ ...p, rate: p.applications != null ? +pct(p.applications, p.views) : null }))
        .sort((a, b) => (b[sortBy] ?? -1) - (a[sortBy] ?? -1)),
    [d.postings, sortBy]
  );
  const tabs = { skills: "Skills", education: "Education", location: "Location" };
  const sortCols = [["views", "Views"], ...(hasApps ? [["applications", "Applications"], ["rate", "Apply rate"]] : [])];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Jobs posted" value={d.jobs.total} />
        <Stat label="Job views" value={(f.views ?? 0).toLocaleString()} sub={`Last ${range.replace("d", " days")}`} />
        {d.jobs.active != null && <Stat label="Active" value={d.jobs.active} />}
        {r && <Stat label="Avg. response time" value={`${r.average}h`} sub={`Target ${r.target}h`} />}
      </div>

      {hasApps ? (
        <div className="grid gap-6 lg:grid-cols-5">
          <Panel title="Application funnel" note="From first view to accepted offer" className="lg:col-span-3">
            <Funnel stages={[
              { label: "Views", value: f.views },
              { label: "Applications", value: f.applications },
              { label: "Interviews", value: f.interviews ?? 0 },
              { label: "Offers", value: f.offers ?? 0 },
            ]} />
          </Panel>
          {r && (
            <Panel title="Your response time" note="Average hours to review or reply, by week" className="lg:col-span-2">
              <Sparkline points={r.trend} target={r.target} label="Average response time by week" />
            </Panel>
          )}
        </div>
      ) : (
        <Panel title="Views by posting" note="How many candidates opened each job's details">
          {postings.length ? (
            <BarList rows={postings.map((p) => [p.title, p.views])} />
          ) : (
            <p className="text-sm text-slate-500">No postings yet. Post a job to start collecting views.</p>
          )}
        </Panel>
      )}

      {d.demographics && (
        <Panel title="Who is applying" note="Applicants across your postings">
          <div role="tablist" className="mb-5 flex gap-2">
            {Object.entries(tabs).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                className={`rounded-full px-4 py-1.5 text-sm ${ring} ${tab === k ? "bg-[#0F4C5C] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {label}
              </button>
            ))}
          </div>
          <BarList rows={d.demographics[tab]} />
        </Panel>
      )}

      <Panel title="Posting engagement" note="Which postings attract the most candidates">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-medium">Posting</th>
                {sortCols.map(([k, label]) => (
                  <th key={k} className="py-2 pr-4 text-right font-medium">
                    <button onClick={() => setSortBy(k)} className={`${ring} ${sortBy === k ? "text-slate-900" : ""}`}>
                      {label}{sortBy === k ? " ↓" : ""}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {postings.map((p) => (
                <tr key={p.id ?? p.title} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.title}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{p.views.toLocaleString()}</td>
                  {hasApps && <td className="py-3 pr-4 text-right tabular-nums">{p.applications ?? "—"}</td>}
                  {hasApps && <td className="py-3 pr-4 text-right tabular-nums">{p.rate != null ? `${p.rate}%` : "—"}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* ---------- Candidate view ---------- */
function CandidateView({ d }) {
  const c = d.counts;
  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Applications sent" value={c.applied} />
        <Stat label="Shortlisted" value={c.shortlisted} sub={`${pct(c.shortlisted, c.applied)}% of applications`} />
        <Stat label="Interviews" value={c.interviews} />
        <Stat label="Profile views" value={d.profileViews} sub="By recruiters" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Panel title="Your application progress" note="How far your applications have moved" className="lg:col-span-3">
          <Funnel stages={[
            { label: "Applied", value: c.applied },
            { label: "Shortlisted", value: c.shortlisted },
            { label: "Interviews", value: c.interviews },
            { label: "Offers", value: c.offers },
          ]} />
        </Panel>
        <Panel title="Recruiter response time" note="Average hours recruiters take to reply to you" className="lg:col-span-2">
          <Sparkline points={d.responseHours.trend} label="Recruiter response time by week" />
          <p className="mt-3 text-sm text-slate-600">Recruiters currently reply in about {d.responseHours.average}h on average.</p>
        </Panel>
      </div>

      <Panel title="Skills in the jobs you applied to" note="Skills asked for most often across your applications">
        <BarList rows={d.skillsInDemand} />
      </Panel>

      <Panel title="Your applications" note="Latest status for each job">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-medium">Job</th>
                <th className="py-2 pr-4 font-medium">Company</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 text-right font-medium">Applied on</th>
              </tr>
            </thead>
            <tbody>
              {d.applications.map((a) => (
                <tr key={a.job + a.appliedOn} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium">{a.job}</td>
                  <td className="py-3 pr-4 text-slate-600">{a.company}</td>
                  <td className="py-3 pr-4"><Badge>{a.status}</Badge></td>
                  <td className="py-3 text-right tabular-nums text-slate-600">
                    {new Date(a.appliedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* ---------- Page ---------- */
export default function MyAnalytics() {
  const user = useMemo(getUser, []);
  const [range, setRange] = useState("30d");
  const { data, loading, error, kind } = useAnalytics(user, range);
  const loggedIn = Boolean(user.username);

  return (
    <>
      <main className="min-h-screen bg-[#F3F6F8] px-4 py-8 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">
                {loggedIn ? `${user.username}'s analytics` : "My analytics"}
              </h1>
              <p className="text-sm text-slate-500">
                {kind === "RECRUITER"
                  ? "How your job postings are performing with freshers."
                  : "How your applications are progressing."}
              </p>
            </div>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1" role="group" aria-label="Date range">
              {RANGES.map((x) => (
                <button key={x} onClick={() => setRange(x)} aria-pressed={range === x}
                  className={`rounded-md px-3 py-1.5 text-sm ${ring} ${range === x ? "bg-[#0F4C5C] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                  Last {x.replace("d", " days")}
                </button>
              ))}
            </div>
          </header>

          {!loggedIn && (
            <Panel title="Sign in to see your analytics">
              <p className="text-sm text-slate-600">Your analytics are tied to your account.</p>
              <Link to="/" className="mt-3 inline-block rounded-lg bg-[#0F4C5C] px-4 py-2 text-sm text-white">Go to home</Link>
            </Panel>
          )}

          {loggedIn && loading && <p className="text-sm text-slate-500" role="status">Loading your analytics…</p>}

          {loggedIn && error && (
            <Panel title="Couldn't load your analytics">
              <p className="text-sm text-slate-600">{error}. Check that the server is running, then reload the page.</p>
            </Panel>
          )}

          {loggedIn && data && (kind === "RECRUITER" ? <RecruiterView d={data} range={range} /> : <CandidateView d={data} />)}
        </div>
      </main>
    </>
  );
}