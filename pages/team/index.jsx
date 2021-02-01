import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import {useTeamDashboard} from '../../endpoints/teamDashboard/getTeamDashboard'
import {Container, Wrapper} from "components/Utils"
import Loading from "components/Loading";
import Error from "components/Error";
import Topbar, {TopbarButton} from "components/Topbar";
import {FaLaptopCode, FaQuestionCircle, FaSyncAlt} from "react-icons/fa";
import ExerciseListItemWithStatus from 'components/Dashboard/ExerciseListItemWithStatus'
import {formatHour} from '../../util/date'
import RankingListItem from 'components/Dashboard/RankingListItem'
import Clock from 'components/Dashboard/Clock'
import SETTINGS from "../../config/settings";

function TeamPanel() {
    const {isError, isLoading, data, error} = useTeamDashboard();
    const [lastRanking, setLastRanking] = useState(new Date());
    let max = 5;

     useEffect(() => {
        setLastRanking(new Date());
    },[])

    const getStatus = (id) => {
        return Object.keys(data.solutions).includes(id) ? data.solutions[id].sort((a,b) => new Date(b.sent) - new Date(a.sent))[0].status : null
    }

    if (isError)
        return (
            <Container>
                <Error error={error}/>
            </Container>
        )

    if (isLoading)
        return (
            <Container>
                <Wrapper>
                    <Loading/>
                </Wrapper>
            </Container>
        )

    const teamId = SETTINGS.token()

    return (
        <div>
            <Head>
                <title>Team Dashboard</title>
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
                        {data && data.exercises.map(z => <ExerciseListItemWithStatus name={z.name} number={z.number} session={data.sessionId} id={z.id} status={getStatus(z.id)}/>)}
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
                    <div className="w-full bg-white mt-5 mb-2 rounded-xl flex justify-around py-4 px-2 shadow-lg">
                        <div>
                            <p className="font-bold text-2xl text-gray-500 text-center">{data && data.ranking.findIndex((elem) => elem.id == teamId) + 1}</p>
                            <p className="text-center text-xs text-gray-400">miejsce w rankingu</p>
                        </div>
                        <div>
                            <p className="font-bold text-2xl text-gray-500 text-center">{data && data.ranking.find((elem) => elem.id == teamId).completed}</p>
                            <p className="text-center text-xs text-gray-400">zaakceptowane rozwiązania</p>
                        </div>
                        <div>
                            <p className="font-bold text-2xl text-gray-500 text-center">{data && data.ranking.find((elem) => elem.id == teamId).time}</p>
                            <p className="text-center text-xs text-gray-400">czas drużyny</p>
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl px-8 py-4 shadow-md">
                        <div className="space-y-4">
                            {data && data.ranking.slice(0, max).map((r, index) => <RankingListItem number={index+1} title={r.name} school={r.school} correct={r.completed} time={r.time} accent={r.id == teamId}/>)}
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-8 hover:text-gray-400 cursor-pointer">Zobacz wszystkie</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamPanel
