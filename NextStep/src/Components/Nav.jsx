import React from 'react'
import { Link , useLocation} from "react-router-dom";
import logo from '../assets/logo.jpeg'


const Nav = () => {
  const location = useLocation();
  return (
    <>
    <div className=' h-18 bg-black text-white flex justify-between align-middle sticky top-0 z-50'>
      <li><Link to="/"><img src={logo} alt="" className='w-22 h-14 rounded m-2'/></Link></li>
  

     <Link to="/login"
  href="#"
  className="bg-[rgba(130,131,133,0.5)] text-white px-2  m-3 rounded-2xl
             border-2 border-transparent
             transform transition-all duration-300 ease-in-out
             hover:scale-110 hover:border-blue-600 pt-2"
>
  SignUp
</Link>


      </div>
    </>
  )
}

export default Nav