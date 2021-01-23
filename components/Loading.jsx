import React from 'react'
import {CgSpinner} from "react-icons/Cg";

const Loading = () => (
  <div className="mx-auto p-2 align-center flex align-center justify-center flex-0">
    <CgSpinner size="2em" className="animate-spin" />
  </div>
)

export default Loading
