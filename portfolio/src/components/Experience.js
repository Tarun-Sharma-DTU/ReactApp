import React from 'react';
import { useState } from 'react';


const SkillsExperience = () => {
    const [flag, setFlag] = useState(false);
    const [isactive, setIsactive] = useState("active");

    const IsExperience = () => {
        setFlag(!flag);
    }

  return (
    <div className="container-xxl py-5 pb-5" id="skill">
      <div className="container">
        <div className="row g-5">
          
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="display-5 mb-5">Skills & Experience</h1>
            <p className="mb-4">
            I am highly skilled in Java, Spring Boot, System Design, and React.js, with strong experience in building scalable back-end services, designing efficient systems, and creating dynamic front-end applications. I also excel in API development, microservices, and database management.
            </p>
            <h3 className="mb-4">My Skills</h3>
            <div className="row align-items-center">
              <div className="col-md-6">
                <SkillProgressBar skill="Java" percentage="98%" color="primary" />
                <SkillProgressBar skill="SpringBoot" percentage="95%" color="warning" />
                <SkillProgressBar skill="REST APIs" percentage="90%" color="danger" />
                <SkillProgressBar skill="OOPs" percentage="90%" color="secondary" />
              </div>
              <div className="col-md-6">
                <SkillProgressBar skill="React.Js" percentage="90%" color="danger" />
                <SkillProgressBar skill="System Design" percentage="85%" color="dark" />
                <SkillProgressBar skill="MicroServices" percentage="90%" color="info" />
                <SkillProgressBar skill="DBMS" percentage="90%" color="secondary" />
              </div>
            </div>
          </div>

          
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <ul className="nav nav-pills rounded border border-2 border-primary mb-5">
              <li className="nav-item w-50">
                <button className={"nav-link w-100 py-3 fs-5 "+ (flag?(!isactive):(isactive))} onClick={IsExperience}>
                  Experience
                </button>
              </li>
              <li className="nav-item w-50">
                <button className={"nav-link w-100 py-3 fs-5 "+ (flag?(isactive):(!isactive))} onClick={IsExperience}>
                  Education
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className={"tab-pane fade show p-0 " + (flag?(!isactive):(isactive))}>
                <div className="row gy-5 gx-4">
                  <ExperienceItem title="Software Developer" company="Search Combat" yearRange="May 2023 - July 2024" />
                  <ExperienceItem title="SDE Intern" company="Secvolt" yearRange="September 2022- February  2023" />
                  <ExperienceItem title="Web Developer" company="Uplink Digital" yearRange="February 2021 - August 2021" />
                </div>
              </div>
              <div id="tab-2" className={"tab-pane fade show p-0 "+ (flag?(isactive):(!isactive))}>
                <div className="row gy-5 gx-4">
                  <ExperienceItem title="BTech (Information Technology)" company="Delhi Technological University" yearRange="2020 - 2024" />
                  <ExperienceItem title="11th - 12th (PCM)" company="Rajkiya Pratibha Vikas Vidyalaya" yearRange="2017 - 2019" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const SkillProgressBar = ({ skill, percentage, color }) => (
  <div className="skill mb-4">
    <div className="d-flex justify-content-between">
      <h6 className="font-weight-bold">{skill}</h6>
      <h6 className="font-weight-bold">{percentage}</h6>
    </div>
    <div className="progress">
      <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: percentage }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
);

const ExperienceItem = ({ title, company, yearRange }) => (
  <div className="col-sm-6">
    <h5>{title}</h5>
    <hr className="text-primary my-2" />
    <p className="text-primary mb-1">{yearRange}</p>
    <h6 className="mb-0">{company}</h6>
  </div>
);

export default SkillsExperience;
