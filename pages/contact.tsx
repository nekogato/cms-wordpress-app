import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Content from '../components/content'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Contact({ allPosts: { edges }, preview }) {
    const heroPost = edges[0]?.node

  return (
    <Content preview={preview}>
      <Head>
        <title>Contact</title>
      </Head>
      <Container>
        <div className="page_content">
            Contact
        </div>
      </Container>
    </Content>
  )
}


export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
    const allPosts = await getAllPostsForHome(preview)
  
    return {
      props: { allPosts, preview },
      revalidate: 10,
    }
  }