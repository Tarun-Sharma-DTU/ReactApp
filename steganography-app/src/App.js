import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/NavBar';
import ImageTextForm from './Component/TextHideTechnique/ImageTextForm';
import './App.css';
import DecodeImage from './Component/TextHideTechnique/DecodeImage';
import HideTextInPdf from './Component/TextHideTechnique/HideTextInPdf';
import DecodePdf from './Component/TextHideTechnique/DecodePdf';
import TextHideInAudio from './Component/TextHideTechnique/TextHideInAudio';
import DecodeAudio from './Component/TextHideTechnique/DecodeAudio';
import HideImageInPdf from './Component/ImageHideTechnique/HideImageInPdf';
import GetImageFromPdf from './Component/ImageHideTechnique/GetImageFromPdf';
import HideImageInImage from './Component/ImageHideTechnique/HideImageInImage';
import GetImageFromImage from './Component/ImageHideTechnique/GetImageFromImage';
import HomePage from './Component/HomePage/HomePage';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/hidetextinimage" element={<ImageTextForm />} />
          <Route path="/decodeimage" element={<DecodeImage />} />
          <Route path="/hidetextinpdf" element={<HideTextInPdf />} />
          <Route path="/decodepdf" element={<DecodePdf />} />
          <Route path="/hidetextinaudio" element={<TextHideInAudio />} />
          <Route path="/decodeaudio" element={<DecodeAudio />} />
          <Route path="/hideimageinpdf" element={<HideImageInPdf />} />
          <Route path="/getimagefrompdf" element={<GetImageFromPdf />} />
          <Route path="/hideimageinimage" element={<HideImageInImage />} />
          <Route path="/getimagefromimage" element={<GetImageFromImage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;