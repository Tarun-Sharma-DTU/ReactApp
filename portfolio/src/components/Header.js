import React, { useEffect } from 'react';
import Typed from 'typed.js';

const Header = () => {
  useEffect(() => {
    const options = {
      strings: ['Software Developer', 'Java Developer', 'Full-Stack Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed('.typed-text-output', options);

    // Cleanup function to destroy the instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="container-fluid bg-light my-6 mt-0" id="home">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 py-6 pb-0 pt-lg-0">
            <h3 className="text-primary mb-3">I'm</h3>
            <h1 className="display-3 mb-3">Tarun Sharma</h1>
            <h2 className="typed-text-output d-inline"></h2>
            <div className="typed-text d-none">Software Developer, Java Developer, Full-Stack Developer</div>
            <div className="d-flex align-items-center pt-5">
              <a href="https://drive.google.com/file/d/14P3pCQNAWrx2wykJKM0H6wlZPpCQWReC/view?usp=sharing" className="btn btn-primary py-3 px-4 me-5">Download CV</a>
            </div>
          </div>
          <div className="col-lg-6">
            <img className="img-fluid" src="./img/TarunSharmaImage.webp" alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;