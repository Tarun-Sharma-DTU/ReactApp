import React, { useState, useRef } from 'react';
import './css/HideImageInPdf.css';
import download from './images/download.webp';
import enpdf from './images/enpdf.webp';
import submit from './images/submit.webp';
import './css/GetImageFromImage.css';

const GetImageFromPdf = () => {
  const [image, setImage] = useState(null);
  const [pdfimage, setPdfImage] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const fileInputRefImage = useRef(null);
  const fileInputRefPdf = useRef(null);
  const [isdownload, setIsDownload] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issubmit, setIsSubmit] = useState(false);
  const [isadded, setIsAdded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsDownload(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfImage(enpdf);
      setIsAdded(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClickPdf = () => {
    fileInputRefPdf.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!pdf) {
      alert('Please provide Pdf.');
      return;
    }

    setLoading(true);

    const base64Pdf = pdf.split(',')[1];
    const payload = {
      pdf: base64Pdf
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/extractImageFromPdf', {
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
        setImage(`data:image/png;base64,${responseData.image}`);
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

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'encoded_pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'encoded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='backbody'>
        <div className="container">
          
          
          <div className="col-lg-6 col-md-12 col-sm-12 section1">
            {issubmit && 
        <div className="image-section">
          
          <div className="row justify-content-center">
            <div className="col-6">
          {image ? (
            <img src={image} alt="Result" className='image-pdf' />
          ) : (
            <div className="placeholder"></div>
          )}
          </div>
          </div>
        </div>
        }

        <div className="row justify-content-center">
        
        {
            isdownload && <img src={download} onClick={downloadImage} className="image-button-get" alt="Download" />
        }
        </div>

      </div>




      <div className="col-lg-6 col-md-12 col-sm-12 section2">
              
              {!issubmit &&
              <div className="image-section">
              <input type="file" accept="application/pdf" onChange={handlePdfChange} ref={fileInputRefPdf} style={{ display: 'none' }} />
                <div className="row justify-content-center">
                  <div className="col-6">
                  {pdfimage ? (
                        <img src={pdfimage} alt="Result" onClick={triggerFileInputClickPdf} className='image-pdf' />
                    ) : (
                        <div className="placeholder" onClick={triggerFileInputClickPdf}>CLick Here To Upload Pdf</div>
                    )}
                  </div>
                </div>
              </div>
              }
            </div>

            <div className="row justify-content-center">
                {isadded && <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Submit" />}
                {loading && (
                <div id="preloader">
                <div id="loader"></div>
                </div>) }
            </div>

      </div>


    </div>
  );
};

export default GetImageFromPdf;