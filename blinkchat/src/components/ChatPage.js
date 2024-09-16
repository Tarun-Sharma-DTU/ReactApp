import React, { useEffect, useState, useRef } from 'react';
import './css/main.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const [allMessages, setAllMessages] = useState([]); 
  const [tempmsg, setTempMsg] = useState(Array(6).fill([]));
  const [currentMsg, setCurrentMsg] = useState("");
  const location = useLocation();
  const { client } = location.state || {};
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    if(window.innerWidth < 768){
      
    }else{
      alert("Please Use SmartPhone. Desktop Version is not Supported.");
      navigate('/desktop_chat');
    }
  }, []);
  
  // Ref to scroll to the bottom
  const bottomRef = useRef(null);

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Function to fetch messages from the server
  const handleMessageFetch = async () => {
    const payload = { reciever: username, client: client };

    try {
      const response = await fetch('http://16.171.134.100:8080/getMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        const newMessages = responseData.response;

        console.log('Fetched messages:', newMessages);

        if (Array.isArray(newMessages)) {
          const newFlags = newMessages.map(message => ({ message, isSentByUser: false }));
          setAllMessages(prevMessages => [...prevMessages, ...newFlags]);
        } else {
          console.error('Fetched messages are not an array:', newMessages);
        }
      } else {
        console.error('Response not OK:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    handleMessageFetch();
    const interval = setInterval(() => {
      handleMessageFetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to the bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  // Function to handle message input changes
  const handleChange = (e) => {
    setCurrentMsg(e.target.value);
  };

  // Function to send message to the server
  const handleSend = async () => {
    if (!currentMsg.trim()) return;

    const payload = {
      reciever: client,
      sender: username,
      message: currentMsg
    };

    try {
      const response = await fetch('http://16.171.134.100:8080/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAllMessages(prevMessages => [...prevMessages, { message: currentMsg, isSentByUser: true }]);
        setCurrentMsg(""); 
      } else {
        console.error('Response not OK:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Listen for Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // to delete msg in 1 min
  useEffect(() => {
    const interval = setInterval(() => {
      setAllMessages([]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="chatpage">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <div className="card" id="chat2">

              <div className="row chatheader">
                <div className="col-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-skip-backward-fill"
                    onClick={goBack}
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/>
                  </svg>
                </div>
                <div className="col-5"><h5>BlinkChat</h5></div>
                <div className="col-5"><h5 className="mb-0 text-success">{client}</h5></div>
              </div>

              <div className="card-body">
                {tempmsg.map((messageObj, index) => (
                    <div className={`d-flex flex-row  justify-content-end mb-4 pt-1`}>
                    <div>
                      <p className={`small p-2 bg-transparent'}`}>
                        
                      </p>
                    </div>
                  </div>
                ))}

                {allMessages.map((messageObj, index) => (
                  <div key={index} className={`d-flex flex-row ${messageObj.isSentByUser ? 'justify-content-end' : 'justify-content-start'} mb-4 pt-1`}>
                    <div>
                      <p className={`small p-2 ${messageObj.isSentByUser ? 'me-3 text-white rounded-3 bg-primary' : 'ms-3 rounded-3 bg-body-tertiary bg-secondary'}`}>
                        {messageObj.message}
                      </p>
                    </div>
                  </div>
                ))}
                {/* This ref ensures that the chat always scrolls to the bottom */}
                <div ref={bottomRef} />
              </div>

              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar"
                  style={{ width: '40px', height: '100%' }}
                />
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Type message"
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  value={currentMsg}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleSend}
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
