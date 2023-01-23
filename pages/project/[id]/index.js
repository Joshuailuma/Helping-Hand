import { useRouter, useRef } from "next/router"
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

const Index = ({project}) => {
    const router = useRouter()
    const data = router.query
    const {chainId, isWeb3Enabled, account} = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const helpingHandAddress = networkMapping[chainString][0]
    const [showModal, setShowModal] = useState(false)
    const [amountToDonate, setAmountToDonate] = useState("")
    const [amountSoFar, setAmountSoFar] = useState("")
    const dispatch = useNotification()
    const donateFormRef = useRef()

   useEffect(()=>{
    if(isWeb3Enabled){
    handleAmountSoFar()
  }
   }, [isWeb3Enabled])

  /**
  * Contract fund function to fund the specified project
  */
    const { runContractFunction: fund, data: dataReturned,
      error,
      isLoading,
      isFetching, } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress,
      functionName: "fund",
      msgValue: amountToDonate, // Amount to fund th contract with
      params: {receiver: data.address //Address of the contract
    },
    })

    /**
   * Contract Function call to get theAmount so far of our funding project 
   */
      const { runContractFunction: getAmountSoFar, data: getAmountSoFarDataReturned,
      error: getAmountSoFarError,
     } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress,
      functionName: "getAmountSoFar",
      params: {anOwner: account
    },
    })

    /**
 * It calls the contract getAmountSoFar function
 */
    async function handleAmountSoFar () {
      const result = (await getAmountSoFar());
      setAmountSoFar(ethers.utils.formatUnits(result)) //We need to convert javascript number to eth =10e18
      //formatEther
      if(!result){
        setAmountSoFar("No data")
      }
    }

    /**
 * When the donate button is clicked, show modal
 */
    const handleDonateClick = async()=>{
      if(isWeb3Enabled){ // First check if wallet is connected
        setShowModal(true)
      } else{
        handleWalletNotConnected() //Show notification
      }
    }

    /**
 * To donate by calling the contract fund function
 */
    const donate =async()=>{
      setShowModal(false)
      if(isWeb3Enabled){
        const dataReturned = await fund({
          onSuccess: handleDonationSuccess,
          onError: (error)=>{handleDonationFailure(error)
          }
        })
        
      } else{
        handleWalletNotConnected()
      }
    }

    /**
 * When the donation is successful
 */
    const handleDonationSuccess = async(tx)=>{
      try{
        tx.wait(1)
      handleDonationNotification(tx)
      donateFormRef.current.reset(); //Clears the form data

      } catch(e){
        console.log(e);
      }     
    }

   /**
 * Show the success notification
 */
    const handleDonationNotification =()=>{
      dispatch({
        type: "success",
        message: "Donation successful",
        title: "Transaction Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }

    /**
     * how the donation failure notification
     * @param {errorMessage} e 
     */
    const handleDonationFailure =(e)=>{
      dispatch({
        type: "error",
        message: `Donation failed ${e.message}`,
        title: "Transaction Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }
    /**
     * Notification when wallet is not connected
     */
    const handleWalletNotConnected = ()=>{
      dispatch({
        type: "error",
        message: "Please connect wallet",
        title: "No wallet",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }

    /*
    Set end date
    */
    // Date gotten from router
    const date = new Date(data.createdAt)
    // Get end time from router
    const endTime = parseInt(data.endTime) //Convert it from string to int
    // Add the endTime value to the previous date
    date.setDate(date.getDate() + endTime); // Add the date
    
    const dueDate = date.toLocaleString('en-US', {day:'numeric', month: 'long', year:'numeric'})

    return (
    <>
    <NavBar/>
    <div className={"pt-11 text-white flex justify-center text-3xl tracking-wider font-bold no-underline hover:underline"}>
    <h1> Donate to this Project</h1>
    </div>
    <section id='hero'>
        {/* Flex row makes it responsive */}
        <div className="flex flex-col md:flex-row px-6 mx-auto space-y-0 md:space-y-0 pt-12">
          {/* Left item */}
          <div className='flex flex-col mb-32 space-y-12 md:w-3/4 mr-20'>
          <div className={"flex justify-center align-center"}>

    <div className={""}>
          <Card className={"max-w-md justify-center"} onClick={""}
            title={data.title}
            description={data.description}>
            <div>
           < h2 className={"text-centertext-brightBlue"}>Amount gotten: {amountSoFar} ETH</h2>
          </div>
          <div>
           < h2 className={"text-centertext-brightBlue"}>End time: {dueDate}</h2>
          </div>
             <Image loader={() => data.imageUrl}
            src={data.imageUrl} alt="image" height="320" width="400"/> 
           </Card>

          <div className={"flex flex-col mt-10 space-y-9"}>
          <button
          onClick={handleDonateClick}
              className={"p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight mx-auto"}
              >Donate</button>
          </div>
          
              <Modal
      cancelText="Cancel"
      id="v-center"
      isCentered = {true}
      isVisible={showModal}
      okText="Finally donate"
      onCancel={function noRefCheck(){
        setAmountToDonate("")
        setShowModal(false)
      }}
      onCloseButtonPressed={function noRefCheck(){
        setShowModal(false)
      }}
      onOk={donate}
      title={<div style={{display: 'flex', gap: 10}}><Typography color="#68738D" variant="h3">Input Amount to donate</Typography></div>}
    >
      <Input
      type="number" step=".01" min="0" value="0"
      ref={donateFormRef}
      onChange={()=>{
        setAmountToDonate(ethers.utils.parseEther(event.target.value))
      }}
        label="Amount to donate in ETH"
        width="100%"
      />
    </Modal>
          </div>
          </div>
          </div> {/*End of left item */}

          {/* Image item */}
          <div className='md:w-1/4'>

          <h1 className={"text-lg	my-11 text-slate-200"}> <Ada fontSize='50px'/>
          Donate to help accomplish projects</h1>
          <h1 className={"text-lg	text-slate-200"}> <AtomicApi fontSize='50px'/>
          Only the creator can withdraw after the specified timeframe is over</h1>

          </div>
        </div>
      </section>
    </>
  )
}

export default Index