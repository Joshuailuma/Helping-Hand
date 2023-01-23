import { useRouter } from "next/router"
import Image from "next/image"
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis"
import contractAbi from "../../../constants/abi.json"
import { Card } from "@web3uikit/core";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Bell } from '@web3uikit/icons';
import { useNotification } from '@web3uikit/core';
import { Ada } from '@web3uikit/icons'
import { AtomicApi } from '@web3uikit/icons'
import networkMapping from "../../../constants/networkMapping.json"
import NavBar from "../../../components/NavBar";
import axios from "axios";

const Index = () => {
  const router = useRouter()
  const dataFromRouter = router.query //Data from the previous screen
  const { chainId, isWeb3Enabled, account } = useMoralis() // Helps us interact with blockchain from frontend
  const chainString = chainId ? parseInt(chainId).toString() : "31337"
  const helpingHandAddress = networkMapping[chainString][0]
  const [amountSoFar, setAmountSoFar] = useState("")
  const dispatch = useNotification() //For notification
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (isWeb3Enabled) {
      handleAmountSoFar()
    }
  }, [isWeb3Enabled])

  /**
   * Contract Function call to withdraw from the contract 
   */
  const { runContractFunction: withdraw, data: withdrawDataReturned,
    error: withdrawError,
    isLoading: withdrawIsLoading,
    isFetching: withdrawIsFetching,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: helpingHandAddress,
    functionName: "withdraw", //The function name in the contract
    params: {
      receiver: dataFromRouter.address // We are passing address as a parameter to the contract
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
    params: {
      anOwner: account //We are passing our account as a parameter
    },
  })

/**
 * It calls the contract getAmountSoFar function
 */
  async function handleAmountSoFar() {
    const result = (await getAmountSoFar());
    setAmountSoFar(ethers.utils.formatUnits(result)) //We need to convert javascript number to eth =10e18
    //formatEther
    if (!result) {
      setAmountSoFar("No data")
    }
  }


  /**
 * It calls the contract withdraw function.
 */
  const handleWithdrawClick = async () => {
    // First check if wallet is connected
    if (isWeb3Enabled) {
      const result = await withdraw({
        onSuccess: handleWithdrawSuccess, // Call this fuction if successful
        onError: (error) => {
          handleWithdrawFailure(error) // If error call the function and pass in the error message
        }
      })
    } else {
      handleWalletNotConnected()
    }
  }
  /**
   * If withdraw is successful show a notification
   * @param {transaction} tx 
   */
  const handleWithdrawSuccess = async (tx) => {
    try {
      tx.wait(1)
      handleWithdrawNotification(tx) // Success notification
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Successful withdrawal notification
   */
  const handleWithdrawNotification = () => {
    dispatch({
      type: "success",
      message: "Withdraw successful",
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
    })
  }

  /**
   * Failed withdraw notification
   * @param {errorMessage} e 
   */
  const handleWithdrawFailure = (e) => {
    dispatch({
      type: "error",
      message: `Withdraw failed ${e.message}`,
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
    })
  }

  /**
   * Notification when wallet is not connected
   */
  const handleWalletNotConnected = () => {
    dispatch({
      type: "error",
      message: "Please connect wallet",
      title: "No wallet",
      position: "topR",
      icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
    })
  }

  /**
   * When delete button is clicked, call the Api
   */
  async function handleDeleteClick() {
    setIsDeleting(true)
    //Use http://localhost:3000 for dev server
    // https://helping-hand-pi.vercel.app
    const { data } = await axios.delete("https://helping-hand-pi.vercel.app/api/myProjectsApi", {
      params: {
        public_id: dataFromRouter.public_id, //Parameters to pass to the api
        id: dataFromRouter._id,
      }
    })

    // If the message from the data returned contains "Project deleted"..
    if (data.message == "Project deleted") {
      // Show success notification
      dispatch({
        type: "success",
        message: "Project deleted.",
        title: "Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
      router.push('/'); //Go to the home screen
    } else {
      // Show failure notification
      dispatch({
        type: "error",
        message: "Failed to delete project",
        title: "Notification",
        position: "topR",
        icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
      })
    }
    // Set isDeleting to false. to stop the spinner
    setIsDeleting(false)
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

  const dueDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <NavBar />
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
                    src={dataFromRouter.imageUrl} alt="image" height="320" width="400" />
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
                    className={isDeleting ? "animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" : "p-3 px-6 pt-2 text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight mx-auto"}
                  >Delete project</button>

                </div>

              </div>
            </div>
          </div> {/*End of left item */}

          {/* Image item */}
          <div className={"md:w-1/4"}>
            <h1 className={"text-lg	my-11 text-slate-200"}> <Ada fontSize="50px" />
              You can withdraw your funds if the end time is over</h1>
            <h1 className={"text-lg	text-slate-200"}> <AtomicApi fontSize="50px" />
              Click the delete button to delete the project</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index