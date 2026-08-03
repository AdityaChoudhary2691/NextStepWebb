import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav'
import JobCard from './Components/JobCard'
import PostJob from './Components/PostJob';

const App = () => {
  return (
    <>
    <Nav></Nav>
    <Routes>
      <Route path='/findjobs' element={<JobCard/>}></Route>
      <Route path='/postjobs' element={<PostJob/>}></Route>
   </Routes>
   </>
   
  )
}

export default App