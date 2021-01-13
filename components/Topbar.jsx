import React from 'react'
import Link from "next/link"
import {useRouter} from "next/router"

export const TopbarButton = ({children, href, disabled}) => {
  const router = useRouter()
  const isActive = href?.pathname === router?.pathname && href?.query.sessionId === router?.query.sessionId
  const content = (
    <button
      disabled={disabled}
      className={`disabled:cursor-default disabled:bg-transparent disabled:opacity-50 hover:bg-blue-50 active:bg-blue-100 ${isActive ? "text-blue-600" : ''} font-bold flex items-center py-2 px-4 rounded-lg focus:outline-none mx-1`}>
      {children}
    </button>
  );

  if (!href)
    return content

  return (
    <Link href={href}>
      {content}
    </Link>
  )
}

const Topbar = ({ children }) => (
  <div className="w-full p-2 border-gray-200 border-b-2 bg-white flex align-center sticky top-0">
    {children}
  </div>
)

export default Topbar
