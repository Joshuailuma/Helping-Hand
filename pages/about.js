import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../component/Footer'

 const about = () => {
  return (
    <div className={"pt-16"}>
      <section id='hero'>
        {/* Flex row makes it responsive */}
        <container className="flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          {/* Left item */}
          <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
            <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
              About Us
            </h1>
            <p className="max-w-lg text-center md:text-left text-textColorWrite text-2xl">
            Own Your Property makes you confident with you everything you have. 
            Your land, property, house, electronic devices such as Phones, Laptops, Computers could be stored
            and identified as yours.
            </p>
            <div class="flex justify-center md:justify-start">
            <a
              href="#"
              class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >Get Started</a>
          </div>
          </div>

          {/* Image item */}
          <div className='mid:w-1/2'>

          <Image src="/home.jpeg" alt="illustration-intro.svg" width={580} height={525} />

          </div>
        </container>
      </section>


      <Footer/>
    </div>
  )
}

export default about