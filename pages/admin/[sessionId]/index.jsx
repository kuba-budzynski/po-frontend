import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { useDashboard } from "endpoints/dashboard/getDashboard";
import Loading from "components/Loading";
import Error from "components/Error";
import Topbar, {TopbarButton} from "components/Topbar";
import {FaLaptopCode, FaQuestionCircle, FaSyncAlt} from "react-icons/fa";
import ExerciseListItem from 'components/Dashboard/ExerciseListItem'
import { Wrapper } from "components/Utils"
import {formatHour} from '../../../util/date'
import RankingListItem from 'components/Dashboard/RankingListItem';
import Clock from 'components/Dashboard/Clock'

export default function AdminDashboard() {

  const router = useRouter()
  const {sessionId} = router.query
  const {isError, isLoading, data, error} = useDashboard(sessionId);
  const [lastRanking, setLastRanking] = useState(new Date());
  let max = 5;

  useEffect(() => {
    setLastRanking(new Date());
  },[])

  if (isError)
    return <Error error={error}/>

  if (isLoading)
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )

  return (
    <div>
      <Head>
        <title>Panel to view session data - {sessionId}</title>
        <meta name="description" content="This page shows you important informations about a session. Useful informations for administrator." /> 
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar>
        <TopbarButton>
          <FaLaptopCode className="mr-3"/> Zawody
        </TopbarButton>
        <TopbarButton disabled>
          <FaQuestionCircle className="mr-3"/> Pytania i odpowiedzi
        </TopbarButton>
      </Topbar>
      
      <div className="flex w-10/12 max-w-7xl mx-auto mt-16 space-x-12">
        <div className="w-1/2 py-16">
          <h1 className="text-4xl font-bold text-gray-500">Zadania</h1>
          <div className="space-y-5 mt-6">
            {data && data.exercises.map(z => <ExerciseListItem name={z.name} number={z.number} session={sessionId} id={z.id} key={z.id}/>)}
          </div>
        </div>
        <div className="w-1/2">
          {data && <Clock start={data.sesja.start} end={data.sesja.end}></Clock>}
          <div className="w-full flex justify-between mt-16">
              <div>
                <p className="text-4xl text-gray-500 font-bold ">Ranking</p>
                <p className="text-sm text-gray-400 mt-2 italic">{data && data.sesja.isFrozen ? "ranking zamrożony" : <span>ostatnia aktualizacja {formatHour(lastRanking)}</span>}</p>
              </div>
              <div className="flex flex-col justify-center">
                <a className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={() => setLastRanking(new Date())}>
                  <FaSyncAlt size="1rem"/>
                </a>
              </div>
          </div>
          <div className="mt-6 bg-white rounded-xl px-8 py-4 shadow-md">
            <div className="space-y-4">
              {data && data.ranking.slice(0, max).map((r, index) => <RankingListItem number={index+1} title={r.name} school={r.school} correct={r.completed} time={r.time}/>)}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8 hover:text-gray-400 cursor-pointer">Zobacz wszystkie</p>
          </div>
        </div>
      </div>
    </div>
  )
}