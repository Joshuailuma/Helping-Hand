import Head from 'next/head'
import Image from 'next/image'
import Footer from '../component/Footer'
import styles from '../styles/Home.module.css'
 import { FaBeer, FaBuffer, FaGrinAlt } from 'react-icons/fa';
 import {abi, contractAddress} from "../constants"
 import { useMoralis } from "react-moralis"
 import { useWeb3Contract } from 'react-moralis';
import { useEffect } from 'react';

export default function Home() {


  const {chainId: chainIdHex, isWeb3Enabled, account} = useMoralis()
  const realChainId = parseInt(chainIdHex)
  const helpingHandAddress = realChainId in contractAddress ? contractAddress[realChainId][0]: null


  useEffect(() => {
    if (isWeb3Enabled) {
      console.log( typeof(account));

        updateUIValues()
    }
}, [isWeb3Enabled])

async function updateUIValues() {
 
  // A pure function
  // const i = (await getOwner()).toString()
  // console.log(i);
}
//   // A major function
//   const {
//     runContractFunction: enterRaffle,
//     data: enterTxResponse,
//     isLoading,
//     isFetching,
// } = useWeb3Contract({
//     abi: abi,
//     contractAddress: helpingHandAddress,
//     functionName: "enterRaffle",
//     msgValue: entranceFee, // Pass to functon
//     params: {}, //If there is params to pass to the constructor
// })


  // Call a view function
  const { runContractFunction: getOwner } = useWeb3Contract({
    abi: abi,
    contractAddress: helpingHandAddress, // specify the networkId
    functionName: "getOwner",
    params: {
      // newowner: account
    },
})

 async function runTheContract() { 
    const i = await getOwner()

  console.log(i);
}

  return (
    <div id='body' className={"mx-5 pt-24"}>
      {/* Nav bar will display on all screens */}
     
      
      {/* Hero section */}
      <section id='hero'>
        {/* Top */}
        <container className="items-center px-6 mx-auto">
            <h1 className="text-4xl font-bold text-center md:text-5xl ">
              Helping Hand
            </h1>
            <p className="text-center font-thin md:text-4xl text-darkGrayishBlue mt-12">
            You can donate to help people in need. Be rest assured that your money will get to the solicitor.
            You could also solicit for funds.
            </p>
            <div class="flex justify-center">
            {/* <a
              href="#"
              class="p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight"
              >Get Started</a> */}
          </div>

          {/* Image item */}
          <div className='md:w-1/3'>
          {/* <Image src="/help_me.jpg" alt="illustration-intro.svg" width={580} height={525} /> */}
          </div>

        </container>
      </section>

      {/* Features section */}
      <section id="features">

        <div className={'mt-20 mb-20 text-center text-4xl font-semibold'}>We provide a decentralized platform to help people in need</div>
        {/* space mean space between the items */}

        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          {/* ====1st flex itemm "Start a funding project"  flex flex-col space-y-12 makes this div be a container===*/}
          <div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl font-bold md:text-left">
          <FaBeer />
          </div>
          <h1 className=" text-center text-3xl text-darkGrayishBlue md:text-left">Start a funding project</h1>
          <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Create a funding project</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Ask for funds for a good course
          </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Set time for end of solicit
          </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
              Watch your funds grow
          </p>
            </div>

          </div>



 {/* Second flex item  flex flex-col space-y-12 makes this div be a container*/}
          <div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl font-bold md:text-left">
          <FaBuffer />
          </div>
          <h1 className=" text-center text-3xl text-darkGrayishBlue md:text-left">Get donations after a specific time</h1>
          <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                The decentralized nature ensures you get your donations</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Your little money can affect people's lives
          </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
                Set time for end of solicit
          </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-sm text-base text-darkGrayishBlue">
              Watch your funds grow
          </p>
            </div>

          </div>


{/* End of Second flex Item */}


{/* THird flex item  Help people in need*/}
<div className="flex flex-col space-y-6 md:w-1/3">
            {/* For icons */}
          <div className="max-w-md text-4xl font-bold md:text-left">
          <FaGrinAlt />
          </div>
          <h1 className=" text-center text-3xl text-darkGrayishBlue md:text-left">Help people in need</h1>
          <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
                
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
              Your little money can affect people's lives</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
                Your can put a smile on someone's face today
          </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-2 py-2 text-white rounded-full md:py-2 bg-brightBlue">
              </div>
              <p className="max-w-md text-base text-darkGrayishBlue">
                Be sure the solicitor will get the money since the process is decentralized
          </p>
            </div>

            <div className="flex items-center space-x-2">
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

      <section id="testimonials">
        {/*Container to hold Heading and testemonial block*/}
        <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center">
            Recently listed projects
          </h2>

        {/* Testimonial. Flex is like flexbox */}
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          {/* Testimonial 1. For medium screen we will take 1-third of each testimonial */}
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
          {/* Image div */}
          <div className="mt-14 w-16">
          <Image src="/avatar-anisha.png" alt="illustration-intro.svg" width={100} height={10} />
          </div>
          <h5 className="text-lg font-bold"> Anisha Li</h5>
          <p className="text-sm text-darkGrayishBlue">
          Stop jumping from one service to another to communicate, store
                files, track tasks and share documents. Manage offers an
                all-in-one team productivity solution.
          </p>
          </div>


        {/* Testimonial 1. For medium screen we will take 1-third of each testimonial */}
        <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3">
          {/* Image div */}
          <div className="mt-14 w-16">
          <Image src="/avatar-ali.png" alt="illustration-intro.svg" width={100} height={10} />
          </div>
          <h5 className="text-lg font-bold"> Ali Bravo</h5>
          <p className="text-sm text-darkGrayishBlue">
          Stop jumping from one service to another to communicate, store
                files, track tasks and share documents. Manage offers an
                all-in-one team productivity solution.
          </p>
          </div>



          {/* Testimonial 3. For medium screen we will take 1-third of each testimonial */}
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3">
          {/* Image div */}
          <div className="mt-14 w-16">
          <Image src="/avatar-richard.png" alt="illustration-intro.svg" width={100} height={10} />
          </div>
          <h5 className="text-lg font-bold"> Richard Watts</h5>
          <p className="text-sm text-darkGrayishBlue">
          Stop jumping from one service to another to communicate, store
                files, track tasks and share documents. Manage offers an
                all-in-one team productivity solution.
          </p>
          </div>
        </div>

        {/* Button */}
        <div className="my-16">
        <button
        //  onClick={async () =>
        //                     await getOwner({
        //                         // onComplete:
        //                         // onError:
        //                         onSuccess: handleSuccess,
        //                         onError: (error) => console.log(error),
        //                     })
        //                 }
        onClick={runTheContract}
                        
                        class="  p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight "
          >Get Started</button>
        </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="cta" className='bg-brightBlue'>
        {/* Flex container */}
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
          <h2 className='text-5xl font-bold text-center text-white md:text-4xl md:max-w-xl md:text-left'>
            Simplify how your team works today
          </h2>
          {/* Button */}
          <div>
          <a href="#" class="p-3 px-6 pt-2 text-brightBlue bg-white shadow-2xl rounded-full baseline hover:bg-gray-900 "
          >Get Started</a>
          </div>
        </div>

      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
