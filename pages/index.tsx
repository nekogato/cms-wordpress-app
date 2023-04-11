
import { useState, useEffect } from "react";
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Content from '../components/content'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Pusher from "pusher-js";

export default function Index({ allPosts: { edges }, preview }) {
  const [username, setUsername] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

    useEffect(() => {
      Pusher.logToConsole = true;

      const pusher = new Pusher('a2eefaf59d574e46fce6', {
        cluster: "ap3",
      });

      const channel = pusher.subscribe('chat');
      channel.bind('message', function(data) {
        allMessages.push(data);
        setMessages(allMessages);
      });
  });

    const submit = async (e) => {
        e.preventDefault();

        await fetch('api/messages', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message
            })
        });

        setMessage('');
    }

  return (
    <Content preview={preview}>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <Intro />
        <div>
          heeeeee
        </div>
        <div className="container">
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
                      crossOrigin="anonymous"/>
            </Head>

            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                    className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea" style={{minHeight: "500px"}}>
                    {messages.map(message => {
                        return (
                            <div className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <form onSubmit={submit}>
                <input className="form-control" placeholder="Write a message" value={message}
                       onChange={e => setMessage(e.target.value)}
                />
            </form>
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
