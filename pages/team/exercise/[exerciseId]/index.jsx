import Topbar, {TopbarButton} from "components/Topbar";
import {
  FaCheck,
  FaExclamationCircle,
  FaFile,
  FaFileUpload,
  FaLaptopCode,
  FaQuestionCircle,

} from "react-icons/fa";
import {ImSpinner5} from "react-icons/im";
import {useRouter} from "next/router";
import {useExercise} from "endpoints/exercise/getExercise";
import {useTeamSolutionList} from "endpoints/team/solution/getTeamSolutionList";
import Loading from "components/Loading";
import Error from "components/Error";
import {useState, useEffect} from "react";
import Dropzone from "react-dropzone";
import useRequest from "hooks/useRequest";
import {sendTeamSolution} from "endpoints/team/solution/sendTeamSolution";
import {FILE_SIZE_LIMIT, parseFileSize} from "util/file";
import * as dayjs from "dayjs";
import {DATE_FORMAT, formatDuration, TIME_FORMAT} from "util/date";
import {SOLUTION_STATUS} from "util/print";
import {Wrapper} from "components/Utils";

const ExerciseContent = () => {
  const router = useRouter()
  const {exerciseId} = router.query
  const {isError, isLoading: _isLoading, data, error} = useExercise(exerciseId)
  const isLoading = _isLoading || exerciseId == null

  if (isError)
    return (
        <Wrapper>
          <Error error={error}/>
        </Wrapper>
      )

  if (isLoading)
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )

  return (
    <>
      <h3 className="text-2xl text-gray-500 font-bold">Zadanie {data?.number}</h3>
      <h1 className="text-3xl font-bold">{data?.name}</h1>
      <Wrapper>
        {data?.content}
      </Wrapper>
    </>
  )
}

const ExerciseSolutions = () => {
  const router = useRouter()
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const {exerciseId} = router.query
  const {isError, isLoading: _isLoading, data, error, refetch} = useTeamSolutionList(exerciseId, shouldRefetch)
  const isLoading = _isLoading || exerciseId == null

  useEffect(() => {
    setShouldRefetch(data?.shouldRefetch)
  }, [data?.shouldRefetch])

  if (isError)
    return <Error error={error}/>

  if (isLoading)
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )
  return (
    <>
    {!!data?.solutions?.length && (
      <Wrapper>
        <h3 className="font-bold text-lg mb-4">Historia rozwiązań</h3>
        {data.solutions.map(({file, id, sent, status, solutionTime}) => {
          const {color, icon} = status === "PENDING"
            ? {color: "gray", icon: <ImSpinner5 size="1.5em" className="animate-spin"/>}
            : status === "CORRECT"
              ? {color: "green", icon: <FaCheck size="1.5em"/>}
              : {color: "red", icon: <FaExclamationCircle size="1.5em"/>}

          return (
            <div key={id} className={`flex py-2 border-separate text-${color}-600`}>
              <div className="w-10 mr-4 flex items-center justify-center">
                {icon}
              </div>
              <div className="mr-auto flex flex-col">
                <span className="font-bold">
                    {SOLUTION_STATUS[status]}
                    {status === "CORRECT" && `, ${formatDuration(solutionTime)}`}
                </span>
                <span className="text-gray-500 text-sm">
                  {dayjs(sent).format(`${DATE_FORMAT}, ${TIME_FORMAT}`)}
                </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="font-bold text-gray-600">{file.name}</span>
                <span className="text-gray-500 text-sm">{parseFileSize(file.size)}</span>
              </div>
            </div>
          )
        })}
      </Wrapper>
    )}
      <FileUpload visible={data?.canSend} refetch={refetch}/>
    </>
  )
}

const FileUpload = ({visible, refetch}) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const router = useRouter()
  const {exerciseId} = router.query
  const [request, {isRequestLoading, requestError}] = useRequest(sendTeamSolution)

  useEffect(() => {
    if (!visible || isRequestLoading)
      setFile(null)
  }, [visible, isRequestLoading])

  const onFileChange = (newFile) => {
    if (!newFile?.[0]) return
    if (file) return
    setError("")
    if (!newFile[0].name.endsWith(".py")) {
      setError("Plik ma niepoprawne rozszerzenie.")
      return
    }
    if (newFile[0].size > FILE_SIZE_LIMIT) {
      setError("Plik ma zbyt duży rozmiar.")
      return
    }
    setFile(newFile[0])
  }

  const submit = async () => {
    const a = await request(exerciseId, file)
    console.log(a)
    if (refetch) refetch()
  }

  if (!visible) return null;
  if (isRequestLoading)
    return (
      <Wrapper>
        <h3 className="font-bold mb-4 text-lg">Rozwiązanie</h3>
        <Loading/>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h3 className="font-bold mb-4 text-lg">Rozwiązanie</h3>
      <Dropzone onDrop={onFileChange} maxFiles={1}>
        {({getRootProps, getInputProps}) => {
          const className = "focus:border-blue-400 border-gray-300 border-dashed outline-none border-4 rounded-xl flex flex-col items-center justify-center mb-4 text-sm text-gray-500 p-8 text-center"
          if (!file)
            return (
              <div {...getRootProps()} className={`${className} cursor-pointer`}>
                <input {...getInputProps()} />
                <FaFileUpload size="3em"/>
                <span className="mt-4">Przeciągnij plik tutaj</span>
                <span>lub</span>
                <span>kliknij, by wybrać z dysku</span>
              </div>
            )

          return (
            <div className={className}>
              <FaFile size="3em"/>
              <span className="mt-2 font-bold">{file.name}</span>
              <span>{parseFileSize(file.size)}</span>
              <button
                onClick={submit}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg px-8 py-3 uppercase mt-6 focus:outline-none focus-visible:ring-2 ring-offset-2">
                wyślij
              </button>
              <button
                onClick={() => setFile(null)}
                className="bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-500 font-bold rounded-lg px-4 py-2 uppercase mt-2 focus:outline-none focus-visible:ring-2 ring-offset-2">
                anuluj
              </button>
            </div>
          )
        }}
      </Dropzone>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>Dozwolone rozszerzenia: py</span>
        <span>Maksymalny rozmiar: {parseFileSize(FILE_SIZE_LIMIT)}</span>
      </div>
      {(error || requestError) && (
        <div className="text-red-500 mt-2">{(error || requestError)}</div>
      )}
    </Wrapper>
  )
}

const TeamExercise = () => (
  <div>
    <Topbar>
      <TopbarButton href="/team">
        <FaLaptopCode className="mr-3"/> Zawody
      </TopbarButton>
      <TopbarButton disabled>
        <FaQuestionCircle className="mr-3"/> Pytania i odpowiedzi
      </TopbarButton>
    </Topbar>
    <main>
      <div className="max-w-5xl mx-auto py-8 sm:px-6 px-4 lg:px-8">
        <ExerciseContent/>
        <ExerciseSolutions/>
      </div>
    </main>
  </div>
)

export default TeamExercise

