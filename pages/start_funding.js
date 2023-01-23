import React, { useState, useRef,} from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import { useMoralis, useWeb3Contract} from 'react-moralis';
import networkMapping from "../constants/networkMapping.json"
import contractAbi from "../constants/abi.json"
import { useNotification } from '@web3uikit/core';
import { Bell } from '@web3uikit/icons';
import NavBar from '../components/NavBar';
import Image from 'next/image';

function Start_funding() {
  const router = useRouter()

const [form, setForm] = useState({title: '', description: '', imageUrl: '', address: '', endTime: '', public_id: ''})
const [imageSrc, setImageSrc] = useState();
const [uploading, setUploading] = useState(false);
const [isFile, setIsFile] = useState(false);

const {chainId: chainId, isWeb3Enabled, account} = useMoralis()
const chainString = chainId ? parseInt(chainId).toString() : "31337"
const helpingHandAddress = networkMapping[chainString][0]
const formRef = useRef()

const dispatch = useNotification()

// Form details of what user input in
let formResult = {
  title: form.title,
  description: form.description,
  imageUrl : form.imageUrl,
  address: form.account,
  endTime: form.endTime,
  public_id: form.public_id
}

/**
 * Make the image chosen display in our UI
 * @param {*} changeEvent 
 */
function handleOnFileChange(changeEvent) {
  const reader = new FileReader();

  reader.onload = function(onLoadEvent) {
    setImageSrc(onLoadEvent.target.result);
  }
  // Get the image local url
  reader.readAsDataURL(changeEvent.target.files[0]);
  //Make file to now be present
  setIsFile(true)
}

/**
 * Gets the form data and uploads image to cloudinary
 * @param {*gotten from the form} event 
 */
async function handleOnFormSubmit(event) {
  event.preventDefault();

  // To make sure file is there
  if(isFile){
    setUploading(true) // Incase we want to do stuff during upload period
    // We just try to get the file
    const form = event.currentTarget;
    // Get the file
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
  
    const formData = new FormData();
  
    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }
  
    formData.append('upload_preset', 'my-uploads');

    //Call the contract function
    let theResult = await createProject()

    if (theResult == "error"){
        setUploading(false)
        // Leave this function if there is an error
      return;
    } else{
      //If there is no error
      // What we get back from the upload
      // didn't set up any api for this. Its jus this way
      //Upload the image to cloudinary
      const dataFromCloudinary = await fetch('https://api.cloudinary.com/v1_1/dreuuje6i/image/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());

      // Get public_id returned from cloudinary and attach it to formResult public_id field
      formResult.public_id = dataFromCloudinary.public_id
      // Get url to the image
      const cloudinaryResult = dataFromCloudinary.secure_url.toString()
      
      // Set the imageUrl in form to a new value gotten from cloudinary 
      formResult.imageUrl = cloudinaryResult
  
      // Set the address of form to a new value /our account address
        formResult.address = account

      // Upload form to mongodb
      const {data} = await axios.post('/api/projectApi', formResult);
        
      setUploading(false)

      // If we got a data back from mongodb
      if(data) {
        handleNotification() // Send success notification
        formRef.current.reset(); //Clear the form data
        setImageSrc(null) // Remove image currently being displayed in our frontend
      } else{

        dispatch({
          type: "error",
          message: "Try again",
          title: "Couldn't upload data",
          position: "topR",
          icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
        })
      }
    }
  } else{

    dispatch({
      type: "error",
      message: "Please upload a file",
      title: "No file present",
      position: "topR",
      icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
    })
  }
}

/** 
 * Get details from form when field changes
 */
const handleChange = (e) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value
  })
}

/**
 * Call the smartcontract function via metamask
 */
const createProject = async()=>{
  let result

  if (isWeb3Enabled){
    try {
      // Call the contract function
        const resultFromBlockchain = await startProject({
          onSuccess: handleStartProjectSuccess, //When successfull
          onError: (error)=>{
            handleStartProjectFailure(error)// When unsuccessful
          }
        })

        //if there is a result here
        if(resultFromBlockchain){
          doNotLeavePage() // Show a notification
          result = resultFromBlockchain
        }
    } catch (error) {
      // If there is an error after trying
      result = "error"
      handleStartProjectFailure(error)
      }
  } else{
    //If wallet isnt connected
    result = "error"
    handleWalletNotConnected()
  }
  return result
  
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

/**
 * Notification when project has been created successfully
 * Can't use this function
 */
const handleStartProjectSuccess = async(tx)=>{
  try{
    tx.wait(1)
  } catch(e){
    console.log(e);
  }
  
}

/**
 * Notification when project has been created successfully
 */
const handleNotification =()=>{
  dispatch({
    type: "success",
    message: "Project creation succesfull",
    title: "Transaction Notification",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}

/**
 * Notification Waiting for confirmation, do not leave page
 */
const doNotLeavePage =()=>{
  dispatch({
    type: "info",
    message: "Please wait for confirmation, DO NOT LEAVE THIS PAGE",
    title: "Waiting for confirmation",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}

/**
 * Notification when project fails
 */
const handleStartProjectFailure =(e)=>{
  dispatch({
    type: "error",
    message: `Creation failed ${e.message}`,
    title: "Transaction Notification",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}

/**
 * Contract function to start a project in blockchain
 */
const { runContractFunction: startProject, data: dataReturned,
  error,
  isLoading,
  isFetching, } = useWeb3Contract({
  abi: contractAbi,
  contractAddress: helpingHandAddress, // specify the networkId
  functionName: "startProject",
  params: {newowner: account,
    endTime: form.endTime
  },
})

return (
    <div className={"bg-lightBlack md:ml-40 pt-16"}>
            <NavBar />
       <section className="flex flex-col mt-12 mx-20">
        <h1 className="text-4xl  text-white font-bold md:text-5xl"> Start Funding</h1>
        <p className="text-2xl mt-6 text-darkGrayishBlue">
            </p>     
            <form onSubmit={handleOnFormSubmit} ref={formRef} className={"mt-6"}>
              <div className=" flex flex-col space-y-6">             
             {/* Name */}

              <label  className="text-left text-slate-200">Title</label>
              <input onChange={handleChange} name={'title'} required maxLength={"100"}
                type='text'
                className={"px-6 py-3 align-middle bg-slate-600 text-white rounded-lg border-solid outline-double	w-80"}
                placeholder="E.g Internally displaced persons"
              />

               {/* endTime */}
              <label  className="text-left text-slate-200">Number of days donation would last</label>
              <input onChange={handleChange} name={'endTime'} required maxLength={"40"}
                type='number' min="1" step="1"   
                className={"px-6 py-3 align-middle bg-slate-600 text-white rounded-lg border-solid outline-double	w-80"}
                placeholder="E.g 23"
              />

            {/* Description */}
          <label htmlFor="description" className="text-left text-white">The reason for this funding</label>
              <textarea onChange={handleChange} name={'description'} required maxLength={"5000"}
                rows="4" cols="50"
                className={"px-6 py-3 rounded-lg border-solid bg-slate-600 text-white outline-double	w-80"}
                placeholder="E.g In the IDP camp there are 20,000 persons..."
              ></textarea> 
             <input onChange={handleOnFileChange} className={"text-slate-200"} type='file' name='file'></input>

             {imageSrc ? (<div>
             <Image alt="file uploader preview"
                      src={imageSrc}
                      width={320}
                      height={218}
                    />
             </div>
             ) :(<div></div>)}
              </div>
              <input disabled={uploading || isLoading || isFetching} type="submit" value={uploading || isLoading || isFetching ? "" : "Submit"} className={uploading || isLoading || isFetching ? "animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" :"px-16 mb-12 py-2 mt-4 ml-12 focus:outline-none  text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight"} />
            </form>            
        </section>
    </div>
    
  )
}


export default Start_funding