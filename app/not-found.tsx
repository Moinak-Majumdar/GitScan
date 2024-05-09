'use client'

import React from 'react'
import notFound from '@/public/assets/notFound.json'
import Lottie from 'lottie-react'


const Custom404 = () => {
  return (
    <main className='relative min-h-screen flex justify-center items-center overflow-hidden'>
        <Lottie  animationData={notFound}  className='h-80'/>
    </main>
  )
}

export default Custom404