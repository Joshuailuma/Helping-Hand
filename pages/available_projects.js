import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from 'next/link';
import {Circles} from "react-loader-spinner";
import {Card} from '@web3uikit/core';
import NavBar from '../components/NavBar';
import { useMoralis} from 'react-moralis';

const available_projects=({data}) =>{

  if(data.length == 0) {
    return (<div className={"flex my-56 justify-center align-center"}>
      <NavBar/>
      <h1 className={"text-2xl"}> No project present</h1>
    </div>)
  }


  // Show the circle if fetching
  return (
    <>
    <div className={"bg-lightBlack text-white grid grid-cols-2 gap-4 md:grid-cols-4 pt-36 px-8"}>
    <NavBar/>
    { !data ? ( 
      <div className={"pt-48"}>No Project right now...</div>
        ):( data.map((i) => {
      // A full project card
      return(
        <div key={i._id}>
        <Link href={{pathname: `/project/${i._id}`, query: i}}>
<Card className={"justify-center bg-black"}
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
  let {data} = await axios.get("http://localhost:3000/api/projectApi")
  // We can only map through an array
  data = data.data
  return {
    props: {data} // will be passed to the page component as props
  }
}

export default available_projects