import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from './Components/Nav'
import JobCard from './Components/JobCard'
import PostJob from './Components/PostJob';
import ApplicationForm from './Components/ApplicationForm';
import CandidateCard from './Components/CandidateCard';
import LoginForm from './Components/LoginForm';
import YourCard from './Components/YourCard'
import NexepHome from './Components/NexepHome'
import FresherDashboard from './Components/FresherDashboard';
import RecuiterDashboard from './Components/RecuiterDashboard';
import ProtectedRoute from './Components/ProtectedRoute';

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
  const hideNav = location.pathname === '/login' || location.pathname === '/fresherDashboard' || location.pathname === '/recruiterDashboard';

  return (
    <>
      {!hideNav && <Nav />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<AnimatedPage><NexepHome/></AnimatedPage>}/>
          <Route path='/findjobs' element={<AnimatedPage><JobCard /></AnimatedPage>} />
          <Route path='/YourCard' element={<AnimatedPage><YourCard/></AnimatedPage>} />
          <Route path='/postjobs' element={<AnimatedPage><PostJob /></AnimatedPage>} />
          <Route path='/postskills' element={<AnimatedPage><ApplicationForm /></AnimatedPage>} />
          <Route path='/findskills' element={<AnimatedPage><CandidateCard /></AnimatedPage>} />
          <Route path='/login' element={<AnimatedPage><LoginForm /></AnimatedPage>} />

          <Route
            path='/fresherDashboard'
            element={
              <AnimatedPage>
                <ProtectedRoute allowedRole="FRESHER">
                  <FresherDashboard />
                </ProtectedRoute>
              </AnimatedPage>
            }
          />

          <Route
            path='/recruiterDashboard'
            element={
              <AnimatedPage>
                <ProtectedRoute allowedRole="RECRUITER">
                  <RecuiterDashboard />
                </ProtectedRoute>
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App