import React, { useState, useRef, useEffect } from 'react';
import './css/ImageTextForm.css';
import download from './images/download.png';
import submit from './images/submit.webp';
import stand from './images/stand.webp';
const apiUrl = process.env.REACT_APP_API_URL;

const ImageTextForm = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('Current Image'); 
  const fileInputRef = useRef(null);
  const [isdownload, setIsDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
  
    if (!image || !text) {
      alert('Please provide both image and text.');
      return;
    }
  
    setLoading(true); // Show loader
  
    const base64Image = image.split(',')[1];
    const payload = {
      image: base64Image,
      text: text,
    };
  
    console.log('Payload:', payload); // Log the payload
  
    try {
      const response = await fetch('http://16.171.134.100:8080/hideTextInImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      console.log('Response status:', response.status); // Log the response status
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData); // Log the response data
        setHeading('Encoded Image');
        setImage(`data:image/png;base64,${responseData.image}`);
        setIsDownload(true);
        setIsSubmit(true);
        // Handle the response data as needed
      } else {
        setError('Failed to encode image.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while encoding the image.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'encoded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // if (isMobile) {
  //   return (
  //     <div className="mobile-message">
  //       <h1>This website is optimized for desktop view.</h1>
  //     </div>
  //   );
  // }

  return (
        <div className="container">

          <div className="col-lg-6 col-md-12 col-sm-12 section1">
        <div className="image-section">
          {/* <h2 className="image-heading">{heading}</h2> */}
          <div className="row justify-content-center box">
          {image ? (
            <img src={image} alt="Result" onClick={triggerFileInputClick} className='image-text' />
          ) : (
            <div className="placeholder-text" onClick={triggerFileInputClick}>CLick Here To Upload Image</div>
          )}
         </div>
         
        </div>
        <div className="row justify-content-center">
          <img src={stand} className='stand'/>
            
           {
            isdownload && <img src={download} onClick={downloadImage} className="image-button" alt="Download" />
           }
          </div>
      </div>


      <div className="col-lg-6 col-md-12 col-sm-12 section2">
        {!isSubmit &&
        <div className="form-section">
          <div className=''>
          <h1 className=''>Enter Text To Hide in Image</h1>
          <form>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }}/>
            <div className="form-group">
              <label htmlFor="text"></label>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                draggable="true"
                rows="4"
                cols="50"
              />
            </div>
          
            <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Submit" />
            {loading && (
      <div id="preloader">
      <div id="loader"></div>
    </div>) }
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
        </div> }
      </div>


      </div>
  );
};

export default ImageTextForm;