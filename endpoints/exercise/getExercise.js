import axios from "axios";
import SETTINGS from "config/settings";
import useQueryData from "hooks/useQueryData";

const getExercise = (exerciseId) => () => axios({
  method: 'GET',
  url: `${SETTINGS.apiRoot}/exercise/${exerciseId}`,
  params: {
    teamId: localStorage.getItem("teamId") || null,
  },
});

export const useExercise = (exerciseId) => useQueryData({
  queryKey: ['user', 'exercise', exerciseId],
  queryFn: getExercise(exerciseId),
  enabled: exerciseId != null,
});
