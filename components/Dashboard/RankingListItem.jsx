import React from 'react'
import {formatDuration} from 'util/date'

function RankingListItem({number, title, school, correct, time, accent = false}) {

    return (
        <div key={number} className="grid grid-cols-12 gap-2 group bg-white w-full">
                <div className="col-span-1 flex justify-center items-center">
                    <p className={`text-4xl font-bold text-center px-4 py-1 ${accent ? "bg-gray-100 rounded-lg text-blue-600" : "text-gray-500"}`}>{number}</p>
                </div>
                <div className="ml-5 text-left col-span-11">
                    <p className="text-gray-500 font-bold text-md group-hover:text-blue-600">{title}</p> 
                    <p className="text-gray-400 text-xs italic group-hover:text-blue-600">{school}</p> 
                    <p className="text-blue-600 text-xs font-bold">{correct} {correct == 1 ? "zadanie": correct > 4 || correct == 0 ? "zadań" : "zadania"}, {formatDuration(time)}</p>
                </div>
            </div>
    )
}

export default RankingListItem
