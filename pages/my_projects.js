import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from 'next/link';
import {Circles} from "react-loader-spinner";
import {Card} from '@web3uikit/core';
import NavBar from '../components/NavBar';
import { useMoralis} from 'react-moralis';

function my_projects() {

    const [loading, setLoading] = useState(true)
    const [myProjects, setMyProjects] = useState([])

    const {isWeb3Enabled, account} = useMoralis()
    // Set data to false to render the data page
    useEffect(()=>{
        setLoading(false)
        fetchData();
    }, [account])

      async function fetchData() {
        console.log(account);
        let {data} = await axios.get("http://localhost:3000/api/myProjectsApi", {params: {
          address: account
      }
      })
        // console.log(data.data);
        // Result actually looks like this 
        //{
            // success: true,
            // data: [
            //   {
                // _id: '63be7d843bec7be02874d028',
                // title: 'For internally displaced persons',
            //   }]}
            if(data){
                setMyProjects(data.data)
            }
      }


    console.log(typeof(myProjects));
console.log(myProjects);

    if(myProjects.length == 0) {
      console.log("hahaha");
      return (<div className={"flex my-56 justify-center align-center"}>
        <NavBar/>
        <h1 className={"text-2xl"}> No project present</h1>
      </div>)
    }
  
    
    // Show the circle if fetching
    return (<Suspense  fallback={<Circles
      height="80"
      width="80"
      color="#2A6BB2"
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
        color="#2A6BB2"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      
    ) : (
      <>
      <div className={"bg-lightBlack text-white grid grid-cols-2 gap-4 md:grid-cols-4 pt-36 px-8"}>
      <NavBar/>
      { isWeb3Enabled ? ( !myProjects ?( 
         <div className={"pt-48"}>No Projects right now...</div>
            ) : (
                myProjects.map(i => {
        // A full project card
        return(
          <Link href={{
            pathname: `/myProject/${i._id}`,
            query: i}}>
  
  <Card className={"justify-center bg-black"}
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
  ))
  ): ( 
  <div className={"pt-52"}>Web3 Currently Not Enabled</div>
  )
  }
  
  </div>
      </>
    )
  }
  </Suspense>
    )
    
  }
 
//   export async function getServerSideProps(context) {
//         console.log("hahahahah");
//     const { dataFromContext } = context.query;

//     let {data} = await axios.get("http://localhost:3000/api/myProjectsApi")
//     // We can only map through an array
//     data = data.data
//     return {
//       props: {data} // will be passed to the page component as props
//     }
// }

export default my_projects