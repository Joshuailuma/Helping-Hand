import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Nav2() {
    const [navbar, setNavbar] = useState(false);

  return (
    <div>
 <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
 <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
 <div>
 <div className="flex items-center justify-between py-3 md:py-5 md:block">
        {/* LOGO */}
    <Link href="/">
    <h2 className="text-2xl text-cyan-600 font-bold ">LOGO</h2>
    </Link>

    {/* HAMBURGER BUTTON FOR MOBILE */}
    <div className="md:hidden">
        <button
          className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
           onClick={() => setNavbar(!navbar)} >
             {navbar ? (
                <Image src="/close.svg" width={30} height={30} alt="logo" />
              ) : (
                <Image
                  src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
    </div>
    </div>
</div>
</nav>
    </div>
  )
}

export default Nav2