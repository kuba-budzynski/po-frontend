import request from "../../request";

export const sendTeamSolution = (exerciseId, file) => {
  const formData = new FormData();
  formData.append('solutionFile', file);

  return request({
    method: 'POST',
    url: `team-panel/exercise/${exerciseId}/solution`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};
