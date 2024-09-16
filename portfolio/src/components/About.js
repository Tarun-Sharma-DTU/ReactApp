import React from 'react';

const About = () => {
  return (
    <div className="container-xxl pb-5" id="about">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="d-flex align-items-center mb-5">
              <div className="years flex-shrink-0 text-center me-4">
                <h1 className="display-1 mb-0">1</h1>
                <h5 className="mb-0">Year</h5>
              </div>
              <h3 className="lh-base mb-0">
                of working experience as a Software Developer
              </h3>
            </div>
            <p className="mb-4">
            Enthusiastic Software Engineer with expertise in Java, Spring Boot, and ReactJS. 
            Currently driving impactful projects at Search Combat, where I apply
            advanced Data Structures and Algorithms (DSA) and Object-Oriented
            Programming (OOP) to build efficient, scalable solutions. Experienced in full
            stack development and basic DevOps practices, with a solid foundation in
            modern software development.
            Previously interned at SecVolt, where I contributed to high-impact projects,
            enhancing my skills in software design and implementation. Passionate about
            leveraging my technical skills and problem-solving abilities to create innovative
            software solutions.
            </p>
            <a className="btn btn-primary py-3 px-5 mt-3" href="https://wa.link/wmexon">
              Whatsapp Me
            </a>
          </div>

          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <img className="img-fluid rounded" src="img/Softwaredev.webp" alt="About 1" />
              </div>
              <div className="col-sm-6">
                <img className="img-fluid rounded" src="img/skillshow.webp" alt="About 2" />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <h4 className="border-end pe-3 me-3 mb-0">Working as a Leader</h4>
              <h5 className="text-primary fw-bold mb-0" data-toggle="counter-up">
              Guide with vision, inspire action
              </h5>
            </div>
            <p className="mb-4">
            Worked as a software developer in a company, where I also led a team. My leadership focused on guiding the team to deliver top-notch results, ensuring collaboration and efficiency in every project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
