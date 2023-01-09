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

  
    return (
    <nav  className={`relative container mx-auto p-6 ${styles.navigation}`}>
        {/* Flex Container */}
        <div className="flex item-center justify-between">
          {/* Logo */}
          <div className="pt-2">
        <Link href="./"> <Image src="/logo.jpeg" alt="Vercel Logo" width={100} height={25} /></Link>  
          </div>
          {/* Menu Items */}
          <div className="hidden space-x-6 md:flex">
            <Link className="text-white hover:text-brightBlue" href="/">Home</Link> 
            <Link className='text-white hover:text-darkGrayishBlue' href="/start_funding">Start Funding</Link>
            <Link className='text-white	hover:text-darkGrayishBlue' href="/available_projects">Available Projects</Link>
            <Link className='text-white	hover:text-darkGrayishBlue' href="/about">About</Link>
            </div>
            <ConnectButton/>


          {/* Hamburger icon*/}
          <div onClick={btnToggle} ref={myRef}>
          <button id="menu-btn" 
          className={"block hamburger focus:outline-none"}>
          <span className={styles.hamburgerTop}></span>
          <span className={styles.hamburgerMiddle}></span>
          <span className={styles.hamburgerBottom}></span>
        </button>
          </div>
        </div>


        {/* Mobile menu */}
        <div className="hidden">
        <div
          id="menu" className={ ""}>      
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        <h2>jwj</h2>
        </div>

      </div>
      </nav>
      )
}

export default Nav