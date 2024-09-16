import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UserBox = (props) => {
    const client = props.name;
    const navigate = useNavigate();
    const location = useLocation();
    // const {username} = location.state || {};
    const username = localStorage.getItem('username');


    const handleNavigate = () => {

        navigate('/chating', {
          state: {
            client, username,
          },
        });
    };

    const deleteclient = async () => {
        const payload = {
            username: username,
            client: client
        };

        console.log('Payload:', payload); // Log the payload
        
        try {
            const response = await fetch('http://16.171.134.100:8080/deleteClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });



            console.log('Response status:', response.status); // Log the response status
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }



    return (<>
        <div className='row chatbox' onClick={handleNavigate}>
            <div className='col-3'>
                {/* <img src='./img/user.webp' className='rounded-circle my-2' width='60' /> */}
                <img className='my-2'
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 3"
                    style={{ width: '50px', height: '65%', marginTop:'3px' }}
                  />
            </div>

            <div className='col-9'>
                <div className='font-weight-bold text-light '><h4 className='text-black name'>{props.name}</h4></div>
                <p className='secret'>Secret Message</p>
            </div>

            {/* <div className='col-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-circle my-4" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
            </div> */}
        </div>
        <div onClick={deleteclient} className='col-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill delete" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
                </div>
        </>
    );
};

export default UserBox;