import React from 'react'

import {
    FaArrowLeft,
    FaDoorOpen,
    FaCalendarAlt,
    FaLaptopCode,
    FaVial,
    FaUsers,
    FaUserGraduate,
    FaHammer
} from 'react-icons/fa'

function SideBar() {
    return (
        <div className="flex flex-col justify-between min-h-screen py-8 px-10 bg-gray-50 max-w-md border-r-2 border-gray-300">
            <div className=" mt-8 space-y-20">
                <div className="space-y-5">
                    <span className="text-lg text-gray-500 font-bold uppercase">Zawody</span>
                    <div className="flex pl-2 text-blue-700 font-bold hover:text-blue-600 cursor-pointer">
                        <FaCalendarAlt size="1.2rem"/>
                        <span className="ml-3 text-base">Sesje</span>
                    </div>
                    <div className="flex pl-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                        <FaLaptopCode size="1.2rem"/>
                        <span className="ml-3 text-base">Zadania</span>
                    </div>
                    <div className="flex pl-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                        <FaVial size="1.2rem"/>
                        <span className="ml-3 text-base">Testy</span>
                    </div>
                    
                </div>
                <div className="space-y-5">
                    <span className="text-lg text-gray-500 font-bold uppercase">Użytkownicy</span>
                    <div className="flex pl-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                        <FaUsers size="1.2rem"/>
                        <span className="ml-3 text-base">Drużyny</span>
                    </div>
                    <div className="flex pl-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                        <FaUserGraduate size="1.2rem"/>
                        <span className="ml-3 text-base">Sędziowie zadań</span>
                    </div>
                    <div className="flex pl-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                        <FaHammer size="1.2rem"/>
                        <span className="ml-3 text-base">Sędzia główny</span>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <a className="flex text-gray-500 hover:text-gray-600 cursor-pointer">
                    <FaArrowLeft size="1rem"/>
                    <span className="ml-2 font-bold">Wyjdz z panelu</span>
                </a>
                <a className="flex mt-6 text-red-600 hover:text-red-700 cursor-pointer">
                    <FaDoorOpen size="1.3rem"/>
                    <span className="ml-2 font-bold">Wyloguj</span>
                </a>
            </div>
        </div>
    )
}

export default SideBar      
