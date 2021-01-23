import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getExercise = (sessionId, exerciseId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/${sessionId}/exercise/${exerciseId}`,
  params: {
    teamId: localStorage.getItem("teamId") || null,
  },
});

export const useExercise = (sessionId, exerciseId) => useQueryData({
  queryKey: ['user', 'exercise', sessionId, exerciseId],
  queryFn: getExercise(sessionId, exerciseId),
  enabled: exerciseId != null && sessionId != null,
});
