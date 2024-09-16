import React, { useState, useRef } from 'react';
import './css/ImageTextForm.css';
import './css/DecodeImage.css';
import submit from './images/submit.webp';
import './css/DecodeAudio.css'

const DecodeAudio = () => {
  const [audio, setAudio] = useState(null);
  const [sendAudio, setSendAudio] = useState(null);
  const [decodedMsg, setDecodedMsg] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [decodeHeading, setDecodeHeading] = useState('');
  const [audioheading, setAudioHeading] = useState('Uploaded Audio');
  const [isaudio, setIsAudio] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSendAudio(file);
      setIsSubmit(true);
      setDecodeHeading('');
      setDecodedMsg('');
      setIsAudio(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudio(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!sendAudio) {
      alert('Please provide an audio file');
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(',')[1];
      const payload = {
        audio: base64Audio
      };

      console.log('Payload:', payload); // Log the payload

      try {
        const response = await fetch('http://16.171.134.100:8080/extractTextFromAudio', {
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
          setDecodeHeading('Decoded Text From Audio');
          setDecodedMsg(responseData.text);
          setIsSubmit(false);
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
    reader.readAsDataURL(sendAudio); // Corrected argument
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="backbody">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col section1">
            <div className="audio-section-decode">
              <div className="row justify-content-center">
                <div className="col-6">
                {isaudio && <h4>{audioheading}</h4>}
                  {audio ? (
                    <audio controls src={audio} />
                  ) : (
                    <div className="placeholder_decode_audio" onClick={triggerFileInputClick}>Click Here To Upload Audio</div>
                  )}
                </div>
              </div>
            </div>

            <form>
              <div className="row form-group justify-content-center">
                <input type="file" id="audio" accept="audio/*" onChange={handleAudioChange} ref={fileInputRef} style={{ display: 'none' }} />
                {isSubmit && <img src={submit} onClick={handleSubmit} className="image-button-decode-audio" alt="Submit" />}
                {loading && (
      <div id="preloader">
      <div id="loader"></div>
    </div>) }
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <h2 className='decode-heading'>{decodeHeading}</h2>
        </div>
        <div className="row justify-content-center mt-2">
          <p className=''>{decodedMsg}</p>        
        </div>
      </div>
    </div>
  );
};

export default DecodeAudio;