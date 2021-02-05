import React from 'react'
import {formatDateToPrint} from '../../util/date'
import Link from 'next/link'

function ExerciseListItem({name, number, session, id}) {

    return (
        <Link href={`/admin/${session}/exercise/${id}`}>
            <div key={id} className=" grid grid-cols-12 gap-2 group rounded-xl bg-white py-6 shadow-lg w-full px-8">
                <div className="col-span-1 flex flex-col justify-center">
                    <p className="text-4xl text-gray-400 font-bold text-center">{number}</p>
                </div>
                <div className="col-span-11 flex flex-col justify-center ml-4">
                    <p className="text-gray-500 font-bold text-2xl group-hover:text-blue-700">{name}</p>                    
                </div>
            </div>
        </Link>
    )
}

export default ExerciseListItem
