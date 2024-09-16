import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [cpasswd, setcPasswd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(window.innerWidth < 768){
      
    }else{
      alert("Please Use SmartPhone. Desktop Version is not Supported.");
      navigate('/desktop_chat');
    }
  }, []);


  const checklogin = () => {
        if (localStorage.getItem('login') === 'true') {
            setUserName(localStorage.getItem('username'));
            handleNavigate();
        }else{
            
        }
    }

    useEffect(() => {
        checklogin();
    }, []);

  const namechange = (e) => {
    setUserName(e.target.value);
  };

  const passchange = (e) => {
    setPasswd(e.target.value);
  };

  const cpasschange = (e) => {
    setcPasswd(e.target.value);
  };

  const handleNavigate = () => {
    navigate('/chats', {
      state: {
        username,
      },
    });
  };

  const signin = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    
    const payload = {
      username,
      password: passwd,
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/login', {
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
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', username);
        handleNavigate();
      } else {
        alert("Please Enter Valid Username & Password!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signup = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    if (passwd !== cpasswd) {
      alert("Please Enter Same Password");
      return;
    }

    const payload = {
      username,
      password: passwd,
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/createUser', {
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
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', username);
        handleNavigate();
      } else {
        alert("UserName Already Exists. Please Enter Other.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container py-5 bg-transparent">
      <ul className="nav nav-pills nav-justified mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
            aria-selected={activeTab === "login"}
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
            aria-selected={activeTab === "register"}
          >
            Register
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === "login" && (
          <div className="tab-pane fade show active" role="tabpanel">
            {/* Login Form */}
            <form onSubmit={signin}>
              <div className="text-center mb-3">
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  onChange={namechange}
                  value={username}
                  id="loginName"
                  className="form-control"
                />
                <label className="form-label" htmlFor="loginName">
                  Username
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  value={passwd}
                  onChange={passchange}
                  id="loginPassword"
                  className="form-control"
                />
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>

              <div className="text-center">
                <p>
                  Not a member? <a href="#!" onClick={() => setActiveTab("register")}>Register</a>
                </p>
              </div>
            </form>
          </div>
        )}

        {activeTab === "register" && (
          <div className="tab-pane fade show active" role="tabpanel">
            {/* Register Form */}
            <form onSubmit={signup}>
              <div className="text-center mb-3">
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="registerUsername"
                  onChange={namechange}
                  value={username}
                  className="form-control"
                />
                <label className="form-label" htmlFor="registerUsername">
                  Username
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  value={passwd}
                  onChange={passchange}
                  id="registerPassword"
                  className="form-control"
                />
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
              </div>

              {/* Repeat Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  value={cpasswd}
                  onChange={cpasschange}
                  id="registerRepeatPassword"
                  className="form-control"
                />
                <label className="form-label" htmlFor="registerRepeatPassword">
                  Repeat password
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-3">
                Sign up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
