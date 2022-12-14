
import { useState, useContext } from "react";
import { AppContext } from "../components/store/context";

import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Content from '../components/content'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import { useForm } from "react-hook-form";

export default function Contact({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const { formSubmit } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [previewForm, setPreviewForm] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = async (data) => {
    const resp = await formSubmit(data);

    if (resp) {
      setIsSubmit(true);
    } else {
    }
  };


  return (
    <Content preview={preview}>
      <Head>
        <title>Contact</title>
      </Head>
      <Container>
        <div className="page_content">
            Contact
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_item form_item_text_wrapper">
                <label htmlFor="">姓名：</label>
                <input
                  type="text"
                  {...register("your_name", { required: true })}
                />
              </div>
              <div className="form_item form_item_text_wrapper">
                <label htmlFor="">電郵地址：</label>
                <input
                  type="email"
                  {...register("your_email", { required: true })}
                />
              </div>
              <div className="form_item form_item_text_wrapper">
                <label htmlFor="">主題：</label>
                <input
                  type="text"
                  {...register("your_subject", { required: true })}
                />
              </div>
              <div className="form_item form_item_message_wrapper">
                <label htmlFor="">信息：</label>
                <textarea
                  {...register("your_message", { required: true })}
                ></textarea>
              </div>
              <div className="form_item form_item_text_wrapper">
              <input type="submit" value="下一步" />
              </div>
            </form>
            {
              isSubmit&&
              <>
                <div>submitted.</div>
              </>
            }
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