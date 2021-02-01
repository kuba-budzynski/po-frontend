import React from 'react'
import Link from 'next/link'
import {SOLUTION_STATUS} from "util/print";

function ExerciseListItemWithStatus({name, number, session, id, status}) {

    const colors = {
        "PENDING": "text-blue-600",
        "CORRECT": "text-green-600",
        "ERROR_PRESENTATION": "text-red-600",
        "ERROR_EXECUTION": "text-red-600",
        "ERROR_TIME": "text-red-600",
    }

    return (
        <Link href={`/team/exercise/${id}`}>
            <div className=" grid grid-cols-12 gap-2 group rounded-xl bg-white py-6 shadow-lg w-full px-8 cursor-pointer">
                <div className="col-span-1 flex flex-col justify-center">
                    <p className="text-4xl text-gray-500 font-bold text-center group-hover:text-gray-600">{number}</p>
                </div>
                <div className="col-span-11 flex flex-col justify-center ml-4">
                    <p className="text-gray-500 font-bold text-2xl group-hover:text-gray-600">{name}</p>
                    <p className={`text-sm ${colors[status] ?? "text-gray-400"}`}>{status != null ? SOLUTION_STATUS[status] : "nie rozpoczęte"}</p>
                </div>
            </div>
        </Link>
    )
}

export default ExerciseListItemWithStatus
