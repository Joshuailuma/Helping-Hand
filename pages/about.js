import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../component/Footer'

 const about = () => {
  return (
    <div className={"mt-36"}>
      <section id='hero'>
        {/* Flex row makes it responsive */}
        <container className="flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          {/* Left item */}
          <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
            <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
              About Us
            </h1>
            <p className="max-w-lg text-center md:text-left text-textColorWrite text-2xl">
            Helping hand allows you help people by donating to their projects. You could also create a project and ask for help
            </p>
            
          </div>

          {/* Image item */}
          <div className='mid:w-1/2'>

          <Image src="/support_woman.jpeg" alt="support_woman" width={580} height={525} />

          </div>
        </container>
      </section>


      <Footer/>
    </div>
  )
}

export default about