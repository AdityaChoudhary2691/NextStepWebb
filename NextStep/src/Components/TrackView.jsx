import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Call when a candidate clicks "View details".
 * Fire-and-forget: a failed count must never block opening the job.
 */
export function TrackView(jobId) {
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("nexepUser") || "{}");
  } catch {
    return;
  }
  if (!user.id || user.role === "RECRUITER") return;

  axios
    .post(`${API_URL}/jobs/${jobId}/view`, null, { params: { userId: user.id } })
    .catch(() => { });
}

/* Usage in your job card:

   import { trackJobView } from "../utils/trackJobView";

   <button onClick={() => {
     trackJobView(item.id);
     navigate(`/jobdetails/${item.id}`);   // your existing navigation
   }}>
     View details
   </button>
*/