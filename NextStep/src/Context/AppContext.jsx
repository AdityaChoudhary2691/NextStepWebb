import React, { createContext , useState , useRef} from "react";

export const AppContext = createContext();

const colors = [
  "bg-pink-500/30",
  "bg-blue-500/30",
  "bg-green-500/30",
  "bg-yellow-500/30",
  "bg-purple-500/30",
  "bg-red-500/30",
];

const candidates = [
  {
    name: "Aditya Sharma",
    mobile: "9876543210",
    email: "aditya.sharma@example.com",
    status: "studying",
    passoutYear: "2026",
    applyingFor: "Internship",
    skills: ["React", "Java", "Spring Boot", "MySQL"],
    projects: [
      { title: "Fresher-Employer Matching Platform", link: "#" },
      { title: "E-commerce Backend (Spring Boot)", link: "#" },
    ],
    resume: { name: "Aditya_Resume.pdf", size: 482000, url: "#" },
    video: { name: "intro.mp4", size: 8400000, url: "#" },
     
  },
  {
    name: "Priya Nair",
    mobile: "9123456780",
    email: "priya.nair@example.com",
    status: "passout",
    passoutYear: "2025",
    applyingFor: "Job",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    projects: [
      { title: "Inventory Management System", link: "#" },
      { title: "Real-time Chat App (WebSockets)", link: "#" },
    ],
    resume: { name: "Priya_Resume.pdf", size: 356000, url: "#" },
    video: { name: "intro.mp4", size: 6100000, url: "#" },
     
  },
  {
    name: "Rohan Verma",
    mobile: "9988776655",
    email: "rohan.verma@example.com",
    status: "studying",
    passoutYear: "2027",
    applyingFor: "Internship",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
    projects: [
      { title: "Task Manager REST API", link: "#" },
    ],
    resume: { name: "Rohan_Resume.pdf", size: 298000, url: "#" },
    video: null,
     
  },
  {
    name: "Sneha Iyer",
    mobile: "9012345678",
    email: "sneha.iyer@example.com",
    status: "passout",
    passoutYear: "2024",
    applyingFor: "Job",
    skills: ["Java", "Hibernate", "Spring Boot", "Kafka", "AWS"],
    projects: [
      { title: "Distributed Order Processing System", link: "#" },
      { title: "Bank Transaction Simulator", link: "#" },
      { title: "Microservices Auth Gateway", link: "#" },
    ],
    resume: { name: "Sneha_Resume.pdf", size: 512000, url: "#" },
    video: { name: "intro.mp4", size: 9200000, url: "#" },
     
  },
  {
    name: "Karan Mehta",
    mobile: "9345612780",
    email: "karan.mehta@example.com",
    status: "studying",
    passoutYear: "2026",
    applyingFor: "Internship",
    skills: ["HTML", "CSS", "Tailwind", "React", "Redux"],
    projects: [
      { title: "Portfolio Builder Web App", link: "#" },
    ],
    resume: { name: "Karan_Resume.pdf", size: 214000, url: "#" },
    video: { name: "intro.mp4", size: 4300000, url: "#" },
     
  },
  {
    name: "Ananya Gupta",
    mobile: "9871234560",
    email: "ananya.gupta@example.com",
    status: "passout",
    passoutYear: "2025",
    applyingFor: "Job",
    skills: ["C++", "DSA", "System Design", "Java"],
    projects: [],
    resume: { name: "Ananya_Resume.pdf", size: 401000, url: "#" },
    video: null,
     
  },
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
  const [job, setJob] = useState([{
    type: "Internship",
    position: "Backend Developer Intern",
    name: "Launchbay Technologies",
    renumeration: "₹15,000/month",
    desc: "Work with our engineering team on Spring Boot microservices..."
  }]);
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [video, setVideo] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const[position,setPosition]=useState("");
  const[name,setName]=useState("");
  const[renumeration,setRenumeration]=useState("");
  const[desc,setDesc]=useState("");

  const resumeInputRef = useRef(null);
  const videoInputRef = useRef(null);
  return (
    <AppContext.Provider value={{ job,setJob,position,setPosition,name,setName,renumeration,setRenumeration,desc,setDesc, colors ,form,setForm,skillInput,skills,resumeInputRef,videoInputRef,setSkillInput,resume,setResume,video,setVideo,errors,setErrors,submitted,setSubmitted,candidates}}>
      {children}
    </AppContext.Provider>
  );
};
