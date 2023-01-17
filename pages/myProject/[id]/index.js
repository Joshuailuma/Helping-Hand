import { useRouter } from "next/router"
import Image from "next/image"
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis"
import contractAbi from "../../../constants/abi.json"
import { Card, Modal, Input, Typography } from "@web3uikit/core";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Bell } from '@web3uikit/icons';
import { useNotification } from '@web3uikit/core';
import {Ada} from '@web3uikit/icons'
import {AtomicApi} from '@web3uikit/icons'
import networkMapping from "../../../constants/networkMapping.json"
import NavBar from "../../../components/NavBar";
import axios from "axios";

const Index = ({project}) => {
    const router = useRouter()
    const dataFromRouter = router.query
    const {chainId, isWeb3Enabled, account} = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const helpingHandAddress = networkMapping[chainString][0]
    const [amountSoFar, setAmountSoFar] = useState("")
    const dispatch = useNotification()
    const [isDeleting, setIsDeleting] = useState(false)

   useEffect(()=>{
    if(isWeb3Enabled){
    handleAmountSoFar()
  }
   }, [isWeb3Enabled])


    const { runContractFunction: withdraw, data: withdrawDataReturned,
      error: withdrawError,
      isLoading: withdrawIsLoading,
      isFetching: withdrawIsFetching,
     } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress, // specify the networkId
      functionName: "withdraw",
      params: {receiver: dataFromRouter.address
    },
    })

    const { runContractFunction: getAmountSoFar, data: getAmountSoFarDataReturned,
      error: getAmountSoFarError,
     } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress, // specify the networkId
      functionName: "getAmountSoFar",
      params: {anOwner: account
    },
    })

    const { runContractFunction: getPriceFeed
     } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress, // specify the networkId
      functionName: "getPriceFeed"
    })


    
    async function handleAmountSoFar () {
      const result = (await getAmountSoFar());
      setAmountSoFar(ethers.utils.formatUnits(result))
      //formatEther
      if(!result){
        setAmountSoFar("No data")
      }
    }
 

    // To withhdraw funds
    const handleWithdrawClick = async()=>{
      if(isWeb3Enabled){
        const result = await withdraw({
          onSuccess: handleWithdrawSuccess,
          onError: (error)=>{handleWithdrawFailure(error)
          }
        })
        } else{
        handleWalletNotConnected()
      }
    }

    const handleWithdrawSuccess = async(tx)=>{
      try{
        tx.wait(1)
      handleWithdrawNotification(tx)
      } catch(e){
        console.log(e);
      }     
    }

    const handleWithdrawNotification =()=>{
      dispatch({
        type: "success",
        message: "Withdraw successful",
        title: "Transaction Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }

    const handleWithdrawFailure =(e)=>{
      dispatch({
        type: "error",
        message: `Withdraw failed ${e.message}`,
        title: "Transaction Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }


    const handleWalletNotConnected = ()=>{
      dispatch({
        type: "error",
        message: "Please connect wallet",
        title: "No wallet",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }


    async function handleDeleteClick(){
      setIsDeleting(true)
       //Use http://localhost:3000 for dev server
        // https://helping-hand-pi.vercel.app
      const result = await axios.delete("https://helping-hand-pi.vercel.app/api/myProjectsApi", {params: {
        public_id: dataFromRouter.public_id,
        id: dataFromRouter._id,
    }
  })
  setIsDeleting(false)
  // console.log(result);
    }

     /*
    Set end date
    */
    // Date gotten from router
    const date = new Date(dataFromRouter.createdAt)
    // Get end time from router
    const endTime = parseInt(dataFromRouter.endTime) //Convert it from string to int
    // Add the endTime value to the previous date
    date.setDate(date.getDate() + endTime); // Add the date
    
    const dueDate = date.toLocaleString('en-US', {day:'numeric', month: 'long', year:'numeric'})

    return (
    <>
    <NavBar/>
    <section id="hero">
        {/* Flex row makes it responsive */}
        <div className={"flex flex-col md:flex-row  px-6 mx-auto space-y-0 md:space-y-0 pt-28"}>
          {/* Left item */}
          <div className={"flex flex-col mb-32 space-y-12 md:w-3/4 mr-20"}>
          <div className={"flex justify-center align-center"}>

    <div>
          <Card className={"max-w-md justify-center"} onClick={""}
            title={dataFromRouter.title}
            description={dataFromRouter.description}>
            <div>
           < h2 className={"text-centertext-brightBlue"}>Amount gotten: {amountSoFar} ETH</h2>
          </div>
          <div>
           < h2 className={"text-centertext-brightBlue"}>End time: {dueDate}</h2>
          </div>
             <Image loader={() => dataFromRouter.imageUrl}
            src={dataFromRouter.imageUrl} alt="image" height="320" width="400"/> 
           </Card>

          <div className={"flex flex-col mt-10 space-y-9"}>
          <button
         
          onClick={handleWithdrawClick}
              className={"p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight mx-auto"}
              >Withdraw</button>

          </div>

          <div className={"flex flex-col mt-10 space-y-9"}>
          <button
         
          onClick={handleDeleteClick}
              className={isDeleting ? "animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" :"p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight mx-auto"}
              >Delete project</button>

          </div>
          
          </div>
          </div>
          </div> {/*End of left item */}

          {/* Image item */}
          <div className={"md:w-1/4"}>

          <h1 className={"text-lg	my-11 text-slate-200"}> <Ada fontSize="50px"/>
          You can withdraw your funds if the end time is over</h1>
          <h1 className={"text-lg	text-slate-200"}> <AtomicApi fontSize="50px"/>
          Click the delete button to delete the project</h1>

          </div>
        </div>
      </section>
    </>
  )
}

export default Index