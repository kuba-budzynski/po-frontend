import {useQuery} from "react-query";

const useQueryData = (...args) => {
  const { data, ...rest } = useQuery(...args)
  return { ...rest, data: data?.data }
}

export default useQueryData
