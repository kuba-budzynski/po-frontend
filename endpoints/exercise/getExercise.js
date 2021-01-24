import useQueryData from "hooks/useQueryData";
import request from "../request";

const getExercise = (exerciseId) => () => request.get(`exercise/${exerciseId}`);

export const useExercise = (exerciseId) => useQueryData({
  queryKey: ['user', 'exercise', exerciseId],
  queryFn: getExercise(exerciseId),
  enabled: exerciseId != null,
});
