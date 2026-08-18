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
import axios from "axios";

const ACCENT = "#E8A33D";
const INK ="#000000";

export default function ApplicationForm() {

  const [inputValue, setInputValue] = useState("");
  
 const{years,skill,setSkills,uname,setUName,mobile,setMobile,email,setEmail,status,setStatus,resume,setResume,vedio,setVedio,apply,setApply,passoutYear,setPassoutYear,candidates,setCandidates} = useContext(AppContext)

  

 

 
 
 const removeSkill=(item)=>{
   setSkills(skill.filter((i)=>i!==item));
  }
  
  const handleButton=(e)=>{
   if(e.key==="Enter"){
     e.preventDefault();
     handleSkills();
     
   }
  }
 const handleSkills=()=>{
      if (inputValue.trim() === "") return; // prevent empty values
    const newSkills = [...skill, inputValue.trim()];
      setSkills(newSkills);
      setInputValue("");
 }

  const handleUsername=(e)=>{
    setUName(e.target.value);
  }
  const handleMobile=(e)=>{
    setMobile(e.target.value);
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value);
  }
  const updateStatus=(e)=>{
    setApply(e);
  }
  const handleApply=(e)=>{
    setApply(e.target.value);
  }

  const update=(e)=>{
    setStatus(e);
  }

  const handleResume=(e)=>{
    setResume(e.target.value);
  }
  const handleVedio=(e)=>{
    setVedio(e.target.value);
  }
 


  function handleSubmit(e) {
    e.preventDefault();
    const newCandidate=[...candidates,{
      username:uname,
      mobileno : mobile,
      uemail: email,
      ustatus : status,
      applyingf : apply,
      upassoutYear: passoutYear,
      uskills:skill,
      uresume:resume,
      uvedio:vedio
    }]

    axios.post("http://localhost:8081/postskills",newCandidate)
    .then((res=>{
 setCandidates([...candidates, res.data]);

    setApply("");
    setUName("");
    setSkills([]);
    setMobile("");
    setPassoutYear("");
    setResume("");
    setVedio("");
    setEmail("");
    setStatus("");
    }))
   
  }
  return (
    <div
      style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#F7F8FB" }}
      className="min-h-screen py-10 px-4"
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6 items-start">
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
                icon={<User size={16} />}
              >
                <input
                  type="text"
                  value={uname}
                 onChange={handleUsername}
                  placeholder="Aditya Sharma"
                  
                />
              </Field>

              <Field
                label="Mobile number"
                required
                
                icon={<Phone size={16} />}
              >
                <input
                  type="tel"
                  value={mobile}
                 onChange={handleMobile}
                  placeholder="9876543210"
                  
                />
              </Field>

              <Field
                label="Email address"
                required
               
                icon={<Mail size={16} />}
                full
              >
                <input
                  type="email"
                  onChange={handleEmail}
                  value={email}
                  placeholder="you@example.com"
                 
                />
              </Field>
            </section>

            <Divider />

            {/* Academic status */}
            <section className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Current status"
                required
                icon={<GraduationCap size={16} />}
              >
                <select
                value={status}
                  onChange={(e)=>update(e.target.value)}
                  
                >
                  <option value="">Select status</option>
                  <option value="studying">Currently studying in college</option>
                  <option value="passout">Passed out from college</option>
                </select>
              </Field>

              {status === "studying" && (
                <Field
                  label="Expected year of passout"
                  required
                >
                  <select
                    value={passoutYear}
                    onChange={(e)=>setPassoutYear(e.target.value)}
                    
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
                icon={<Briefcase size={16} />}
              >
                <div className="flex gap-3">
                  {["Internship", "Job"].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => updateStatus(opt)}
                      className="flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors"
                      style={
                        apply === opt
                          ? { borderColor: ACCENT, backgroundColor: "#FEF6EA", color: INK }
                          : { borderColor: "#E5E7EB", color: "#6B7280" }
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
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
                  value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handleButton}
                  placeholder="e.g. React, Java, SQL"
                  className= " flex-1"
                />
                <button
                  type="button"
                  onClick={handleSkills}
                  className="px-4 rounded-lg font-semibold text-white flex items-center gap-1.5 shrink-0"
                  style={{ backgroundColor: INK }}
                >
                  <Plus size={16} /> Add
                </button>
              </div>
              

              {skill.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100 min-h-13">
                  {skill.map((s) => (
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
            <section className="grid m-5 ">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                Resume <span style={{ color: ACCENT }}>*</span>
              </label>
              <div className="flex gap-2"></div>
              <input
                  type="text"
                  value={resume}
                  placeholder="Resume"
                  className="flex-1"
                  onChange={handleResume}
                />

              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                Vedio Intro <span style={{ color: ACCENT }}>*</span>
              </label>
              <div className="flex gap-2"></div>
              <input
                  type="text"
                  placeholder="Vedio Intro"
                  className="flex-1"
                  value={vedio}
                  onChange={handleVedio}
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
        <div className="lg:sticky lg:top-25">
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
                {uname[0]}
              </div>
            </div>
            <div className="pt-11 pb-5 px-6">
              <h3 className="font-bold text-lg" style={{ color: INK }}>
                  
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {uname}
              </p>

              <div className="space-y-2.5 text-sm ">
                <PreviewRow
                  label="Status"
                 
                />
                {status}
                <PreviewRow label="Applying for"  /><h2></h2> 
                <PreviewRow label="Mobile" />{mobile}
              </div>

               {skill.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 mb-2">SKILLS</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.map((s) => (
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
                  // style={{ color: resume ? "#3A7D5C" : "#B0B5BF" }}
                >
                  {/* <FileText size={13} /> Resume {resume ? "attached" : "missing"} */}
                </span>
                <span
                  className="flex items-center gap-1"
                  // style={{ color: video ? "#3A7D5C" : "#B0B5BF" }}
                >
                  
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
