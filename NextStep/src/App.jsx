import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from './Components/Nav'
import JobCard from './Components/JobCard'
import PostJob from './Components/PostJob';
import ApplicationForm from './Components/ApplicationForm';
import CandidateCard from './Components/CandidateCard';
import LoginForm from './Components/LoginForm';
import NexepHome from './Components/NexepHome'

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}

const App = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/login';

  return (
    <>
      {!hideNav && <Nav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<AnimatedPage><NexepHome/></AnimatedPage>}/>
          <Route path='/findjobs' element={<AnimatedPage><JobCard /></AnimatedPage>} />
          <Route path='/postjobs' element={<AnimatedPage><PostJob /></AnimatedPage>} />
          <Route path='/postskills' element={<AnimatedPage><ApplicationForm /></AnimatedPage>} />
          <Route path='/findskills' element={<AnimatedPage><CandidateCard /></AnimatedPage>} />
          <Route path='/login' element={<AnimatedPage><LoginForm /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App