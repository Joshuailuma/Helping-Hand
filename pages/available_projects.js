import Image from 'next/image'
import axios from "axios";
import Link from 'next/link';
import {Card} from '@web3uikit/core';
import NavBar from '../components/NavBar';

const available_projects=({data}) =>{

  if(data.length == 0) {
    return (<div className={"flex my-56 text-white justify-center align-center"}>
      <NavBar/>
      <h1 className={"text-2xl"}> No project present</h1>
    </div>)
  }


  // Show the circle if fetching
  return (
    <>
    <NavBar/>
    <div className={"px-8 text-white pt-9 flex justify-center text-3xl tracking-wider font-bold no-underline hover:underline"}>
    <h1> Available Projects that can be funded</h1>

    </div>
    <div className={"bg-lightBlack text-white grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 pt-14 px-8"}>

    { !data ? ( 
      <div className={"pt-48"}>No Project right now...</div>
        ):( data.map((i) => {
      // A full project card
      return(
        <div key={i._id}>
        <Link href={{pathname: `/project/${i._id}`, query: i}}>
<Card className={"justify-center items-center content-center align-middle text-center bg-black"}
    title={i.title}
  >
    <div >
      <Image 
        height={180}
        src={i.imageUrl}
        width={180}
        alt={"image"}
      />
    </div>
  </Card>
</Link>
        </div>
    )
}
))
}

</div>
    </>
  )
}

export async function getServerSideProps(context) {
  //Use http://localhost:3000 for dev server
  // https://helping-hand-pi.vercel.app
  let {data} = await axios.get("https://helping-hand-pi.vercel.app/api/projectApi")
  // We can only map through an array
  data = data.data
  return {
    props: {data} // will be passed to the page component as props
  }
}

export default available_projects