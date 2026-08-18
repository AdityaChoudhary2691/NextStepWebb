import axios from "axios";
import React, { createContext , useState , useRef, useEffect} from "react";

export const AppContext = createContext();

const colors = [
  "bg-pink-500/30",
  "bg-blue-500/30",
  "bg-green-500/30",
  "bg-yellow-500/30",
  "bg-purple-500/30",
  "bg-red-500/30",
];
const years = Array.from({ length: 7 }, (_, i) => 2024 + i);


export const AppProvider = ({ children }) => {
  const [job, setJob] = useState([]);
 
  const[position,setPosition]=useState("");
  const[name,setName]=useState("");
  const [remuneration, setremuneration] = useState("");
const [description, setdescription] = useState("");
  const [candidates, setCandidates] = useState([]);
 const [skill, setSkills] = useState([]);
 const [uname, setUName] = useState("");
 const [mobile, setMobile] = useState("");
 const [email, setEmail] = useState("");
 const [status, setStatus] = useState("");
 const [resume, setResume] = useState("")
 const [vedio, setVedio] = useState("")
 const [apply,setApply]=useState("");
  
  const [passoutYear, setPassoutYear] = useState("");

useEffect(() => {
    axios.get("http://localhost:8081/getjobs")
      .then(res => setJob(res.data));
  }, []);

 useEffect(()=>{
  axios.get("http://localhost:8081/getskills")
  .then(res=>setCandidates(res.data));
 },[])

  return (
    <AppContext.Provider value={{ job,setJob,position,setPosition,name,setName,remuneration,setremuneration,description,setdescription, colors ,candidates,skill,uname,mobile,resume,skill,email,status,vedio,apply,setSkills,setUName,setMobile,setEmail,setStatus,setResume,setVedio,setApply,years,passoutYear,setPassoutYear,candidates,setCandidates}}>
      {children}
    </AppContext.Provider>
  );
};
