import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getSessions = () => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/session`
});

export const useSessions = () => useQueryData({
  queryKey: "session",
  queryFn: getSessions(),
  enabled: true,
  retry: true,
  refetchInterval: 5000
});
