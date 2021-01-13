import Topbar, {TopbarButton} from "components/Topbar";
import {FaCheck, FaExclamationCircle, FaFileUpload, FaLaptopCode, FaQuestionCircle, FaSpinner} from "react-icons/fa";
import {useRouter} from "next/router";
import {useExercise} from "endpoints/exercise/getExercise";
import {useTeamSolutionList} from "endpoints/exercise/getTeamSolutionList";

const ExerciseContent = () => {
  const router = useRouter()
  const {exerciseId} = router.query
  const {isError, isLoading, data} = useExercise(exerciseId)

  if (isError) return <h3>Error!!!>:(</h3>
  if (isLoading) return <h3>Loading...</h3>
  return (
    <>
      <h3 className="text-2xl text-gray-500 font-bold">Zadanie {data?.number}</h3>
      <h1 className="text-3xl font-bold">{data?.name}</h1>
      <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6 whitespace-pre-wrap">
        {data?.content}
      </div>
    </>
  )
}

const ExerciseSolutions = () => {
  const router = useRouter()
  const {exerciseId} = router.query
  const {isError, isLoading, data} = useTeamSolutionList(exerciseId)

  if (isError) return <h3>Error!!!>:(</h3>
  if (isLoading) return <h3>Loading...</h3>
  return (
    <>
      <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6">
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
                <Icon size="1.5em" />
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
      </div>
      {data?.canSend && (
        <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6">
          <h3 className="font-bold mb-4 text-lg">Rozwiązanie</h3>
          <div
            className="border-dashed border-gray-300 border-4 rounded-xl flex flex-col items-center justify-center mb-4 text-sm text-gray-500 p-8 text-center">
            <FaFileUpload size="3em"/>
            <span className="mt-4">Przeciągnij plik tutaj</span>
            <span>lub</span>
            <span>kliknij, by wybrać z dysku</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Dozwolone rozszerzenia: py</span>
            <span>Maksymalny rozmiar: 2MB</span>
          </div>
        </div>
      )}
    </>
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

