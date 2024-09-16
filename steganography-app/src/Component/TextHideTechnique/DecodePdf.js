import React, { useState, useRef } from 'react';
import './css/ImageTextForm.css';
import './css/DecodePdf.css';
import submit from './images/submit.webp';
import enpdf from './images/enpdf.webp';

const DecodePdf = () => {
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [sendPdf, setSendPdf] = useState(null);
  const [decodedMsg, setDecodedMsg] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const fileInputRef = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [decodeHeading, setDecodeHeading] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSendPdf(file);
      setIsSubmit(true);
      setDecodeHeading('');
      setDecodedMsg('');
      setImage(enpdf);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!sendPdf) {
      alert('Please provide a PDF');
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Pdf = reader.result.split(',')[1];
      const payload = {
        pdf: base64Pdf
      };

      console.log('Payload:', payload); // Log the payload

      try {
        const response = await fetch('http://16.171.134.100:8080/extractTextFromPdf', {
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
          setDecodeHeading('Decoded Text From PDF');
          
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
    reader.readAsDataURL(sendPdf); // Corrected argument
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="backbody">
      <div className="container">
          <div className="col-lg-12 col-md-12 col-sm-12 section1">
            <div className="image-section">
              <div className="row justify-content-center">
                <div className="col-6">
                {image ? (
                        <img src={image} alt="Result" onClick={triggerFileInputClick} className='image-decode-pdf' />
                    ) : (
                        <div className="placeholder_decode" onClick={triggerFileInputClick}>CLick Here To Upload Pdf</div>
                    )}
                </div>
              </div>
            </div>

            <form>
              <div className="row form-group justify-content-center">
                <input type="file" id="pdf" accept="application/pdf" onChange={handlePdfChange} ref={fileInputRef} style={{ display: 'none' }} />
                {isSubmit && <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Submit" />}
                {loading && (
      <div id="preloader">
      <div id="loader"></div>
    </div>) }
              </div>
            </form>
          </div>

          <div className="row justify-content-center">
          <h2 className='decode-heading '>{decodeHeading}</h2>
        </div>
        <div className="row justify-content-center mt-2">
          <p className=''>{decodedMsg}</p>        
      </div>
        </div>
        </div>
  );
};

export default DecodePdf;