import React, {useEffect, useRef, useState} from "react";

// const websocket = new WebSocket('ws://localhost:8080');


export default function ChatSection() {
    const connection = useRef(null);
    const [message, setMessage] = useState("");
    const currentChatId = useRef(0);
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

            handleAppendMessage(currentChatId.current.toString(), receivedData)
        })

        connection.current = socket

        return () => connection.current.close()
    }, [])

    // useEffect(() => {
    //     socket.current.send(JSON.stringify({
    //         type: 'my_id',
    //         value: localStorage.getItem('user_id'),
    //     }))
    // }, [])
    //
    // useEffect(() => {
    //     socket.current.onmessage = (event) => {
    //         const receivedData = JSON.parse(event.data);
    //
    //         handleAppendMessage(receivedData)
    //     };
    // })

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentChatId.current > 0) {
            connection.current.send(JSON.stringify({
                type: 'message',
                from_id: localStorage.getItem('user_id'),
                to_id: currentChatId.current.toString(),
                message: message,
            }))

            setMessage("");
        }
    }

    const handleAppendMessage = (chatId: string, messageData) => {
        console.log(chatId, messageData)
        if (messageData.from_id == chatId || messageData.to_id == chatId) {
            chat.push(messageData)
        }
    }

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
                                                                onClick={(e) => currentChatId.current = i}
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
