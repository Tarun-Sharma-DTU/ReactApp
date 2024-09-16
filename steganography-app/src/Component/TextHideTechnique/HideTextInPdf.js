import React, { useState, useRef } from 'react';
import download from './images/download.webp';
import './css/ImageTextForm.css';
import enpdf from './images/enpdf.webp';
import orgpdf from './images/orgpdf.webp';
import './css/TextHideInAudio.css';
import submit from './images/submit.webp';
import stand from './images/stand.webp';

const ImageTextForm = () => {
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('Current PDF'); 
  const fileInputRef = useRef(null);
  const [isdownload, setIsDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(orgpdf);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdf(reader.result);
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

    if (!pdf || !text) {
      alert('Please provide both PDF and text.');
      return;
    }

    setLoading(true);

    const base64Pdf = pdf.split(',')[1];
    const payload = {
      pdf: base64Pdf,
      text: text,
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/hideTextInPdf', {
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
        setImage(enpdf);
        setIsDownload(true);
        setIsSubmit(true);
        setPdf(`data:application/pdf;base64,${responseData.pdf}`);
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

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'encoded_pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
        <div className="container">
            
            
            {/* <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="image-section">
                <div className="row justify-content-center box">
                  <div className="col-6">
                  {image ? (
                        <img src={image} alt="Result" onClick={triggerFileInputClick} className='image-text' />
                    ) : (
                        <div className="placeholder-text" onClick={triggerFileInputClick}>CLick Here To Upload Pdf</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
              <img src={stand} className='stand'/>
           {
            isdownload && <img src={download} onClick={downloadPdf} className="image-button" alt="Download" />
           }
          </div>
            </div> */}

            <div className="col-lg-6 col-md-12 col-sm-12 section1">
        <div className="image-section">
          {/* <h2 className="image-heading">{heading}</h2> */}
          <div className="row justify-content-center box">
          {image ? (
            <img src={image} alt="Result" onClick={triggerFileInputClick} className='image-text' />
          ) : (
            <div className="placeholder-text" onClick={triggerFileInputClick}>CLick Here To Upload Pdf</div>
          )}
         </div>
         
        </div>
        <div className="row justify-content-center">
          <img src={stand} className='stand'/>
            
           {
            isdownload && <img src={download} onClick={downloadPdf} className="image-button" alt="Download" />
           }
          </div>
      </div>



            <div className="col-lg-6 col-md-12 col-sm-12 section2">
                {!isSubmit &&
              <div className="form-section">
                <h1  className=''>Enter Text To Hide in PDF</h1>
                <form>
                  <input type="file" accept="application/pdf" onChange={handlePdfChange} ref={fileInputRef} style={{ display: 'none' }} />
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
              </div>}
            </div>


        </div>
  );
};

export default ImageTextForm;