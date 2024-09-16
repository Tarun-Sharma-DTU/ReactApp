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
                    <h1 className='mainheading' id='mainheading1'>HideNReveal</h1>
                    <p>A steganography app for hiding and revealing secret messages in images, pdf, audio, video.</p>
                    <Link to="/hidetextinimage"><button className='button'>Lets HideNReveal</button></Link>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <img src={encrytimage} className='img-fluid' alt='developer' />
                </div>
            </div>

            <div className='row about'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>About HideNReveal</h2>
                    <p className='d-flex justify-content-center'>HideNReveal is a powerful steganography app that allows you to hide and reveal secret messages in various types of files, including images, PDFs, audio, and video files. With HideNReveal, you can securely communicate and share sensitive information without arousing suspicion.</p>
                    <ul className='text' id="about">
                        <li>Image Steganography: Hide secret messages within images, making them virtually undetectable to the naked eye.</li>
                        <li>PDF Steganography: Conceal confidential information within PDF documents, ensuring only authorized individuals can access it.</li>
                        <li>Audio Steganography: Embed hidden messages within audio files, allowing for covert communication.</li>
                        <li>Video Steganography: Hide sensitive data within video files, providing an extra layer of security.</li>
                        <li>User-friendly Interface: HideNReveal offers a sleek and intuitive user interface, making it easy for users of all levels to navigate and utilize its features.</li>
                        <li>Secure Encryption: All hidden messages are encrypted using advanced encryption algorithms, ensuring the utmost security and protection.</li>
                        <li>Decryption: Easily reveal hidden messages from files that have been encoded with HideNReveal.</li>
                        <li>Multi-platform Support: HideNReveal is compatible with various operating systems, including Windows, macOS, and Linux.</li>
                    </ul>
                </div>
            </div>

            <div className='row features'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>Features You Got Here</h2>
                </div>
            </div>

            <div className=''>
                <div className='col-lg-3 col-md-5 col-sm-5 featureimagescol'>
                    <img src={design1} className='img-fluid featureimages' alt='feature1'/>
                    <p className='ptext '>Hide Text in Image</p>
                </div>
                <div className='col-lg-3 col-md-5 col-sm-5 featureimagescol'>
                    <img src={design2} className='img-fluid featureimages' alt='feature2'/>
                    <p className='ptext'>Hide Images, Text, Audio, Video in Pdf</p>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6 featureimagescol'>
                    <img src={design3} className='img-fluid featureimages' alt='feature3'/>
                    <p className='ptext'>Hide Text, Images, Pdfs, in Audio</p>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6 featureimagescol'>
                    <img src={design4} className='img-fluid featureimages' alt='feature4'/>
                    <p className='ptext'>Hide Images, Text, Pdfs, Audio in Video</p>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <h2 className='d-flex justify-content-center'>How To Encrypt & Decrypt?</h2>
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