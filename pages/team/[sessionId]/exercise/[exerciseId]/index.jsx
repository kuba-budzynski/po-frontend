import Topbar, {TopbarButton} from "components/Topbar";
import {FaFileUpload, FaLaptopCode, FaQuestionCircle} from "react-icons/fa";
import {useRouter} from "next/router";
import {useExercise} from "endpoints/exercise/getExercise";
import {useTeamSolutionList} from "endpoints/exercise/getTeamSolutionList";

const ExerciseContent = () => {
  const router = useRouter()
  const {exerciseId} = router.query
  const { isError, isLoading, data } = useExercise(exerciseId)

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
  const { isError, isLoading, data } = useTeamSolutionList(exerciseId)

  if (isError) return <h3>Error!!!>:(</h3>
  if (isLoading) return <h3>Loading...</h3>
  return (
    <>
      <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6 h-60">
        <h3 className="font-bold text-lg">Historia rozwiązań</h3>
      </div>
      {data?.canSend && (
        <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6">
          <h3 className="font-bold mb-4 text-lg">Rozwiązanie</h3>
          <div className="border-dashed border-gray-300 border-4 rounded-xl flex flex-col items-center justify-center mb-4 text-sm text-gray-500 p-8 text-center">
            <FaFileUpload size="3em" />
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
          <FaLaptopCode className="mr-3" /> Zawody
        </TopbarButton>
        <TopbarButton disabled>
          <FaQuestionCircle className="mr-3" /> Pytania i odpowiedzi
        </TopbarButton>
      </Topbar>
      <main>
        <div className="max-w-5xl mx-auto py-8 sm:px-6 px-4 lg:px-8">
          <ExerciseContent />
          <ExerciseSolutions />
        </div>
      </main>
    </div>
  )
};

export default TeamExercise

