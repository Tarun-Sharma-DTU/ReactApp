import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header.js';
import Navbar from './components/NavBar.js';
import About from './components/About.js';
import Experience from './components/Experience.js';
import Projects from './components/Projects.js';
import Contact from './components/Contact.js';
import Copyright from './components/Copyright.js';


function App() {
  return (
      <>
        <Navbar />
        <Header />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Copyright />
      </>
  );
}

export default App;
