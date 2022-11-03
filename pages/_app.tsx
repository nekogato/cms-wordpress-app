import { AppProps } from 'next/app'
import Layout from '../components/layout'
import { AppContextProvider } from "../components/store/context";
import '../styles/index.css'
import '../styles/layout.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <AppContextProvider>
        <Component {...pageProps} key={router.route}  />
      </AppContextProvider>
    </Layout>
  )
}

export default MyApp
