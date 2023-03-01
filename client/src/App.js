import logo from './logo.svg';
import './App.css';
import './normal.css'

import { useState } from 'react';

import faceImage from './face.jpg';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Hello, I am Jaeyeon Park. How can I help you today?"
  },]);

  async function handleSubmit (e) {
    e.preventDefault();
    let chatLogNew =[...chatLog, { user: "me", message: `${input}` }];
    setInput('');

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.data}`}]);
  }

  return (
    <div className="App">

      <aside className="sidemenu">

        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>

      </aside>

      <section className="chatbox">

        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input 
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            >
            </input>
          </form>
        </div>

      </section>

    </div>
  );
}

const ChatMessage = ({ message }) => { 
  return (
    <div className="chat-message">
      <div className="chat-message-center">
        <div className={`avatar ${message.user === 'gpt' ? "chatgpt" : ""}`}>
          {message.user === "gpt" && <img src={faceImage} alt="face" />}
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
