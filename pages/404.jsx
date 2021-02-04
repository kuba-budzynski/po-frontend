import React from 'react'
import Head from 'next/head'
import error400 from '../public/404.svg'
function Custom404() {
    return (
        <>
        <Head>
            <title>404 - Page not found</title>
            <meta name="description" content="Sorry but that page is nowhere to be found" /> 
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="w-screen h-screen flex justify-items-center justify-center">
            <img src={error400} className="w-full h-auto md:w-4/5" alt="SVG image to display for HTTP 400 type errors"/>
        </div>
        </>
    )
}

export default Custom404;
