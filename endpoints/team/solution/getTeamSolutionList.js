import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getTeamSolutionList = (exerciseId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/team-panel/${exerciseId}/solution`,
  params: {
    teamId: localStorage.getItem("teamId") || null,
  },
});

export const useTeamSolutionList = (exerciseId) => useQueryData({
  queryKey: ['team', 'solution.list', exerciseId],
  queryFn: getTeamSolutionList(exerciseId),
  enabled: exerciseId != null,
});
