import React from 'react'
import {CgSpinner} from "react-icons/Cg";

const Loading = () => (
  <div className="animate-spin mx-auto p-2 align-center flex align-center justify-center flex-0">
    <CgSpinner size="2em" />
  </div>
)

export default Loading
