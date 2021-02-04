import React from 'react'
import Head from 'next/head'
import error500 from '../public/404.svg'

function Error() {
  return (
    <>
      <Head>
        <title>500 - server error</title>
        <meta name="description" content="This seems to be an issue on our side. We're very sorry" /> 
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen h-screen flex justify-items-center justify-center">
        <img src={error500} className="w-full h-auto md:w-4/5" alt="SVG image to display for HTTP 500 type errors"/>
      </div>
    </>
  )
}

export default Error;
