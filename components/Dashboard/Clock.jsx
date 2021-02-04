import React, {useState, useEffect} from 'react'
const moment = require('moment')

function Clock({id, start, end}) {

    const [tick, setTick] = useState("")
    const [inProcess, setInProcess] = useState(false)
    const startDate = new moment(start)
    const endDate = new moment(end)

    useEffect(() => {
        setTimeout(() => {
            const now = moment()
            if(startDate.isBefore(now) && endDate.isAfter(now)){
                const left = endDate - now
                setTick(moment(left).format("HH:mm:ss"))
                setInProcess(true)
            }
            else if(startDate.isAfter(now)){
                setTick("Sesja się nie rozpoczęła")
                setInProcess(false)
            }
            else if(endDate.isBefore(now)){
                setTick("Sesja się już zakończyła!")
                setInProcess(false);
            }

        }, 1000)
    }, [tick])

    return (
        <div id={id} className="bg-white rounded-xl w-full px-4 py-4 text-center shadow-md">
            {inProcess ? <h1 className="text-gray-500 font-extrabold text-5xl">{tick}</h1>: <h1 className="text-gray-500 font-extrabold text-2xl">{tick}</h1>}
            {inProcess ? <p className="text-xs text-gray-400 font-semibold">do końca zawodów</p>: null}
        </div>
    )
}

export default Clock
