'use client';
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useSearchParams  } from 'next/navigation'

export default function Chat() {

  const searchParams = useSearchParams()
  const username = searchParams.get('name');
  const gender = searchParams.get('gender');

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [needToFetch, setNeedToFetch] = useState(true);

  useEffect(() => {
    const listenStorageChange = () => {
      let storageMessages = JSON.parse(localStorage.getItem("messages"));
      if (storageMessages) {
        if (storageMessages.length != chatMessages.length) {
          setChatMessages(storageMessages);
        }
      } else {
        setChatMessages([]);
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  });

  useEffect(() => {
    if (needToFetch) {
      let storageMessages = JSON.parse(localStorage.getItem("messages"));
      if (storageMessages && storageMessages.length > 0) {
        setChatMessages(JSON.parse(localStorage.getItem("messages")));
        setNeedToFetch(false)
      }
    }
  }, [needToFetch]);

  const inputHandler = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message != "") {
      let messagesList = chatMessages;

      messagesList.push({
        "from": username,
        "message": message
      })
      
      localStorage.setItem("messages", JSON.stringify(messagesList))
      setChatMessages(messagesList)
      setNeedToFetch(true)
      setMessage("")
    }
  };

  return (
    <main className={styles.main}>
      <div className="app">
        <div className="col-sm-12 conversation">
          <div className="row heading">
            <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
              <div className="heading-avatar-icon">
                {(gender == 1) ? <img src="https://bootdey.com/img/Content/avatar/avatar8.png" /> : <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />}
                
              </div>
            </div>
            <div className="col-sm-8 col-xs-7 heading-name">
              <a className="heading-name-meta">{username}</a>
            </div>
            <div className="col-sm-1 col-xs-1  heading-dot pull-right">
              <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
            </div>
          </div>

          <div className="message" id="conversation">
            <p className="text-center">Load previous message</p>
            {chatMessages.map((value, index) => {
              if (value.from == username) {
                return <div className="message-body" key={index}>
                  <div className="col-sm-12 message-main-sender">
                    <div className="sender">
                      <div className="message-text">
                        {value.message}
                      </div>
                      <span className="message-time pull-right">
                        {value.from}
                      </span>
                    </div>
                  </div>
                </div>
              } else {
                return <div className="message-body" key={index}>
                  <div className="col-sm-12 message-main-receiver">
                    <div className="receiver">
                      <div className="message-text">
                        {value.message}
                      </div>
                      <span className="message-time pull-right">
                        {value.from}
                      </span>
                    </div>
                  </div>
                </div>
              }
            })}
          </div>

          <div className="row reply">
            <div className="col-sm-9 col-xs-9 reply-main">
              <input className="form-control" rows="1" id="comment" onKeyUp={inputHandler} onChange={inputHandler} value={message} />
            </div>
            <div className="col-sm-1 col-xs-1">
              <button type="button" className="btn btn-primary" onClick={sendMessage}>SEND</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}