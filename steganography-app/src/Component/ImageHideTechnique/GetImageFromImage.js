import React, { useState, useRef } from 'react';
import './css/ImageInImage.css';
import download from './images/download.webp';
import submit from './images/submit.webp';

const HideImageInImage = () => {
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [secretImage, setSecretImage] = useState(null);
  const [pdfimage, setPdfImage] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('Encrypted Image');
  const fileInputRefCoverImage = useRef(null);
  const fileInputRefSecretImage = useRef(null);
  const [isdownload, setIsDownload] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issubmit, setIsSubmit] = useState(false);
    const [isadded, setIsAdded] = useState(false);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setIsAdded(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const triggerFileInputClickCoverImage = () => {
    fileInputRefCoverImage.current.click();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!coverImage) {
      alert('Please provide both image and Pdf.');
      return;
    }

    setLoading(true);

    const base64CoverImage = coverImage.split(',')[1];
    const payload = {
        stegoImage: base64CoverImage
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100/extractImageFromImage', {
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
        setSecretImage(`data:image/png;base64,${responseData.extractedImage}`);
        setIsSubmit(true);
        setIsAdded(false);
        setIsDownload(true);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.message || 'Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
        setLoading(false); // Hide loader
      }
  };

  const downloadSecretImage = () => {
    const link = document.createElement('a');
    link.href = secretImage;
    link.download = 'encoded_pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='backbody'>
        <div className="container">
            
         <input type="file" accept="image/*" onChange={handleCoverImageChange} ref={fileInputRefCoverImage} style={{ display: 'none' }}/>
         
         
          <div className="col-lg-6 col-md-12 col-sm-12 section1">
            {!issubmit && 
        <div className="image-in-image-section">
            <h3 className=''>{heading}</h3>
          {/* <h2 className="image-heading">{heading}</h2> */}
          <div className="row justify-content-center">
            <div className="col-6">
          {coverImage ? (
            <img src={coverImage} alt="Result" onClick={triggerFileInputClickCoverImage} className='image-in-image-get' />
          ) : (
            <div className="placeholder-image-in-image-get" onClick={triggerFileInputClickCoverImage}>CLick Here To Cover Image</div>
          )}
          </div>
          </div>
        </div>
        }

<div className="row justify-content-center">
       {isadded && <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Submit" /> }
        {loading && (
        <div id="preloader">
        <div id="loader"></div>
        </div>) }
      </div>

      </div>

      <div className="col-lg-6 col-md-12 col-sm-12 section2">
        { issubmit &&
        <div className="image-in-image-section">
        <h3 className=''>Secret Image</h3>
          <div className="row justify-content-center">
            <div className="col-6">
          {secretImage ? (
            <img src={secretImage} alt="Result"className='image-in-image-get' />
          ) : (
            <div className="placeholder-image-in-image-get"></div>
          )}
          </div>
          </div>
        </div>
        }

        <div className="row justify-content-center">
            
            {
             isdownload && <img src={download} onClick={downloadSecretImage} className="image-button-get" alt="Download" />
            }
           </div>
      </div>


      </div>
    </div>
  );
};

export default HideImageInImage;