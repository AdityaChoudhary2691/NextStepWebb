import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function trackSkillView(skillId) {
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("nexepUser") || "{}");
  } catch {
    return;
  }
  if (!user.id || user.role !== "RECRUITER") return;

  axios
    .post(`${API_URL}/skills/${skillId}/view`, null, { params: { viewerId: user.id } })
    .catch(() => {});
}