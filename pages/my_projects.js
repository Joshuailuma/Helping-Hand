import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import axios from "axios";
import Link from 'next/link';
import { Circles } from "react-loader-spinner";
import { Card } from '@web3uikit/core';
import NavBar from '../components/NavBar';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

function My_projects() {
  const [loading, setLoading] = useState(true)
  const [myProjects, setMyProjects] = useState([])

  const { isWeb3Enabled, account } = useMoralis()
  const router = useRouter()
  const data = router.query
  // Set data to false to render the data page
  useEffect(() => {
    setLoading(false)
    fetchData();
  }, [account])

  async function fetchData() {
    // console.log(account);
    //Use http://localhost:3000 for dev server
    // https://helping-hand-pi.vercel.app
    let { data } = await axios.get("https://helping-hand-pi.vercel.app/api/myProjectsApi", {
      params: {
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
    if (data) {
      setMyProjects(data.data)
    }
  }


  console.log(typeof (myProjects));
  console.log(myProjects);

  if (myProjects.length == 0) {
    console.log("hahaha");
    return (<div className={"flex text-white my-56 justify-center align-center"}>
      <NavBar />
      <h1 className={"text-2xl"}> No project present</h1>
    </div>)
  }


  // Show the circle if fetching
  return (<Suspense fallback={<Circles
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
          <NavBar />
          <div className={"px-8 text-white pt-9 flex justify-center text-3xl tracking-wider font-bold no-underline hover:underline"}>
            <h1> Your Projects</h1>
          </div>

          <div className={"bg-lightBlack text-white grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 pt-14 px-8"}>
            {isWeb3Enabled ? (!myProjects ? (
              <div className={"pt-48"}>No Projects right now...</div>
            ) : (
              myProjects.map((i) => {
                // A full project card
                return (
                  <div key={i._id}
                  >
                    <Link href={{
                      pathname: `/myProject/${i._id}`,
                      query: i
                    }}>

                      <Card className={"justify-center bg-black"}
                        title={i.title}
                      >
                        <div >
                          <Image
                            height={180}
                            src={i.imageUrl}
                            width={180}
                            alt="image"
                          />
                        </div>
                      </Card>
                    </Link>
                  </div>
                )
              }
              ))
            ) : (
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

export default My_projects