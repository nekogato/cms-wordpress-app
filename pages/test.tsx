
import { useState, useEffect } from "react";

export default function Index() {
    const [username, setUsername] = useState('username');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let allMessages = [];


    const submit = async (e) => {
        e.preventDefault();

        await fetch('api/test', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message
            })
        }).then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    

        setMessage('');
    }

    return (
        
        <div className="container">

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
    )
  }