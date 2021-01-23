import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getTeamSolutionList = (sessionId, exerciseId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/team-panel/${sessionId}/exercise/${exerciseId}/solution`,
  params: {
    teamId: localStorage.getItem("teamId") || null,
  },
});

export const useTeamSolutionList = (sessionId, exerciseId, shouldRefetch) => useQueryData({
  queryKey: ['team', 'solution.list', sessionId, exerciseId],
  queryFn: getTeamSolutionList(sessionId, exerciseId),
  enabled: exerciseId != null && sessionId != null,
  refetchInterval: shouldRefetch ? 5000 : null,
});
