import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/NavBar/NavBar';
import ScrapEmailsPhone from './Components/WebScrapping/ScrapEmailsPhone';
import ScrapAnchorLinks from './Components/WebScrapping/ScrapAnchorLinks';
import ScrapImages from './Components/WebScrapping/ScrapImages';
import CheckDuplicateText from './Components/Tools/CheckDupilicateText';
import KeywordStuffing from './Components/Tools/KeywordStuffing';
import ScrapSocialLinks from './Components/WebScrapping/ScrapSocialLinks';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
        <Route path="/scrap_emails_and_phone" element={<ScrapEmailsPhone />} />
        <Route path="/scrap_anchor_and_links" element={<ScrapAnchorLinks />} />
        <Route path="/scrap_images" element={<ScrapImages />} />
        <Route path="/check_duplicate_sentences" element={<CheckDuplicateText />} />
        <Route path="/check_keyword_stuffing" element={<KeywordStuffing />} />
        <Route path="/scrap_social_links" element={<ScrapSocialLinks />} />
        <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
