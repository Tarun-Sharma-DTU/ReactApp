import React from 'react';
import './css/HomePage.css';
import encrytimage from './images/EncryptedText.gif';
import design1 from './images/1.gif';
import design2 from './images/2.gif';
import design3 from './images/3.gif';
import design4 from './images/4.gif';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='container'>
            <div className='info'>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <h1 className='mainheading' id='mainheading1'>IAmScrappy</h1>
                    <p>A powerful web app for extracting emails, links, images, headings, tags, and more, with advanced content analysis tools.</p>
                    <Link to="/scrap_emails_and_phone"><button className='button'>Lets Scrap</button></Link>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <img src='./img/IAmScrappy.webp' cssName='img-fluid' className='img-fluid' alt='developer' style={{borderRadius:"20px", height:'400px', width:'400px'}}/>
                </div>
            </div>

            <div className='row about'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>About IAmScrappy</h2>
                    
                    <p><strong>IAmScrappy</strong> is a powerful web scraping and content analysis tool designed to make data extraction effortless. From emails to links, images to social tags, it scrapes key information from any website while offering advanced tools for analyzing web content quality.</p>

                    <ul>
                    <li>Email and Phone Number Extraction: Easily extract all email addresses and phone numbers from any website.</li>
                    <li>Link Scraping: Gather all website links, including internal and external, along with anchor tags.</li>
                    <li>Headings and Images: Retrieve all headings (H1, H2, H3) and images for detailed content insight.</li>
                    <li>Social Media Links: Collect social media links embedded in the website.</li>
                    <li>Duplicate Content Check: Analyze web pages to detect duplicate content and ensure uniqueness.</li>
                    <li>Keyword Stuffing Analysis: Identify and analyze keyword stuffing to optimize content for SEO.</li>
                    <li>User-Friendly Interface: Simple, intuitive interface for easy navigation and data extraction.</li>
                    </ul>

                </div>
            </div>

            <div className='row features'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>Features You Got Here</h2>
                </div>
            </div>

            <div className=''>
                <div className='col-lg-6 col-md-5 col-sm-5 featureimagescol'>
                    <img src='./img/scrap.webp' className='img-fluid featureimages' style={{borderRadius:"20px"}} alt='feature1'/>
                    <p className='ptext '>Scratch Everything You Need</p>
                </div>
                <div className='col-lg-6 col-md-5 col-sm-5 featureimagescol'>
                    <img src='./img/tools.webp' className='img-fluid featureimages' style={{borderRadius:"20px"}} alt='feature2'/>
                    <p className='ptext'>Advanced Tools To Analyse Your Website</p>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>How To Scrap & Use Advanced Tools?</h2>
                </div>
            </div>

            <div className='youtube'>
                <iframe className='youtubevideo'
                    width='80%'
                    height='600px'
                    src='https://www.youtube.com/embed/CKHS6TsXMxw?si=7hz95Dr-Hh_dLzAe'
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe>
            </div>

        </div>
    );
};

export default HomePage;