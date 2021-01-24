import useQueryData from "hooks/useQueryData";
import request from "../../request";

const getTeamSolutionList = (exerciseId) => () => request.get(`team-panel/exercise/${exerciseId}/solution`);

export const useTeamSolutionList = (exerciseId, shouldRefetch) => useQueryData({
  queryKey: ['team', 'solution.list', exerciseId],
  queryFn: getTeamSolutionList(exerciseId),
  enabled: exerciseId != null,
  refetchInterval: shouldRefetch ? 5000 : null,
});
