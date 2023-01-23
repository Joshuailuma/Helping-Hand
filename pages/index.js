import NavBar from '../components/NavBar';
import { FaBeer, FaBuffer, FaGrinAlt } from 'react-icons/fa';
import {abi, contractAddress} from "../constants"
import { useMoralis } from "react-moralis"
import { useWeb3Contract } from 'react-moralis';
import Image from 'next/image'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <div className={"bg-lightBlack mt-16 md:mt-28"}>
      <NavBar />
      {/* Hero section */}
      <section id='hero' className={"mt-24"}>
        {/* Top */}
        <div className="items-center px-6 mx-auto">
            <h1 className="text-white text-4xl font-bold text-center md:text-5xl ">
              Helping Hand
            </h1>
            <p className="text-center px-6 text-white font-thin md:text-4xl mt-12">
            You can donate to help people in need. Be rest assured that your money will get to the solicitor.
            You could also solicit for funds.
            </p>
            <div className="flex justify-center">
            {/* <a
              href="#"
              className="p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight"
              >Get Started</a> */}
          </div>

          {/* Image item */}
          <div className={"md:w-1/3"}>
          {/* <Image src="/help_me.jpg" alt="illustration-intro.svg" width={580} height={525} /> */}
          </div>

        </div>
      </section>

      {/* Features section */}
      <section id="features">

        <div className={"text-darkGrayishBlue mt-20 mb-20 text-center text-3xl font-semibold"}>We provide a decentralized platform to help people in need</div>
        {/* space mean space between the items */}

        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          {/* ====1st flex itemm "Start a funding project"  flex flex-col space-y-12 makes this div be a container===*/}
          <div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl font-bold flex justify-center md:justify-start md:text-left">
          <FaBeer className="text-darkGrayishBlue" /> 
          </div>
          <h1 className=" text-center text-2xl text-darkGrayishBlue md:text-left">Start a funding project</h1>

          <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
              Watch your funds grow
          </p>
            </div>

          <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Create a funding project</p>
            </div>

            

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Set time for end of solicit
          </p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Ask for funds for a good course
          </p>
            </div>

          </div>



 {/* Second flex item  flex flex-col space-y-12 makes this div be a container*/}
          <div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl flex justify-center md:justify-start font-bold md:text-left">
          <FaBuffer className="text-darkGrayishBlue"/>
          </div>
          <h1 className=" text-center text-2xl text-darkGrayishBlue md:text-left">Get donations after a specific time</h1>

          <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
              Watch your funds grow
          </p>
            </div>
            
          <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                The decentralized nature ensures you get your donations</p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Your little money can affect people&apos;s lives
          </p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Set time for end of solicit
          </p>
            </div>
          </div>


{/* End of Second flex Item */}


{/* THird flex item  Help people in need*/}
<div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl flex justify-center md:justify-start font-bold md:text-left">
          <FaGrinAlt className="text-darkGrayishBlue"/>
          </div>
          <h1 className="text-center text-2xl text-darkGrayishBlue md:text-left">Help people in need</h1>
          <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
              Your little money can affect people&apos;s lives</p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
                Your can put a smile on someone&apos;s face today
          </p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
                Be sure the solicitor will get the money since the process is decentralized
          </p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
              Watch your funds grow
          </p>
            </div>

          </div>
          {/* End of Help people in need */}

        </div>
      </section>

      {/* I can put 3 recently listed projects here */}
      {/* Testimonials */}

      

      {/* I can put 3 recently listed projects here */}
      {/* Testimonials */}

      <section id="testimonials">
        {/*Container to hold Heading and testemonial block*/}
        <div className="max-w-6xl mb-8 px-5 mx-auto mt-16 text-center">
          {/* Heading */}
          {/* <h2 className="text-4xl font-bold text-center text-white">
            Recently listed projects
          </h2> */}

        {/* Testimonial. Flex is like flexbox */}
        <div className={"bg-lightBlack space-y-6 md:space-y-0 flex flex-col mt-24 md:flex-row md:space-x-6"}>
          {/* Testimonial 1. For medium screen we will take 1-third of each testimonial */}
          <div className={"bg-lightBlack flex flex-col items-center md:flex md:w-1/3"}>
          {/* Image div */}
          <div className={"bg-lightBlack rounded truncate"}>
          <Image className={"bg-lightBlack"} src="/helping.jpeg" alt="illustration-intro.svg" width={300} height={200} />
          </div>
          <h5 className={"text-lg font-bold text-white"}> Donate to help people in need</h5>
          </div>


        {/* Testimonial 1. For medium screen we will take 1-third of each testimonial */}
        <div className="flex flex-col items-center bg-lightBlack md:w-1/3">
          {/* Image div */}
          <div className="rounded truncate">
          <Image src="/help_me.jpg" alt="illustration-intro.svg" width={300} height={300} />
          </div>
          <h5 className="text-lg font-bold text-white"> Start your own funding project</h5>
          </div>



          {/* Testimonial 3. For medium screen we will take 1-third of each testimonial */}
          <div className="flex flex-col items-center rounded-lg bg-lightBlack md:w-1/3">
         {/* Image div */}
         <div className="rounded truncate">
          <Image src="/satisfaction.jpg" alt="illustration-intro.svg" width={300} height={300} />
          </div>
          <h5 className="text-lg text-white font-bold"> Get satisfaction</h5>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
