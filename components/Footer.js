import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-veryDarkBlue ">
    {/* Flex container */}
    <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:spacey-0">
      {/* Logo and social links container */}
      <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-0 md:items:start">

        <div className="mx-auto my-6 text-center text-white md:hidden">
        Copyright &copy; Grandida LLC 2023. All rights reserved
        </div>
        
       
      </div>

      {/* List container */}
      <div className="flex justify-around space-x-32">
        <div className="flex flex-col space-y-3 text-white">
        <Link href="/" className='hover:text-brightRed'>Home</Link>
          <Link href="/available_projects" className='hover:text-brightRed'>Available projects</Link>
          <Link href="/about" className='hover:text-brightRed'>About us</Link>
        </div>

      </div>

      {/* Input container */}
      <div className="flex flex-col justify-between">
        <form action="">
          <div className="flex space-x-3">
            <input type="text" placeholder='Send us a message' className="flex-1 px-4 rounded-full focus:outline-none" />
            <button className={"p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight"}> 
            Send
            </button>
          </div>
        </form>
        
      </div>
    </div>
  </footer>

  )
}

export default Footer