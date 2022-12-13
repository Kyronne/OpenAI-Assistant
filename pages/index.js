import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI Wellbeing Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask a question to get Wellbeing advice.</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <div className="prompt-input"><textarea  className="prompt-box" type="text"
          placeholder="Type here :)." 
          value={userInput}
          onChange={onUserChangedText} /> </div>
        <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint} >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
            </a>
            </div>
          {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
            <h3>Output</h3>
        </div>
          </div>
              <div className="output-content">
                <p>{apiOutput}</p>
          </div>
              </div>
            )}
        </div>
      </div>
    <div className='footer'> <h3>Built Using OpenAI. I
      Isn't a replacement for professional help.</h3></div>    
    </div>
  );
};


export default Home;
