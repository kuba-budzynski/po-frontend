import axios from "axios";
import SETTINGS from "config/settings";

export const sendTeamSolution = (sessionId, exerciseId, file) => {
  const formData = new FormData();
  formData.append('solutionFile', file);

  return axios({
    method: 'POST',
    url: `${SETTINGS.apiRoot}/team-panel/${sessionId}/exercise/${exerciseId}/solution`,
    params: {
      teamId: localStorage.getItem("teamId") || null,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};
