import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from 'next/link';
import {Circles} from "react-loader-spinner";
import {Card} from '@web3uikit/core';

const available_projects=({data}) =>{
  const [loading, setLoading] = useState(true)

  if(data.length == 0) {
    console.log("hahaha");
    return (<div className={"align-middle items-center justify-center pt-16 mt-24"}>
      <h1 className={"text-2xl"}> No projects present</h1>
    </div>)
  }

  // Set data to false to render the data page
  useEffect(()=>{
      setLoading(false)
	}, [])

  
  // Show the circle if fetching
  return (<Suspense fallback={<Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />}>

  {
  loading ? (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    
  ) : (
    <>
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4 pt-36 px-8'>
    
    {data.map(i => {

      // A full project card
      return(
        <Link href={{
          pathname: `/project/${i._id}`,
          query: i}}>

<Card className={"justify-center"}
    description={i.description}
    title={i.title}
    key={i._id}
  >
    <div >
      <Image 
        height={180}
        src={i.imageUrl}
        width={180}
      />
    </div>
  </Card>
</Link>
    )
}
)
}

</div>
    </>
  )
}
</Suspense>
  )
  
}

export async function getServerSideProps(context) {
  let {data} = await axios.get("http://localhost:3000/api/project")
  // We can only map through an array
  data = data.data
  return {
    props: {data} // will be passed to the page component as props
  }
}

export default available_projects