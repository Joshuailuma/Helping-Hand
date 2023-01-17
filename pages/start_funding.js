import React, { useState, useEffect} from 'react'
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
const [imageIdCloudinary, setImageIdCloudinary] = useState('');

const {chainId: chainId, isWeb3Enabled, account} = useMoralis()
const chainString = chainId ? parseInt(chainId).toString() : "31337"
const helpingHandAddress = networkMapping[chainString][0]

const dispatch = useNotification()

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

    setUploading(true)

    // We just try to get the file
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
  
    const formData = new FormData();
  
    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }
  
    formData.append('upload_preset', 'my-uploads');

    //Call the contract function
    let theResult = await createProject()
    console.log("Blockchain result is", theResult);
    if (theResult == "error"){
        setUploading(false)
      return;
    } else{

      // What we get back from the upload
      // didn't set up any api for this. Its jus this way
      const dataFromCloudinary = await fetch('https://api.cloudinary.com/v1_1/dreuuje6i/image/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());
    
      console.log("Cloudinary result is");
      console.log(dataFromCloudinary);
      // setImageIdCloudinary(dataFromCloudinary.public_id)
      // Get public_id of image fom cloudinary data
      formResult.public_id = dataFromCloudinary.public_id
      // Get url to the image
      const cloudinaryResult = dataFromCloudinary.secure_url.toString()
      // setImageSrc(dataFromCloudinary.secure_url);
    
      console.log(cloudinaryResult);
      
      // Sets the imageUrl to a new value
      formResult.imageUrl = cloudinaryResult
  
      // Sets the address of form to a new value
        formResult.address = account

      console.log(formResult, "Form result");
      // Upload form to mongodb
      const {data} = await axios.post('/api/projectApi', formResult);
      console.log("Mongodb data", data);
          setUploading(false)

      if(data) {
        handleNotification()
         setForm({})
        setImageSrc(null)
      } else{
        console.log("Could not upload to mongo db")
        setForm({})
        setImageSrc(null)
        console.log("Couldn't upload to mongo");
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
  // formResult.address = account
  let result

  // console.log(formResult);
  if (isWeb3Enabled){
    try {
      // setUploading(true)

      // const {data} = await axios.post('/api/project', formResult);
      // if(data){
        // console.log("Data from mongodb");
        // console.log(data);
        const resultFromBlockchain = await startProject({
          onSuccess: handleStartProjectSuccess,
          onError: (error)=>{
            // deleteProject(data.data._id)

            handleStartProjectFailure(error)
          }
        })

        if(resultFromBlockchain){
          doNotLeavePage() // Show a notification
          result = resultFromBlockchain
        }
      // }

    } catch (error) {
      console.log("error");
      result = "error"
      }
    // setUploading(false)
  } else{
    result = "error"
    handleWalletNotConnected()
  }
  return result
  
}

//TO delete a project from mongoDb
const deleteProject = async(id)=>{
  console.log(id);
 const result = await axios.delete('/api/myProjectApi', id)
 console.log("Deleted");
 console.log(result);
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


const handleStartProjectSuccess = async(tx)=>{
  try{
    tx.wait(1)

    //If upload to blockchain is successful

  // handleNotification(tx)
  // setForm({})
  // setImageSrc(null)
  } catch(e){
    console.log(e);
  }
  
}

const handleNotification =()=>{
  dispatch({
    type: "success",
    message: "Project creation succesfull",
    title: "Transaction Notification",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}

const doNotLeavePage =()=>{
  dispatch({
    type: "info",
    message: "Please wait for Metamask confirmation, DO NOT LEAVE THIS PAGE",
    title: "Waiting for confirmation",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}



const handleStartProjectFailure =(e)=>{
  dispatch({
    type: "error",
    message: `Creation failed ${e.message}`,
    title: "Transaction Notification",
    position: "topR",
    icon: <Bell fontSize="50px" color="#000000" title="Bell Icon" />
  })
}

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
            <form action=""  onSubmit={handleOnFormSubmit} className={"mt-6"}>
              <div className=" flex flex-col space-y-6">             
             {/* Name */}

              <label  className="text-left text-slate-200">Title</label>
              <input onChange={handleChange} name={'title'} required maxLength={"40"}
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
             </div>) :(<div></div>)}

              </div>

              <input disabled={uploading || isLoading || isFetching} type="submit" value={uploading || isLoading || isFetching ? "" : "Submit"} className={uploading || isLoading || isFetching ? "animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" :"px-16 mb-12 py-2 mt-4 ml-12 focus:outline-none  text-white bg-brightBlue rounded-full baseline hover:bg-brightBlueLight"} />
            </form>            
        </section>
    </div>
    
  )
}


export default Start_funding