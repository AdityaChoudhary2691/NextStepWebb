import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';


const JobCard = () => {
  const {job} = useContext(AppContext)
  
  return (
    <>
    { job.map((item,key)=>(
      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 m-6 shadow-sm">
      {/* Badge */}
      <div className="mb-4 inline-block">
        <span className="rounded-full border border-amber-300 bg-amber-50/50 px-3.5 py-1 text-sm font-medium text-amber-800">
          {item.type}
        </span>
      </div>

      {/* Title & Company */}
      <h2 className="text-xl font-bold text-slate-900">
        {item.position}
      </h2>
      <p className="mt-1 text-base text-slate-600">
        {item.company}
      </p>

      {/* Salary */}
      <p className="mt-3 text-lg font-bold text-emerald-700">
        {item.renumeration}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {item.desc}
      </p>

      {/* Divider */}
      <hr className="my-5 border-gray-100" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Posted recently
        </span>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
          View details
        </button>
      </div>
    </div>
    ))}
    </>
    
    
  );
}

export default JobCard;