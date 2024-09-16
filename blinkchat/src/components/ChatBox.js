import React, { useEffect } from 'react';
import UserBox from './UserBox';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ChatBox = () => {
    const [messages, setMessages] = React.useState([]);
    // const [username, setUsername] = React.useState('XYZ');
    const location = useLocation();
    // const {username} = location.state || {};
    const username = localStorage.getItem('username');
    const [client, setClient] = React.useState('');
    const navigate = useNavigate();

    const checklogin = () => {
        if (localStorage.getItem('login') === 'false') {
            navigate('/');
        }
    }

    useEffect(() => {
      if(window.innerWidth < 768){
        
      }else{
        alert("Please Use SmartPhone. Desktop Version is not Supported.");
        navigate('/desktop_chat');
      }
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            checklogin();
            handleload(); 
        }, 1000);
    
        return () => clearInterval(interval);
      }, []); 


    const clientchange = (e)=>{
        setClient(e.target.value);
    }

    const handleNavigate = () => {

        navigate('/chating', {
          state: {
            client, username,
          },
        });
    };

    const handleload = async () => {
       
        const payload = {
            username: username
        };
        
        console.log('Payload:', payload); // Log the payload
        
        try {
            const response = await fetch('http://16.171.134.100:8080/getChats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            });
        
            console.log('Response status:', response.status); // Log the response status
        
            if (response.ok) {
            const responseData = await response.json();
            console.log('Response data:', responseData.response); // Log the response data
            // const parsedArray = JSON.parse(responseData.response);
            setMessages(responseData.response);      
            console.log(messages);          
            // Handle the response data as needed
            } else {
            
            }
        } catch (error) {
            console.error('Error:', error);
            
        } finally {
            
        }
        };

        useEffect(() => {
            handleload();
        }, []);



        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
              handleNavigate();
            }
          };

    

    return (
        <div className='chatbox'>
            <Header />

            <div  className="search-bar text-muted d-flex justify-content-start align-items-center p-3">
                  
                  <input
                    type="text"
                    className="form-control form-control-lg-chatbox"
                    id="exampleFormControlInput1"
                    placeholder="Type Username To Msg"
                    value={client}
                    onKeyDown={handleKeyPress}
                    onChange={clientchange}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={handleNavigate}  width="35" height="35" fill="currentColor" class="bi ml-3 bi-send send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
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

            <div className='box'>
            {messages.map((message, index) => (
                <UserBox name={message} username={username}/>
            ))}
            </div>
        </div>
    );
};

export default ChatBox;