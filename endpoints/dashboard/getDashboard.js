import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getDashboard = (sessionId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/${sessionId}/dashboard`,
});

export const useDashboard = (sessionId) => useQueryData({
  queryKey: ['sessionId', sessionId],
  queryFn: getDashboard(sessionId),
  enabled: sessionId != null,
  refetchInterval: 1000,
});
