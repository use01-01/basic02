import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [joke, setJoke] = useState('');
  const [modal, setModal] = useState({ showmodal: false, text: '' });

  const modalSet = (showmodal, text) => {
    setModal({ showmodal, text });
  };

  const getData = async (e) => {
    setJoke('');
    modalSet(true, 'wait 3 seconds for a joke!');
    const response = await axios.get(
      `https://official-joke-api.appspot.com/${e}`
    );
    console.log(response);
    setTimeout(() => {
      console.log(e);
      modalSet(false, '');
      if (e === 'random_joke') {
        setJoke(response.data);
      } else if (e === 'jokes/programming/random') {
        setJoke(response.data[0]);
      }
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => getData('random_joke')}>general joke</button>
      <button onClick={() => getData('jokes/programming/random')}>
        programming joke
      </button>
      <h1>{joke && joke.setup + ' ... ' + joke.punchline}</h1>
      <h3>{modal.showmodal && modal.text}</h3>
    </div>
  );
};

export default App;
