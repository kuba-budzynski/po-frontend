import useQueryData from "hooks/useQueryData";
import request from "../request";

const getDashboard = (sessionId) => () => request.get(`dashboard/${sessionId}`);

export const useDashboard = (sessionId) => useQueryData({
  queryKey: ['sessionId', sessionId],
  queryFn: getDashboard(sessionId),
  enabled: sessionId != null,
  refetchInterval: 1000,
});
