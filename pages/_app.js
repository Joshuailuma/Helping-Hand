import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from '@web3uikit/core'
import Router from "next/router";
import React from 'react';
import {Circles} from "react-loader-spinner";
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    const start = () => {
      //"start"
      setLoading(true);
    };
    const end = () => {
      //"finished
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return(
    <>
     {loading ? (
       <MoralisProvider initializeOnMount={false}>
       <NotificationProvider>
       <div className={"flex my-56 justify-center align-center"}>
        <NavBar/>
        <Circles
        height="80"
        width="80"
        color="#2A6BB2"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <div className={"font-serif ml-4"}>Please wait or refresh after a long time</div>
      </div>
       </NotificationProvider>   
     </MoralisProvider>
        
      ) : (
        <MoralisProvider initializeOnMount={false}>
    <NotificationProvider>
    <Component {...pageProps}/>
    </NotificationProvider>

  </MoralisProvider>
      )}
    </>
  
  )
}

export default MyApp
