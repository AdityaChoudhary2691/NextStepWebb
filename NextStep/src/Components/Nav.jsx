import React from 'react'
import { Link , useLocation} from "react-router-dom";
import logo from '../assets/logo.jpeg'


const Nav = () => {
  const location = useLocation();
  return (
    <>
    <div className=' h-18 bg-black text-white flex justify-between align-middle'>
      <li><Link to="/"><img src={logo} alt="" className='w-22 h-14 rounded m-2'/></Link></li>
      <ul className='flex gap-7 p-2 pt-4'>

        <li>
      <Link
        to="/findjobs"
        className={`inline-block relative transform transition-transform duration-300 hover:scale-105 
          ${location.pathname === "/findjobs" ? "text-blue-600 after:w-full" : "text-white hover:text-blue-600 "}
          after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 
          after:transition-all after:duration-300 hover:after:w-full font-foda text-xl`}
      >
        Find Job
      </Link>
    </li>
     <li>
      <Link
        to="/postjobs"
        className={`inline-block relative transform transition-transform duration-300 hover:scale-105 
          ${location.pathname === "/postjobs" ? "text-blue-600 after:w-full" : "text-white hover:text-blue-600"}
          after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 
          after:transition-all after:duration-300 hover:after:w-full font-foda text-xl`}
      >
        Post Job
      </Link>
    </li>
       <li>
      <Link
        to="/postskills"
        className={`inline-block relative transform transition-transform duration-300 hover:scale-105 
          ${location.pathname === "/postskills" ? "text-blue-600 after:w-full" : "text-white hover:text-blue-600"}
          after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 
          after:transition-all after:duration-300 hover:after:w-full font-foda text-xl`}
      >
        Post Skills
      </Link>
    </li> 
     
   
      <li>
      <Link
        to=""
        className={`inline-block relative transform transition-transform duration-300 hover:scale-105 
          ${location.pathname === "" ? "text-blue-600 after:w-full" : "text-white hover:text-blue-600"}
          after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 
          after:transition-all after:duration-300 hover:after:w-full font-foda text-xl`}
      >
        Find Skills
      </Link>
    </li>
     

      </ul> 

     <a
  href="#"
  className="bg-[rgba(130,131,133,0.5)] text-white px-2  m-3 rounded-2xl
             border-2 border-transparent
             transform transition-all duration-300 ease-in-out
             hover:scale-110 hover:border-blue-600 pt-2"
>
  SignUp
</a>


      </div>
    </>
  )
}

export default Nav