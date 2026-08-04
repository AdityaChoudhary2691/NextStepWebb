import React, { useState, useRef, useContext } from "react";
 import{ User,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Plus,
  X,
  FileText,
  Video,
  Upload,
  Check,
  Sparkles,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";

const ACCENT = "#E8A33D";
const INK ="#000000";

export default function ApplicationForm() {
  
 const{form,setForm,skillInput,skills,resumeInputRef,videoInputRef,setSkillInput,resume,setResume,video,setVideo,errors,setErrors,submitted,setSubmitted} = useContext(AppContext)

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function addSkill() {
    const val = skillInput.trim();
    if (!val) return;
    if (skills.some((s) => s.toLowerCase() === val.toLowerCase())) {
      setSkillInput("");
      return;
    }
    setSkills((s) => [...s, val]);
    setSkillInput("");
  }

  function removeSkill(skill) {
    setSkills((s) => s.filter((x) => x !== skill));
  }

  function handleSkillKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  function handleResumeChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErrors((er) => ({ ...er, resume: "Only PDF files are accepted." }));
      return;
    }
    setResume(file);
    setErrors((er) => ({ ...er, resume: undefined }));
  }

  function handleVideoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setErrors((er) => ({ ...er, video: "Only video files are accepted." }));
      return;
    }
    setVideo(file);
    setErrors((er) => ({ ...er, video: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your full name.";
    if (!/^\d{10}$/.test(form.mobile.trim()))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    if (!form.status) e.status = "Select your current status.";
    if (form.status === "studying" && !form.passoutYear)
      e.passoutYear = "Select your expected passout year.";
    if (!form.applyingFor) e.applyingFor = "Select what you're applying for.";
    if (skills.length === 0) e.skills = "Add at least one skill.";
    if (!resume) e.resume = "Upload your resume as a PDF.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  function formatSize(bytes) {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  const initials = form.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen flex items-center justify-center p-6" >
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: ACCENT }}
          >
            <Check size={30} color="white" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: INK }}>
            Application submitted
          </h2>
          <p className="text-gray-500 mb-6">
            Thanks, {form.name.split(" ")[0]}. We've received your details for
            the {form.applyingFor} track. Our team will reach out on{" "}
            {form.email}.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                mobile: "",
                email: "",
                status: "",
                passoutYear: "",
                applyingFor: "",
              });
              setSkills([]);
              setResume(null);
              setVideo(null);
            }}
            className="px-6 py-2.5 rounded-lg font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: INK }}
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#F7F8FB" }}
      className="min-h-screen py-10 px-4"
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div
            className="px-8 py-7"
            style={{ backgroundColor: INK }}
          >
            {/* <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} color={ACCENT} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: ACCENT }}
              >
                Candidate Application
              </span>
            </div> */}
            <h1 className="text-2xl font-bold text-white">
              Upload Your Details
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              Fields marked * are required.
            </p>
          </div>

          <div className="p-8 space-y-7">
            {/* Personal details */}
            <section className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Full name"
                required
                error={errors.name}
                icon={<User size={16} />}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Aditya Sharma"
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field
                label="Mobile number"
                required
                error={errors.mobile}
                icon={<Phone size={16} />}
              >
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    update("mobile", e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                  }
                  placeholder="9876543210"
                  className={inputClass(errors.mobile)}
                />
              </Field>

              <Field
                label="Email address"
                required
                error={errors.email}
                icon={<Mail size={16} />}
                full
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass(errors.email)}
                />
              </Field>
            </section>

            <Divider />

            {/* Academic status */}
            <section className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Current status"
                required
                error={errors.status}
                icon={<GraduationCap size={16} />}
              >
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className={inputClass(errors.status)}
                >
                  <option value="">Select status</option>
                  <option value="studying">Currently studying in college</option>
                  <option value="passout">Passed out from college</option>
                </select>
              </Field>

              {form.status === "studying" && (
                <Field
                  label="Expected year of passout"
                  required
                  error={errors.passoutYear}
                >
                  <select
                    value={form.passoutYear}
                    onChange={(e) => update("passoutYear", e.target.value)}
                    className={inputClass(errors.passoutYear)}
                  >
                    <option value="">Select year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field
                label="Applying for"
                required
                error={errors.applyingFor}
                icon={<Briefcase size={16} />}
                full={form.status !== "studying"}
              >
                <div className="flex gap-3">
                  {["Internship", "Job"].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => update("applyingFor", opt)}
                      className="flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors"
                      style={
                        form.applyingFor === opt
                          ? { borderColor: ACCENT, backgroundColor: "#FEF6EA", color: INK }
                          : { borderColor: "#E5E7EB", color: "#6B7280" }
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.applyingFor && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.applyingFor}</p>
                )}
              </Field>
            </section>

            <Divider />

            {/* Skills */}
            <section>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                Skills <span style={{ color: ACCENT }}>*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="e.g. React, Java, SQL"
                  className={inputClass(errors.skills) + " flex-1"}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 rounded-lg font-semibold text-white flex items-center gap-1.5 shrink-0"
                  style={{ backgroundColor: INK }}
                >
                  <Plus size={16} /> Add
                </button>
              </div>
              {errors.skills && (
                <p className="text-red-500 text-xs mt-1.5">{errors.skills}</p>
              )}

              {skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100 min-h-[52px]">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: "#FEF6EA", color: INK, border: "1px solid #F3D9A8" }}
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSkill(s)}
                        className="hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>

            <Divider />

            {/* Uploads */}
            <section className="grid sm:grid-cols-2 gap-5">
              <UploadBox
                label="Resume (PDF)"
                required
                error={errors.resume}
                icon={<FileText size={18} />}
                file={resume}
                onClick={() => resumeInputRef.current?.click()}
                onRemove={() => setResume(null)}
                accept="application/pdf"
                hint="PDF up to 10MB"
                formatSize={formatSize}
              />
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                className="hidden"
              />

              <UploadBox
                label="Video introduction"
                icon={<Video size={18} />}
                file={video}
                onClick={() => videoInputRef.current?.click()}
                onRemove={() => setVideo(null)}
                accept="video/*"
                hint="MP4, up to 2 minutes"
                error={errors.video}
                formatSize={formatSize}
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </section>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              By submitting, you agree your info is shared with hiring partners.
            </p>
            <button
              type="submit"
              className="px-7 py-3 rounded-lg font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT }}
            >
              Submit application
            </button>
          </div>
        </form>

        {/* LIVE PREVIEW CARD */}
        <div className="lg:sticky lg:top-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 px-1">
            Live preview
          </p>
          <div
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            style={{ backgroundColor: "white" }}
          >
            <div
              className="h-20 relative"
              style={{
                background: `linear-gradient(135deg, ${INK}, #26375C)`,
              }}
            >
              <div
                className="absolute -bottom-8 left-6 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white border-4 border-white"
                style={{ backgroundColor: ACCENT }}
              >
                {initials || <User size={22} />}
              </div>
            </div>
            <div className="pt-11 pb-5 px-6">
              <h3 className="font-bold text-lg" style={{ color: INK }}>
                {form.name || "Your name"}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {form.email || "your.email@example.com"}
              </p>

              <div className="space-y-2.5 text-sm">
                <PreviewRow
                  label="Status"
                  value={
                    form.status === "studying"
                      ? `Studying · Class of ${form.passoutYear || "—"}`
                      : form.status === "passout"
                      ? "Passed out"
                      : "—"
                  }
                />
                <PreviewRow label="Applying for" value={form.applyingFor || "—"} />
                <PreviewRow label="Mobile" value={form.mobile || "—"} />
              </div>

              {skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 mb-2">SKILLS</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-1 rounded-md font-medium"
                        style={{ backgroundColor: "#F1F4F9", color: INK }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs">
                <span
                  className="flex items-center gap-1"
                  style={{ color: resume ? "#3A7D5C" : "#B0B5BF" }}
                >
                  <FileText size={13} /> Resume {resume ? "attached" : "missing"}
                </span>
                <span
                  className="flex items-center gap-1"
                  style={{ color: video ? "#3A7D5C" : "#B0B5BF" }}
                >
                  <Video size={13} /> Video {video ? "attached" : "optional"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-right" style={{ color: INK }}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gray-100" />;
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

function inputClass(error) {
  return `w-full px-3.5 py-2.5 rounded-lg border-2 text-sm outline-none transition-colors bg-white ${
    error
      ? "border-red-300 focus:border-red-400"
      : "border-gray-200 focus:border-[#E8A33D]"
  }`;
}

function UploadBox({ label, required, error, icon, file, onClick, onRemove, hint, formatSize }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
        {icon}
        {label} {required && <span style={{ color: ACCENT }}>*</span>}
      </label>
      {!file ? (
        <button
          type="button"
          onClick={onClick}
          className={`w-full border-2 border-dashed rounded-lg py-6 flex flex-col items-center justify-center gap-1.5 text-sm transition-colors hover:bg-gray-50 ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        >
          <Upload size={18} className="text-gray-400" />
          <span className="text-gray-500 font-medium">Click to upload</span>
          <span className="text-gray-350 text-xs text-gray-400">{hint}</span>
        </button>
      ) : (
        <div className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#FEF6EA", color: INK }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: INK }}>
                {file.name}
              </p>
              <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 hover:bg-gray-100 rounded-md shrink-0"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
