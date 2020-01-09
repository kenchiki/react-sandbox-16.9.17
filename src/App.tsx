import React, { useState, useEffect } from 'react';
import './App.css';

// https://ja.reactjs.org/docs/hooks-effect.html
const App: React.FC = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  // extends React.ComponentだったらcomponentDidMountとcomponentDidUpdateを使わないといけないけど一回で実現できる
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
