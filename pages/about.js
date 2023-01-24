import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
 const About = () => {
  return (
    <div className={"mt-36 bg-lightBlack"}>
      <NavBar/>
      <section id='hero'>
        {/* Flex row makes it responsive */}
        <div className="flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          {/* Left item */}
          <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
            <h1 className="max-w-md text-4xl text-white font-bold text-center md:text-5xl md:text-left">
              About Us
            </h1>
            <p className="max-w-lg text-center md:text-left text-slate-400 text-2xl">
            Helping hand allows you help people by donating to their projects. You could also create a project and ask for help
            </p>            
          </div>

          {/* Image item */}
          <div className='mid:w-1/2'>
          <Image src="/support_woman.jpeg" alt="support_woman" width={580} height={525} />
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default About