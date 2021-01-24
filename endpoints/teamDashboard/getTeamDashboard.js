import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getTeamDashboard = (teamId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/team-dashboard/${teamId}`,
});

export const useTeamDashboard = (teamId) => useQueryData({
  queryKey: ['teamId', teamId],
  queryFn: getTeamDashboard(teamId),
  enabled: teamId != null,
  refetchInterval: 1000,
});
