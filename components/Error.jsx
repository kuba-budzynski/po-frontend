import React from 'react'
import {FaExclamationCircle} from "react-icons/fa";

const Error = ({ children, error }) => (
  <div className="flex items-center bold p-4 my-4 rounded-lg shadow-lg border-red-200 border bg-red-100 text-red-700">
    <FaExclamationCircle className="mr-3" size="1.25em" /> Wystąpił błąd, prosimy spróbować ponownie. [{children || error?.message}]
  </div>
)

export default Error
