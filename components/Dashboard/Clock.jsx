import React, {useState, useEffect} from 'react'
const moment = require('moment')

function Clock({start, end}) {

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
                setTick("Sesja się jeszcze nie rozpoczęła")
                setInProcess(false)
            }
            else if(endDate.isBefore(now)){
                setTick("Sesja się już zakończyła!")
                setInProcess(false);
            }

        }, 1000)
    }, [tick])

    return (
        <div className="bg-white rounded-xl w-full px-4 py-4 text-center shadow-md">
            {inProcess ? <p className="text-gray-500 font-extrabold text-5xl">{tick}</p>: <p className="text-gray-500 font-extrabold text-2xl">{tick}</p>}
            {inProcess ? <p className="text-xs text-gray-400 font-semibold">do końca zawodów</p>: null}
        </div>
    )
}

export default Clock
