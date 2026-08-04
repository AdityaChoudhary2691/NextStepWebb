import { useState } from "react";
import { Briefcase, GraduationCap, Building2, FileText, Send, CheckCircle2 } from "lucide-react";

export default function PostJob() {

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0efe8] p-6">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1c1c1a] mb-4">
            <Briefcase className="w-6 h-6 text-[#f0efe8]" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold text-[#1c1c1a] tracking-tight">
            Post an Opportunity
          </h1>
          <p className="text-sm text-[#1c1c1a]/60 mt-1">
            Share a job or internship opening with the community
          </p>
        </div>

        <form
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(28,28,26,0.08)] border border-[#1c1c1a]/[0.06] p-8 space-y-6"
        >
          {/* Job Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-[#1c1c1a] mb-2.5">
              Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 `}
              >
                <Briefcase className="w-4 h-4" />
                Full-time Job
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 `}
              >
                <GraduationCap className="w-4 h-4" />
                Internship
              </button>
            </div>
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Job Position
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="position"
                name="position"
                type="text"
                
                placeholder="e.g. Frontend Developer"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10 `}
              />
            </div>
            
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Renumeration
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="position"
                name="position"
                type="text"
                
                placeholder="e.g. 5 LPA"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10 `}
              />
            </div>
            
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c1c1a]/35" />
              <input
                id="companyName"
                name="companyName"
                type="text"
                
        
                placeholder="e.g. Nexep Technologies"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10 `}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#1c1c1a] mb-2">
              Job Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1c1c1a]/35" />
              <textarea
                id="description"
                name="description"
                rows={5}
                
               
                placeholder="Describe responsibilities, requirements, and what makes this opportunity a good fit..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f6f2] border text-sm text-[#1c1c1a] placeholder:text-[#1c1c1a]/35 outline-none resize-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#1c1c1a]/10 `}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1c1c1a] text-[#f0efe8] font-medium py-3.5 text-sm transition-all duration-200 hover:bg-[#1c1c1a]/90 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}