import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  FileText,
  Video,
  Search,
  CheckCircle2,
  Menu,
  X,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";

const INK = "#0B0B0B";
const PAPER = "#FAFAF8";
const LINE = "#E3E3E0";
const MUTE = "#686863";
const WHITE = "#FFFFFF";

const freshersSteps = [
  {
    n: "01",
    title: "Build your profile",
    body: "Add your resume, projects, and a short video intro — the things a static PDF never shows.",
    icon: FileText,
  },
  {
    n: "02",
    title: "Get matched on skill",
    body: "Nexep surfaces roles that fit what you can actually do, not just your years on paper.",
    icon: Search,
  },
  {
    n: "03",
    title: "Apply and get seen",
    body: "Recruiters see your video intro first. First impressions stop being a coin flip.",
    icon: CheckCircle2,
  },
];

const recruiterSteps = [
  {
    n: "01",
    title: "Post the role",
    body: "List the skills and level you actually need — Nexep filters out the noise for you.",
    icon: Briefcase,
  },
  {
    n: "02",
    title: "Browse real candidates",
    body: "Search by skill, not keyword-stuffed résumés. Watch video intros before you shortlist.",
    icon: Video,
  },
  {
    n: "03",
    title: "Hire fresh talent",
    body: "Message directly, move fast, and fill entry-level roles without the agency markup.",
    icon: CheckCircle2,
  },
];

const skills = [
  "React", "Java", "Spring Boot", "SQL", "Python", "Node.js",
  "UI/UX", "AWS", "DSA", "Figma", "MongoDB", "TypeScript",
];

export default function NexepHome() {
  const [role, setRole] = useState("fresher");
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const isFresher = role === "fresher";
  const steps = isFresher ? freshersSteps : recruiterSteps;

  return (
    <div style={{ backgroundColor: PAPER, color: INK }} className="min-h-screen font-sans">
      

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div
            style={{ borderColor: LINE }}
            className="inline-flex items-center gap-0.5 rounded-full border p-1 mb-8"
          >
            <button
              onClick={() => setRole("fresher")}
              style={isFresher ? { backgroundColor: INK, color: WHITE } : { color: MUTE }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            >
              I'm a fresher
            </button>
            <button
              onClick={() => setRole("recruiter")}
              style={!isFresher ? { backgroundColor: INK, color: WHITE } : { color: MUTE }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            >
              I'm hiring
            </button>
          </div>

          <h1 className="font-serif leading-[1.05] text-5xl md:text-6xl mb-6" style={{ letterSpacing: "-0.02em" }}>
            {isFresher ? (
              <>Where fresh talent meets its <em className="italic">first</em> yes.</>
            ) : (
              <>Skip the pile of résumés. Meet the candidate.</>
            )}
          </h1>

          <p className="text-lg mb-9 max-w-md" style={{ color: MUTE }}>
            {isFresher
              ? "Nexep is where freshers post resumes, projects, and video intros — and get matched to roles by skill, not just a degree."
              : "Nexep is where recruiters post roles and search fresh candidates by real skill — résumé, projects, and a video intro, all in one place."}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
            onClick={()=>navigate('/login')}
              style={{ backgroundColor: INK, color: WHITE }}
              className="px-6 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              {isFresher ? "Create your profile" : "Post a job"} <ArrowRight size={16} />
            </button>
            <button className="px-6 py-3.5 rounded-full font-semibold text-sm border" style={{ borderColor: INK }}>
              {isFresher ? "Browse open roles" : "Browse candidates"}
            </button>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8" style={{ borderTop: `1px solid ${LINE}` }}>
            {[
              ["4,200+", "fresher profiles"],
              ["860+", "companies hiring"],
              ["120+", "skills tracked"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl">{n}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: MUTE }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div
            style={{ backgroundColor: INK, color: WHITE, transform: "rotate(-3deg)" }}
            className="absolute w-72 md:w-80 rounded-2xl p-6 -translate-y-4 translate-x-6 shadow-2xl transition-transform duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#A0A09B" }}>
                {isFresher ? "Job posting" : "Candidate"}
              </span>
              <Star size={16} />
            </div>
            <div className="font-serif text-xl mb-1">
              {isFresher ? "Frontend Engineer, Fresher" : "Aditya M."}
            </div>
            <div className="text-sm mb-6" style={{ color: "#A0A09B" }}>
              {isFresher ? "Nexep Technologies · Remote" : "B.Tech CSE · Open to work"}
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Tailwind", "APIs"].map((s) => (
                <span key={s} style={{ border: "1px solid #3A3A38" }} className="text-xs px-2.5 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{ backgroundColor: WHITE, borderColor: LINE, transform: "rotate(4deg)" }}
            className="w-72 md:w-80 rounded-2xl p-6 border translate-y-40 translate-x-[-24px] shadow-xl transition-transform duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-widest" style={{ color: MUTE }}>
                {isFresher ? "Your profile" : "Open role"}
              </span>
              <Video size={16} />
            </div>
            <div className="font-serif text-xl mb-1">
              {isFresher ? "Your name here" : "Backend Developer, Fresher"}
            </div>
            <div className="text-sm mb-6" style={{ color: MUTE }}>
              {isFresher ? "Resume · Projects · Video intro" : "0–1 yr · Java, Spring Boot"}
            </div>
            <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: LINE }}>
              <div className="h-1.5 rounded-full w-4/5" style={{ backgroundColor: INK }} />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ backgroundColor: WHITE, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-serif text-4xl" style={{ letterSpacing: "-0.01em" }}>
              How it works for {isFresher ? "freshers" : "recruiters"}
            </h2>
            <p className="text-sm max-w-xs" style={{ color: MUTE }}>
              Three steps. No agencies, no keyword games, no waiting weeks for a callback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ n, title, body, icon: Icon }) => (
              <div key={n} className="pt-6" style={{ borderTop: `2px solid ${INK}` }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl" style={{ color: MUTE }}>{n}</span>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTE }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl mb-3" style={{ letterSpacing: "-0.01em" }}>
          Search by what you can do
        </h2>
        <p className="text-sm mb-8 max-w-md" style={{ color: MUTE }}>
          Every profile and posting on Nexep is tagged by skill — so matches are made on ability, not just a job title.
        </p>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              style={{ borderColor: LINE }}
              className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-black hover:text-white transition-colors cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* WHY NEXEP */}
      <section id="why" style={{ backgroundColor: INK, color: WHITE }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="font-serif text-4xl mb-12" style={{ letterSpacing: "-0.01em" }}>
            Why Nexep, not a job board
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Video intros, not just PDFs",
                body: "A 60-second intro tells a recruiter more than three bullet points ever could.",
              },
              {
                title: "Skill-first matching",
                body: "We match on what you've built and what you know — not years of experience you don't have yet.",
              },
              {
                title: "Built for entry-level",
                body: "No senior-only listings buried in the feed. Every posting here is open to freshers.",
              },
            ].map((f) => (
              <div key={f.title}>
                <ArrowUpRight size={20} className="mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B5B5B0" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 max-w-2xl mx-auto" style={{ letterSpacing: "-0.02em" }}>
          Your first job shouldn't take a hundred applications.
        </h2>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            style={{ backgroundColor: INK, color: WHITE }}
            className="px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            Join as a fresher <ArrowRight size={16} />
          </button>
          <button className="px-7 py-3.5 rounded-full font-semibold text-sm border" style={{ borderColor: INK }}>
            Join as a recruiter
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg">nexep</span>
          <p className="text-xs" style={{ color: MUTE }}>© 2026 Nexep. Built for freshers and the people who hire them.</p>
        </div>
      </footer>
    </div>
  );
}
