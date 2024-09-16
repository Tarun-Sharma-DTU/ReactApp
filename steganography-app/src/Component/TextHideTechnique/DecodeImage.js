import React, { useState, useRef } from 'react';
import './css/ImageTextForm.css';
import './css/DecodeImage.css';
import submit from './images/submit.webp';

const DecodeImage = () => {
  const [image, setImage] = useState(null);
  const [sendimage, setSendImage] = useState(null);
  const [decodedMsg, setDecodedMsg] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [flag, setFlag] = useState(false);
  const fileInputRef = useRef(null);
  const [issubmit, setIsSubmit] = useState(false);
  const [decodeheading, setDecodeHeading] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSendImage(file);
      setIsSubmit(true);
      setDecodeHeading('');
      setDecodedMsg('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!sendimage) {
      alert('Please provide image');
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      const payload = {
        image: base64Image
      };

      console.log('Payload:', payload); // Log the payload

      try {
        const response = await fetch('http://16.171.134.100:8080/extractTextFromImage', {
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
          setHeading('Decoded Message');
          setDecodedMsg(responseData.text);
          setIsSubmit(false);
          setDecodeHeading('Decoded Text From Image');
          
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
    reader.readAsDataURL(sendimage); // Corrected argument
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="backbody">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col section1">
      <div className="image-section">
          <div className="row justify-content-center">
            <div className="col-6">
          {image ? (
            <img src={image} alt="Result" onClick={triggerFileInputClick} className='image-decode' />
          ) : (
            <div className="placeholder_decode" onClick={triggerFileInputClick}>CLick Here To Upload Image</div>
          )}
          </div>
          </div>
        </div>

        <form>
          <div className="row form-group justify-content-center">
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
          
          {issubmit && <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Download" />}
          {loading && (
      <div id="preloader">
      <div id="loader"></div>
    </div>) }
          </div>
        </form>


      </div>
      </div>
      <div className="row justify-content-center">
        <h2 className='decode-heading'>{decodeheading}</h2>
        </div>
        <div className="row justify-content-center mt-2">
        <p className=''>{decodedMsg}</p>        
      </div>
      </div>
    </div>
  );
};

export default DecodeImage;