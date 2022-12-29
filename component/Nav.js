import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'

import { ConnectButton } from "@web3uikit/web3"

//We shall eventually bring this to our layout since we want it to be on every page
const Nav = () => {
  const myRef = useRef()
  const [showNav, setShowNav] = useState(false)
  const {isWeb3Enabled} = useMoralis()

   
  // useEffect(()=>{
  //   myRef.current.classList.toggle(styles.open) // and more..
  // })
let i = false

  const btnToggle = () => {
    console.log('HI');
    setShowNav(!showNav)
    myRef.current.classList.toggle(styles.open)
    
    // myRef.current.classList.toggle(styles.flex)
    // myRef.current.classList.toggle(styles.hidden)
    // console.log('Hahah');
    console.log(i);
  };

  const navToggleFlex = () => {
    myRef.current.classList.toggle(styles.flex)
  };

  const navToggleHidden = () => {
    myRef.current.classList.toggle(styles.hidden)
  };

  
  if (isWeb3Enabled){
    return (
    <nav  className={`relative container mx-auto p-6 ${styles.navigation}`}>
        {/* Flex Container */}
        <div className="flex item-center justify-between">
          {/* Logo */}
          <div className="pt-2">
        <Link href="./"> <Image src="/logo.jpeg" alt="Vercel Logo" width={100} height={25} /></Link>  
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex md:space-x-6">
            <Link className="text-white hover:text-brightBlue" href="/">Home</Link> 
            <Link className='text-white hover:text-darkGrayishBlue' href="/start_funding">Start Funding</Link>
            <Link className='text-white	hover:text-darkGrayishBlue' href="/available_projects">Available Projects</Link>
            <Link className='text-white	hover:text-darkGrayishBlue' href="/about">About</Link>
            <ConnectButton/>

            </div>
        {/* Button */}
        <Link href="#" className="hidden md:block  p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight "
          >Get Started</Link>
         

          {/* Hamburger icon*/}
          <div onClick={btnToggle} ref={myRef}>
          <button id="menu-btn" 
          className="block hamburger focus:outline-none md:hidden px-16">
          <span className={styles.hamburgerTop}></span>
          <span className={styles.hamburgerMiddle}></span>
          <span className={styles.hamburgerBottom}></span>
        </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
        <div
          id="menu" className={ showNav ? "absolute flex flex-col  items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"  }>          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      </nav>
    )
  } else{
// console.log("CLient User not here");
  return (
    <nav id="nav" className={`relative container mx-auto p-6 ${styles.navigation}`}>
           {/* Flex Container */}
           <div className="flex item-center justify-between">
             {/* Logo */}
             <div className="pt-2">
           <Link href="./"> <Image src="/logo.jpeg" alt="Vercel Logo" width={100} height={25} /></Link>  
             </div>
   
             {/* Menu Items */}
             <div className="hidden md:flex md:space-x-6">
            <Link className='text-white	hover:text-darkGrayishBlue' href="/about">About</Link>
            <ConnectButton/>

               </div>
           {/* Button */}
           {/* <Link href="#" className="hidden md:block  p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight "
             >Get Started</Link> */}
            
   
             {/* Hamburger icon*/}
             <div onClick={btnToggle} ref={myRef}>
             <button id="menu-btn" 
             className="block hamburger focus:outline-none md:hidden">
             <span className={styles.hamburgerTop}></span>
             <span className={styles.hamburgerMiddle}></span>
             <span className={styles.hamburgerBottom}></span>
           </button>
             </div>
           </div>
   
           {/* Mobile menu */}
           <div className="md:hidden">
           <div
             id="menu" className={ showNav ? "absolute flex flex-col  items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"  }>
             <Link href="/">Home</Link>
             <Link href="/about">About</Link>
           </div>
         </div>
         </nav>
  )
  }
    
       
  
}

export default Nav