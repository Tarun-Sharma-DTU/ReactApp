import logo from './logo.svg';
import './App.css';
import ChatBox from './components/ChatBox.js';
import UserBox from './components/UserBox.js';
import Header from './components/Header.js';
import ChatPage from './components/ChatPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import DeskTopChatBox from './components/DeskTopChatBox.js';


function App() {
  return (
    <Router>
      <>
        <Routes>
            <Route path="/chats" element={<ChatBox />} />
            <Route path="/chating" element={<ChatPage />} />
            <Route path="/" element={<Login />} />
            <Route path="/desktop_chat" element={<DeskTopChatBox />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
