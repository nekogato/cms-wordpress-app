
import { useState, useContext,useEffect } from "react";
import { AppContext } from "../components/store/context";

import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Content from '../components/content'
import { getAllPostsForHome} from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import { useForm } from "react-hook-form";

export const refreshPosts = async ({ preview }) => {
  const allPosts = await getAllPostsForHome(preview)

  return allPosts.edges;
}

export default function Create({ allPosts: { edges }, preview }) {
  const [morePosts, setMorePosts] = useState([]);
  useEffect(() => {
    setMorePosts(edges);
  }, []);
  const { createFormSubmit } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = async (data) => {
    const resp = await createFormSubmit(data);

    if (resp) {
      setIsSubmit(true);
      setMorePosts(await refreshPosts(preview));
    } else {
    }
  };


  return (
    <Content preview={preview}>
      <Head>
        <title>Create</title>
      </Head>
      <Container>
        <div className="page_content">
        Create
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_item form_item_text_wrapper">
                <label htmlFor="">title：</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="form_item form_item_message_wrapper">
                <label htmlFor="">content</label>
                <textarea
                  {...register("content", { required: true })}
                ></textarea>
              </div>
              <div className="form_item form_item_text_wrapper">
              <input type="submit" value="下一步" />
              </div>
            </form>
            {
              isSubmit&&
              <>
                <div>created.</div>
              </>
            }
        </div>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
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