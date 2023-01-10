import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import { useMoralis, useWeb3Contract} from 'react-moralis';
import networkMapping from "../constants/networkMapping.json"
import contractAbi from "../constants/abi.json"
import { useNotification } from '@web3uikit/core';
import { Bell } from '@web3uikit/icons';
import NavBar from '../components/NavBar';

function start_funding() {
  const router = useRouter()

const [form, setForm] = useState({title: '', description: '', imageUrl: '', address: '', endTime: ''})
const [imageSrc, setImageSrc] = useState();
const [uploading, setUploading] = useState(false);
const [isFile, setIsFile] = useState(false);
const {chainId: chainId, isWeb3Enabled, account} = useMoralis()
const chainString = chainId ? parseInt(chainId).toString() : "31337"
const helpingHandAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const dispatch = useNotification()

let formResult = {
  title: form.title,
  description: form.description,
  imageUrl : form.imageUrl,
  address: form.account,
  endTime: form.endTime
}


// useEffect(() => {
//   if (isWeb3Enabled) {
//       updateUIValues()
//   }
// }, [isWeb3Enabled])

// const { runContractFunction: getOwner } = useWeb3Contract({
//   abi: abi,
//   contractAddress: helpingHandAddress, // specify the networkId
//   functionName: "getOwner",
//   params: {},
// })

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
  
    // What we get back from the upload
    const dataFromCloudinary = await fetch('https://api.cloudinary.com/v1_1/dreuuje6i/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());
  
    const cloudinaryResult = dataFromCloudinary.secure_url.toString()
    // setImageSrc(dataFromCloudinary.secure_url);
  
    console.log(cloudinaryResult);
    
    // Sets the imageUrl to a new value
    formResult.imageUrl = cloudinaryResult
  createProject()
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
  console.log(form);
  setForm({
      ...form,
      [e.target.name]: e.target.value
  })
}

/**
 * Send details to api to be stored in mongoDb
 */
const  createProject = async()=>{
  formResult.address = account

  console.log(formResult);
  if (isWeb3Enabled){
    try {
      const {data} = await axios.post('/api/project', formResult);
      if(data){
        const resultFromBlockchain = await startProject({
          onSuccess: handleStartProjectSuccess,
          onError: (error)=>{handleStartProjectFailure(error)}
        })
      }

    } catch (error) {
      console.log("error");
      }
    setUploading(false)
  } else{
    handleWalletNotConnected()
  }
  
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
  handleNotification(tx)
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

              <label  className="text-left  text-slate-200">Title</label>
              <input onChange={handleChange} name={'title'} required maxLength={"40"}
                type='text'
                className={"px-6 py-3 align-middle rounded-lg border-solid outline-double	w-80"}
                placeholder="E.g Internally displaced persons"
              />

               {/* endTime */}

               <label  className="text-left text-slate-200">Number of days donation would last</label>
              <input onChange={handleChange} name={'endTime'} required maxLength={"40"}
                type='number'
                className={"px-6 py-3 align-middle rounded-lg border-solid outline-double	w-80"}
                placeholder="E.g 23"
              />


            {/* Description */}


          <label htmlFor="description" className="text-left text-slate-200">The reason for this funding</label>
              <textarea onChange={handleChange} name={'description'} required maxLength={"200"}
                rows="4" cols="50"
                className={"px-6 py-3 rounded-lg border-solid outline-double	w-80"}
                placeholder="E.g In the IDP camp there are 20,000 persons..."
              > </textarea> 
             <input onChange={handleOnFileChange} className={"text-slate-200"} type='file' name='file'></input>

             {imageSrc ? (<div>
             <img alt="file uploader preview"
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


export default start_funding