import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [stack, setStack] = useState([]);
  const [message, setMessage] = useState('');
  const inputData = useRef(null);
  const [error,setError] = useState('');

  const colors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#9D4EDD", "#F4A261"];

  const push = () => {
    const inputValue = inputData.current.value;

    if (inputValue.trim() !== '') {
      const newStack = [...stack];
      newStack.push(inputValue); 
      setStack(newStack); 
      inputData.current.value = ''; 
      setMessage(`Pushed "${inputValue}" onto the stack.`); 
      setError(null)
    } else {
      setError('Please enter a value to push onto the stack.');
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const newStack = [...stack]; 
      const poppedItem = newStack.pop(); 
      setStack(newStack); // Update state
      setError(`Popped "${poppedItem}" from the stack.`); 
      setMessage(null);
    } else {
      setError('Cannot pop from an empty stack.'); 
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Stack Visualizer (LIFO)</h2>
        </div>
        <div className="card-content">
          <div className="input-group">
            <input
              className="input"
              placeholder="Enter a value"
              ref={inputData}
            />
            <button className="button" onClick={push}>Push</button>
            <button className="button outline" onClick={pop}>Pop</button>
          </div>
          <div className="stack-container">
            <h3 className="stack-title">Stack Contents:</h3>
            <div className="stack">
              {stack.map((item, index) => (
                <div
                  key={index}
                  className={`stack-item ${index === stack.length - 1 ? 'top-item' : ''}`}
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  {item}
                </div>
              ))}
              {stack.length === 0 && <p className="empty-stack">Stack is empty</p>}
            </div>
          </div>
          {error ? <p className="error">{error}</p> : <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
