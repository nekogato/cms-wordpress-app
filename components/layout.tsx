import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Transition from './transition' 
import { useRouter } from "next/router" 
import { CMS_NAME } from '../lib/constants'
import Link from "next/link";

export default function Layout({children }) {
  const router = useRouter() 
  return (
    <>
      <div className="layout">
        <Meta />
        <div className="header">
          <Link href={`/`}>Home</Link> / 
          <Link href={`/about`}>About</Link> / 
          <Link href={`/contact`}>Contact</Link> / 
          <Link href={`/create`}>Create</Link>
        </div>
        <Transition location={router.asPath}>
          <div className="min-h-screen">
              {children}
          </div>
        </Transition>
      </div>
    </>
  )
}
