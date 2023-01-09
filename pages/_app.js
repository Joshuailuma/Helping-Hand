import '../styles/globals.css'
import Layout from '../component/Layout'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from '@web3uikit/core'
function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return(
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
      <Layout> 
    <Component {...pageProps} />
  </Layout> 
      </NotificationProvider>
       </MoralisProvider>
    )
}

export default MyApp
