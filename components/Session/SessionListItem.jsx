import React from 'react'
import {formatDateToPrint} from '../../util/date'
import Link from 'next/link'

function SessionListItem({title, from, to, id}) {

    return (
        <Link href={`/admin/${id}`}>
            <div className=" group rounded-xl bg-white pl-8 py-6 shadow-lg ">
                <p className="text-gray-600 font-bold text-xl group-hover:text-blue-700">{title}</p>
                <p className="text-gray-400 text-xs mt-1 font-normal group-hover:text-gray-500">
                    {formatDateToPrint(new Date(from))} - {formatDateToPrint(new Date(to))}
                </p>
            </div>
        </Link>
    )
}

export default SessionListItem
