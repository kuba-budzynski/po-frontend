import Topbar, {TopbarButton} from "components/Topbar";
import {
  FaCheck,
  FaExclamationCircle,
  FaFile,
  FaFileUpload,
  FaLaptopCode,
  FaQuestionCircle,
  FaSpinner
} from "react-icons/fa";
import {useRouter} from "next/router";
import {useExercise} from "endpoints/exercise/getExercise";
import {useTeamSolutionList} from "endpoints/exercise/getTeamSolutionList";
import Loading from "components/Loading";
import Error from "components/Error";
import { useState } from "react";
import Dropzone from "react-dropzone";

const Wrapper = (props) => <div
  className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6 whitespace-pre-wrap" {...props} />

const ExerciseContent = () => {
  const router = useRouter()
  const {exerciseId} = router.query
  const {isError, isLoading: _isLoading, data, error} = useExercise(exerciseId)
  const isLoading = _isLoading || exerciseId == null

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
  const {exerciseId} = router.query
  const {isError, isLoading: _isLoading, data, error} = useTeamSolutionList(exerciseId)
  const isLoading = _isLoading || exerciseId == null

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
      <Wrapper>
        <h3 className="font-bold text-lg mb-4">Historia rozwiązań</h3>
        {data?.solutions?.map(({file, id, sent, status, correctType}) => {
          const {color, Icon} = correctType === -1
            ? {color: "red", Icon: FaExclamationCircle}
            : correctType === 0
              ? {color: "gray", Icon: FaSpinner}
              : {color: "green", Icon: FaCheck}

          return (
            <div key={id} className={`flex py-2 border-separate text-${color}-600`}>
              <div className="w-10 mr-4 flex items-center justify-center">
                <Icon size="1.5em"/>
              </div>
              <div className="mr-auto flex flex-col">
                <span className="font-bold">{status}</span>
                <span className="text-gray-500 text-sm">
                  {sent}
                </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="font-bold text-gray-600">{file.name}</span>
                <span className="text-gray-500 text-sm">{file.size}</span>
              </div>
            </div>
          )
        })}
      </Wrapper>
      <FileUpload visible={data?.canSend}/>
    </>
  )
}

const FileUpload = ({visible}) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const onFileChange = (newFile) => {
    if (!newFile?.[0]) return
    if (file) return
    setError("")
    if (newFile[0].size > 2000000) {
      setError("Plik ma zbyt duży rozmiar.")
      return
    }
    if (!newFile[0].name.endsWith(".py")) {
      setError("Plik ma niepoprawne rozszerzenie.")
      return
    }
    setFile(newFile[0])
  }
  const submit = () => {
    setError("")
  }
  if (!visible) return null;
  return (
    <Wrapper>
      <h3 className="font-bold mb-4 text-lg">Rozwiązanie</h3>
      <Dropzone onDrop={onFileChange} maxFiles={1}>
        {({getRootProps, getInputProps}) => {
          const className = "focus:border-blue-400 border-gray-300 border-dashed outline-none border-4 rounded-xl flex flex-col items-center justify-center mb-4 text-sm text-gray-500 p-8 text-center"
          if (!file)
            return (
              <div {...getRootProps()} className={className}>
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
              <button
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
        <span>Maksymalny rozmiar: 2MB</span>
      </div>
      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </Wrapper>
  )
}

const TeamExercise = () => {
  const router = useRouter()
  const {sessionId} = router.query
  return (
    <div>
      <Topbar>
        <TopbarButton
          href={{
            pathname: "/team/[sessionId]",
            query: {sessionId}
          }}
        >
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
};

export default TeamExercise

