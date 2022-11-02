import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Transition from './transition' 
import { useRouter } from "next/router" 

export default function Content({ preview, children }) {
  return (
    <>
        <main className="main">{children}</main>
    </>
  )
}
