import React, { createContext , useState , useRef} from "react";

export const AppContext = createContext();
const Jobs = [
  {
    type: "Internship",
    position: "Java Backend Developer",
    company: "Company Name",
    postedDate: "25/12/2026",
  },
  {
    type: "Job",
    position: "Frontend Developer",
    company: "Tech Solutions",
    postedDate: "01/01/2027",
  },
  {
    type: "Internship",
    position: "Data Analyst",
    company: "Analytics Corp",
    postedDate: "15/01/2027",
  },
  {
    type: "Job",
    position: "UI/UX Designer",
    company: "Creative Minds Studio",
    postedDate: "20/01/2027",
  },
  {
    type: "Internship",
    position: "Cloud Engineer Intern",
    company: "SkyNet Systems",
    postedDate: "25/01/2027",
  },
  {
    type: "Job",
    position: "Full Stack Developer",
    company: "NextGen Solutions",
    postedDate: "28/01/2027",
  },
  {
    type: "Internship",
    position: "Machine Learning Intern",
    company: "AI Labs",
    postedDate: "02/02/2027",
  },
  {
    type: "Job",
    position: "DevOps Engineer",
    company: "InfraWorks",
    postedDate: "05/02/2027",
  },
  {
    type: "Internship",
    position: "Cybersecurity Intern",
    company: "SecureTech",
    postedDate: "10/02/2027",
  },
  {
    type: "Job",
    position: "Mobile App Developer",
    company: "Appify",
    postedDate: "12/02/2027",
  }
];

const colors = [
  "bg-pink-500/30",
  "bg-blue-500/30",
  "bg-green-500/30",
  "bg-yellow-500/30",
  "bg-purple-500/30",
  "bg-red-500/30",
];




export const AppProvider = ({ children }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "",
    passoutYear: "",
    applyingFor: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [video, setVideo] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const resumeInputRef = useRef(null);
  const videoInputRef = useRef(null);
  return (
    <AppContext.Provider value={{ Jobs , colors ,form,setForm,skillInput,skills,resumeInputRef,videoInputRef,setSkillInput,resume,setResume,video,setVideo,errors,setErrors,submitted,setSubmitted}}>
      {children}
    </AppContext.Provider>
  );
};
