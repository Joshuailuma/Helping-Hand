import '../styles/globals.css'
import Layout from '../component/Layout'
import { MoralisProvider } from 'react-moralis'
function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return(
    <MoralisProvider initializeOnMount={false}>
       <Layout> 
    <Component {...pageProps} />
  </Layout> </MoralisProvider>
    )
}

export default MyApp
