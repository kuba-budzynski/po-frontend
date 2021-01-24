import useQueryData from "hooks/useQueryData";
import request from "../request";

const getSessions = () => request.get(`session`);

export const useSessions = () => useQueryData({
  queryKey: "session",
  queryFn: getSessions,
  enabled: true,
  retry: true,
  refetchInterval: 5000
});
