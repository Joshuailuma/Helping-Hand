import { useRouter } from "next/router"
import Image from "next/image"
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis"
import contractAbi from "../../../constants/abi.json"
import { Card, Modal, Input, Typography } from "@web3uikit/core";
import { useState } from "react";
import { ethers } from "ethers";
import Web3 from 'web3';



const index = ({project}) => {
    const router = useRouter()
    const data = router.query
    const {chainId, isWeb3Enabled, account} = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const helpingHandAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const [showModal, setShowModal] = useState(false)
    const [amountToDonate, setAmountToDonate] = useState("")

   let sendValue = ethers.utils.parseEther("1")
   
    const { runContractFunction: fund, data: dataReturned,
      error,
      isLoading,
      isFetching, } = useWeb3Contract({
      abi: contractAbi,
      contractAddress: helpingHandAddress, // specify the networkId
      functionName: "fund",
      msgValue: amountToDonate,
      params: {receiver: data.address
    },
    })

    const {fetch, error: transferError, isFetching: transferIsFEtching} = useWeb3Transfer({
      amount: sendValue,
      receiver: helpingHandAddress,
      type: "native",
    });

    
    const handleDonateClick = async()=>{
      setShowModal(true)
    }

    const donate =async()=>{
      console.log("Donate clicked");
      if(isWeb3Enabled){
        const dataReturned = await fund()
        if(dataReturned){
          console.log(dataReturned);
          alert("Donation successfull")
        }
        if(error){
          console.log(error);
          alert("Error donating. Try again")
        }
      } else{
        alert("Please connect a wallet")
      }
    }

    return (
    <>
    <section id='hero '>
        {/* Flex row makes it responsive */}
        <container className="flex flex-col md:flex-row  px-6 mx-auto mt-10 space-y-0 md:space-y-0 pt-28">
          {/* Left item */}
          <div className='flex flex-col mb-32 space-y-12 md:w-3/4 mr-20'>
            <h1 className=" text-4xl text-center md:text-5xl">
              {data.title}
            </h1>

            <Image className={"px-44"}  src={data.imageUrl} alt="home" width={380} height={325} layout="responsive" />

            <div class="flex justify-center">
              <h1 className="text text-2xl" >Description</h1>
          </div>
            

          <div className={"justify-center"} > 
                <h2 className={"text-center"}>{data.description}</h2>
                </div>

          <button
          onClick={handleDonateClick}
              class={"p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight mx-auto"}
              >Donate</button>
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
      title={<div style={{display: 'flex', gap: 10}}><Typography color="#68738D" variant="h3">Input Buyer's Address</Typography></div>}
    >
      <Input
      type="number"
      onChange={()=>{
        setAmountToDonate(ethers.utils.parseEther(event.target.value))
      }}
        label="Amount to donate"
        width="100%"
      />
    </Modal>
          </div> {/*End of left item */}

          {/* Image item */}
          <div className='md:w-1/4'>

          <h1 > Here is all you need to know about Help me app. We are here to help people</h1>

          </div>
        </container>
      </section>

    </>
   

  )
}

export default index