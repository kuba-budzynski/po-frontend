import useQueryData from "hooks/useQueryData";
import request from "../request";

const getTeamDashboard = () => request.get(`team-panel/dashboard`);

export const useTeamDashboard = () =>
  useQueryData({
    queryKey: ['teamDashboard'],
    queryFn: getTeamDashboard,
    refetchInterval: 1000,
  });
