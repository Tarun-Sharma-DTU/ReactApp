import React from "react";
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';

const Projects = () => {
  return (
    <div className="container-xxl py-6 pt-5" id="project">
      <div className="container">

        <div className="row g-5 mb-5 align-items-center wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6">
            <h1 className="display-5 mb-0">My Projects</h1>
          </div>
          <div className="col-lg-6 text-lg-end">
            <ul className="list-inline mx-n3 mb-0" id="portfolio-flters">
              <li className="mx-3 active" data-filter="*">All Projects</li>
              <li className="mx-3" data-filter=".first"></li>
              <li className="mx-3" data-filter=".second"></li>
            </ul>
          </div>
        </div>

        <div className="row g-4 portfolio-container wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-4 col-md-6 portfolio-item first">
            <div className="portfolio-img rounded overflow-hidden">
              <img className="img-fluid" src="img/HideNReveal.webp" alt="Project 1" />
              <div className="portfolio-btn">
                <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href="http://16.171.134.100">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item second">
            <div className="portfolio-img rounded overflow-hidden">
              <img className="img-fluid" src="img/IAmScrappy.webp" alt="Project 2" />
              <div className="portfolio-btn">
                <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href="http://16.171.134.100:3001/">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item second">
            <div className="portfolio-img rounded overflow-hidden">
              <img className="img-fluid" src="img/blinkchat.webp" alt="Project 2" />
              <div className="portfolio-btn">
                <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href="http://16.171.134.100:3000/">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
          </div>



          {/* Add more project items here */}
        </div>

      </div>
    </div>
  );
};

export default Projects;
