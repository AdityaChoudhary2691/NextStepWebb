import React, { useContext } from 'react'
import { Bookmark, MoveRight } from 'lucide-react'
import logo1 from '../assets/logo1.jpeg'
import {AppContext} from '../Context/AppContext';

const JobCard = () => {

  const{Jobs,colors}=useContext(AppContext);
  return (
    <>
    <div className='flex gap-10 m-5 flex-wrap'>
    {Jobs.map((job,index)=>(
      <div className='w-50 min-h-60 m-auto mt-2 bg-gray-100 shadow-lg rounded'>
        <div className={`${colors[index%colors.length]} m-1 mt-1 h-40 rounded-xl`}>
          <div className='flex justify-between'>
            <div className='text-black border min-w-15 border-black m-1 w-fit p-1 pr-2 pl-2 rounded-full text-center'>{job.type}</div>
            <Bookmark className='m-1'></Bookmark>
          </div>
          <div className='p-2'>
            <h1 className='text-3xl '>{job.position}</h1>
          </div>
        </div>
        <div className='flex justify-between m-2 pb-4u'>
          <div className='flex'>
            <img className='w-8 rounded-full' src={logo1} alt="" />
            <div>
              <h3 className='text-sm'>{job.company}</h3>
              <h5 className='text-xs'>{job.postedDate}</h5>
            </div>
          </div>
          <div className='bg-black h-fit p-1 rounded-full'><MoveRight color='white'></MoveRight></div>
        </div>
      </div>
    ))}
      </div>
    </>
  )
}

export default JobCard