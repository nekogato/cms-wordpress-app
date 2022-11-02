import { AppProps } from 'next/app'
import Layout from '../components/layout'
import '../styles/index.css'
import '../styles/layout.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
    <Component {...pageProps} key={router.route}  />
    </Layout>
  )
}

export default MyApp
