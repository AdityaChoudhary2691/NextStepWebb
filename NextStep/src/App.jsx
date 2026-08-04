import React from 'react'
import { BrowserRouter as Router, Routes, Route , useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from './Components/Nav'
import JobCard from './Components/JobCard'
import PostJob from './Components/PostJob';
import ApplicationForm from './Components/ApplicationForm';

const App = () => {
  const location = useLocation();
  return (
    <>
    <Nav></Nav>
    <Routes>
      <Route path='/findjobs' element={
        <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  <JobCard></JobCard>
</motion.div>
        }></Route>
      <Route path='/postjobs' element={<PostJob/>}></Route>
      <Route path='/postskills' element={<ApplicationForm></ApplicationForm>}></Route>
   </Routes>
   </>
   
  )
}

export default App