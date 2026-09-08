import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import logo from "../assets/logo.jpeg";

const PostedCard = () => {
  const { job, setJob } = useContext(AppContext);

  const storedUser = JSON.parse(localStorage.getItem("nexepUser") || "{}");
  const currentUserId = storedUser.id || storedUser._id;

  // Only keep jobs posted by the logged-in user
  const myJobs = job.filter((item) => {
  const jobOwnerId = item.user?.id ?? item.user?._id;
  return Boolean(currentUserId) && Boolean(jobOwnerId) && String(jobOwnerId) === String(currentUserId);
});

  if (myJobs.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F7F8FB", fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <h1 className="text-lg font-semibold text-gray-400">No applications</h1>
      </div>
    );
  }

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/postjobs/${id}`, { method: 'DELETE' });
      const data = await res.text();
      console.log(data);
      setJob(prev => prev.filter(j => j.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className='ml-90'>
      {myJobs.map((item, index) => {
        const cardId = item.id || item._id || index;

        return (
          <div key={cardId} className="max-w-md rounded-xl border border-gray-200 bg-white p-6 m-6 shadow-sm">
            <img className='p-4' src={logo} alt="" />

            <div className="mb-4 inline-block">
              <span className="rounded-full border border-amber-300 bg-amber-50/50 px-3.5 py-1 text-sm font-medium text-amber-800">
                {item.type}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">{item.position}</h2>
            <p className="mt-1 text-base text-slate-600">{item.name}</p>
            <p className="mt-3 text-lg font-bold text-emerald-700">{item.remuneration}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>

            <hr className="my-5 border-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Posted recently</span>
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                View details
              </button>
              <button
                type="button"
                onClick={() => deleteJob(cardId)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostedCard;