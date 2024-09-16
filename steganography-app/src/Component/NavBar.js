import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    encryption: false,
    decryption: false,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
        <div className="container-fluid">
          <a className="navbar-brand order-1" href="/" id="title">HideNReveal</a>
          <button className="navbar-toggler order-2 ms-auto" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse order-3 ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown" onMouseEnter={() => toggleDropdown('encryption')}
                  onMouseLeave={() => toggleDropdown('encryption')}>
                <a
                  className="nav-link dropdown-toggle  text-white"
                  href="#"
                  id="encryptionDropdown"
                  role="button"
                  
                  aria-expanded={dropdownOpen.encryption}
                >
                  Encryption
                </a>
                <ul className={`dropdown-menu ${dropdownOpen.encryption ? 'show' : ''}`} aria-labelledby="encryptionDropdown">
                  <li><Link className="dropdown-item" to="/hidetextinimage">Encrypt Text in Image</Link></li>
                  <li><Link className="dropdown-item" to="/hidetextinpdf">Encrypt Text in Pdf</Link></li>
                  <li><Link className="dropdown-item" to="/hidetextinaudio">Encrypt Text in Audio</Link></li>
                  <li><Link className="dropdown-item" to="/hideimageinpdf">Encrypt Image in Pdf</Link></li>
                  <li><Link className="dropdown-item" to="/hideimageinimage">Encrypt Image in Image</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown" onMouseLeave={() => toggleDropdown('decryption')} onMouseEnter={() => toggleDropdown('decryption')}>
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="decryptionDropdown"
                  
                  role="button"
                  aria-expanded={dropdownOpen.decryption}
                >
                  Decryption
                </a>
                <ul className={`dropdown-menu ${dropdownOpen.decryption ? 'show' : ''}`} aria-labelledby="decryptionDropdown">
                  <li><Link className="dropdown-item mytext" to="/decodeimage">Decrypt Text From Image</Link></li>
                  <li><Link className="dropdown-item" to="/decodepdf">Decrypt Text From Pdf</Link></li>
                  <li><Link className="dropdown-item" to="/decodeaudio">Decrypt Text From Audio</Link></li>
                  <li><Link className="dropdown-item" to="/getimagefrompdf">Decrypt Image From Pdf</Link></li>
                  <li><Link className="dropdown-item" to="/getimagefromimage">Decrypt Image From Image</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" to="/#about">About HideNReveal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" to="/">Gift Me</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;