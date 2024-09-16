import React, { useState, useRef } from 'react';
import download from './images/download.png';
import './css/TextHideInAudio.css';
import submit from './images/submit.webp';
import stand from './images/stand.webp';

const TextHideInAudio = () => {
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isDownload, setIsDownload] = useState(false);
  const [audioheading, setAudioHeading] = useState('Current Audio');
  const [isaudio, setIsAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setIsAudio(true);
        setAudioHeading('Current Audio');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudio(reader.result);
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

    if (!audio || !text) {
      alert('Please provide both audio and text.');
      return;
    }
    setLoading(true);

    const base64Audio = audio.split(',')[1];
    const payload = {
      audio: base64Audio,
      text: text,
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await fetch('http://16.171.134.100:8080/hideTextInAudio', {
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
        setAudio(`data:audio/wav;base64,${responseData.audio}`);
        setIsDownload(true);
        setIsDownload(true);
        setIsSubmit(true);
        setAudioHeading('Encoded Audio');
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

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audio;
    link.download = 'encoded_audio.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
        <div className="container">


            <div className="col-lg-6 col-md-12 col-sm-12 section1">
              <div className="audio-section">
                <div className="row justify-content-center">
                  <div className="col-6 h4">
                    {isaudio && <h4>{audioheading}</h4>}
                    {audio ? (
                      <audio controls src={audio} className='audio' />
                    ) : (
                      <div className="placeholder-audio" onClick={triggerFileInputClick}>Click Here To Upload Audio</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
              <img src={stand} className='stand'/>
                {isDownload && (
                  <img src={download} onClick={downloadAudio} className="image-button-audio" alt="Download" />
                )}
              </div>
            </div>




            <div className="col-lg-6 col-md-12 col-sm-12 section2">
                {!isSubmit &&
              <div className="form-section">
                <h1 className=''>Enter Text To Hide in Audio</h1>
                <form>
                  <input type="file" accept="audio/*" onChange={handleAudioChange} ref={fileInputRef} style={{ display: 'none' }} />
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

export default TextHideInAudio;