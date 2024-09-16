import React, { useState, useRef } from 'react';
import './css/HideImageInPdf.css';
import download from './images/download.webp';
import enpdf from './images/enpdf.webp';
import orgpdf from './images/orgpdf.webp';
import submit from './images/submit.webp';

const HideImageInPdf = () => {
  const [image, setImage] = useState(null);
  const [pdfimage, setPdfImage] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('Current Image');
  const fileInputRefImage = useRef(null);
  const fileInputRefPdf = useRef(null);
  const [isdownload, setIsDownload] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issubmit, setIsSubmit] = useState(false);

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

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfImage(orgpdf);
      setIsSubmit(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClickImage = () => {
    fileInputRefImage.current.click();
  };

  const triggerFileInputClickPdf = () => {
    fileInputRefPdf.current.click();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!image || !pdf) {
      alert('Please provide both image and Pdf.');
      return;
    }

    setLoading(true);

    const base64Image = image.split(',')[1];
    const base64Pdf = pdf.split(',')[1];
    const payload = {
      image: base64Image,
      pdf: base64Pdf,
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/hideImageInPdf', {
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
        setIsDownload(true);
        setPdfImage(enpdf);
        setIsSubmit(false);
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

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'encoded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className='backbody'>
        <div className="container">


          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRefImage} style={{ display: 'none' }}/>


          <div className="col-lg-6 col-md-12 col-sm-12 imagephone section1">
        <div className="image-section">
          {/* <h2 className="image-heading">{heading}</h2> */}
          <div className="row justify-content-center">
            <div className="col-6">
          {image ? (
            <img src={image} alt="Result" onClick={triggerFileInputClickImage} className='image-hide-pdf' />
          ) : (
            <div className="placeholder" onClick={triggerFileInputClickImage}>CLick Here To Upload Image</div>
          )}
          </div>
          </div>
        </div>
      </div>


      <div className="col-lg-6 col-md-12 col-sm-12  pdfphone section2">
              <div className="image-section">
              <input type="file" accept="application/pdf" onChange={handlePdfChange} ref={fileInputRefPdf} style={{ display: 'none' }} />
                <div className="row justify-content-center">
                  <div className="col-6">
                  {pdfimage ? (
                        <img src={pdfimage} alt="Result" onClick={triggerFileInputClickPdf} className='image-hide-pdf' />
                    ) : (
                        <div className="placeholder" onClick={triggerFileInputClickPdf}>CLick Here To Upload Pdf</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
           {
            isdownload && <img src={download} onClick={downloadPdf} className="image-button-pdf" alt="Download" />
           }
          </div>
    </div>

            <div className="row justify-content-center">
                {issubmit && <img src={submit} onClick={handleSubmit} className="image-button-decode" alt="Submit" />}

                {loading && (
                <div id="preloader">
                <div id="loader"></div>
                </div>) }
            </div>


      </div>
    </div>
  );
};

export default HideImageInPdf;