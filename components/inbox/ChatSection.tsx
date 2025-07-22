import React, {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';


// const websocket = new WebSocket('ws://localhost:8080');


export default function ChatSection() {
    const connection = useRef(null);
    const [message, setMessage] = useState("");
    const [currentChatId, setCurrentChatId] = useState(0);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080")

        // Connection opened
        socket.addEventListener("open", (event) => {
            socket.send(JSON.stringify({
                type: 'my_id',
                value: localStorage.getItem('user_id'),
            }))
        })

        // Listen for messages
        socket.addEventListener("message", (event) => {
            const receivedData = JSON.parse(event.data);

            handleAppendMessage(currentChatId.toString(), receivedData)
        })

        connection.current = socket

        // return () => connection.current.close()
    }, [currentChatId])


    //fetch message from DB
    useEffect(() => {
        if (!currentChatId) return;

        const message_ids = [];


        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://social-backend.local/api/messages?to_id=${currentChatId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                const resData = await response.json();
                const myId = localStorage.getItem("user_id");

                const messagesWithDirection = resData.data.map((item) => ({
                    ...item,
                    direction: item.from_id.toString() === myId ? "out" : "in"
                }));

                setChat(messagesWithDirection);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            }
        };

        fetchMessages();

    }, [currentChatId]);


    //send message to WS and send to DB
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentChatId > 0) {
            const tmpId = uuidv4();

            connection.current.send(JSON.stringify({
                type: 'message',
                id: '',
                tmp_id: tmpId,
                from_id: localStorage.getItem('user_id'),
                to_id: currentChatId.toString(),
                message: message,
            }))

            try {
                const response = await fetch('http://social-backend.local/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        tmp_id: tmpId,
                        from_id: localStorage.getItem('user_id'),
                        to_id: currentChatId.toString(),
                        message: message,
                        status: 'sent',
                    }),
                });

                const data = await response.json();

                console.log('Saved to DB:', data);
            } catch (error) {
                console.error('Failed to send to backend:', error);
            }

            setMessage("");
        }
    }

    //append message into array
    const handleAppendMessage = (chatId: string, messageData) => {
        const myId = localStorage.getItem("user_id");

        if (
            (messageData.from_id === chatId && messageData.to_id === myId) ||
            (messageData.to_id === chatId && messageData.from_id === myId)
        ) {
            setChat(prev => [...prev, messageData]);
        }
    };

    return (
        <section style={{backgroundColor: "#CDC4F9"}}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" id="chat3" style={{borderRadius: "15px"}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                                        <div className="p-3">
                                            <div className="input-group rounded mb-3">
                                                <input
                                                    type="search"
                                                    className="form-control rounded"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                />
                                                <span className="input-group-text border-0" id="search-addon">
                          <i className="fas fa-search"></i>
                        </span>
                                            </div>

                                            <div style={{position: "relative", height: "400px", overflowY: "auto"}}>
                                                <ul className="list-unstyled mb-0">
                                                    {[1, 2, 3].map((i) => (
                                                        <li className="p-2 border-bottom" key={i}>
                                                            <a
                                                                href="#!"
                                                                className="d-flex justify-content-between"
                                                                onClick={() => {
                                                                    setCurrentChatId(i);
                                                                    setChat([]);
                                                                }}
                                                            >
                                                                <div className="d-flex flex-row">
                                                                    <div>
                                                                        <img
                                                                            src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${i}-bg.webp`}
                                                                            alt="avatar"
                                                                            className="d-flex align-self-center me-3"
                                                                            width="60"
                                                                        />
                                                                        <span
                                                                            className="badge bg-success badge-dot"></span>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0">User {i}</p>
                                                                        <p className="small text-muted">Sample
                                                                            message...</p>
                                                                    </div>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="small text-muted mb-1">Time</p>
                                                                    <span
                                                                        className="badge bg-danger rounded-pill float-end">{i}</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-7 col-xl-8">
                                        <div className="pt-3 pe-3"
                                             style={{position: "relative", height: "400px", overflowY: "auto"}}>

                                            {currentChatId > 0 && chat.map((item, key) => (
                                                <div
                                                    className={`d-flex flex-row ${item.direction === 'in' ? "justify-content-start" : "justify-content-end"}`}
                                                    key={key}>
                                                    {item.direction === 'in' && (
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                            alt="avatar"
                                                            style={{width: "45px", height: "100%"}}
                                                        />
                                                    )}
                                                    <div>
                                                        <p
                                                            className={`small p-2 ${item.direction === 'in' ? "ms-3" : "me-3"} mb-1 rounded-3 ${
                                                                item.direction === 'in' ? "bg-body-tertiary" : "bg-primary text-white"
                                                            }`}
                                                        >
                                                            {item.message}
                                                        </p>
                                                        <p className={`small ${item.direction === 'out' ? "ms-3" : "me-3"} mb-3 rounded-3 text-muted float-end`}>
                                                            12:00 PM | Aug 13
                                                        </p>
                                                        <p className={`small ${item.direction === 'out' ? "ms-3" : "me-3"} mb-3 rounded-3 text-muted float-end`}>
                                                            {item.status}
                                                        </p>

                                                    </div>
                                                    {item.direction === 'out' && (
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                            alt="avatar"
                                                            style={{width: "45px", height: "100%"}}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                            }

                                        </div>

                                        <div
                                            className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                alt="avatar"
                                                style={{width: "40px", height: "100%"}}
                                            />
                                            <form onSubmit={handleSendMessage}>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    className="form-control form-control-lg"
                                                    id="exampleFormControlInput2"
                                                    placeholder="Type message"
                                                />
                                            </form>
                                            <a className="ms-1 text-muted" href="#!">
                                                <i className="fas fa-paperclip"></i>
                                            </a>
                                            <a className="ms-3 text-muted" href="#!">
                                                <i className="fas fa-smile"></i>
                                            </a>
                                            <a className="ms-3" href="#!">
                                                <i className="fas fa-paper-plane"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
