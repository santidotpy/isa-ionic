import React, { useState } from 'react';
import axios from 'axios';

const MemeComponent = () => {
  const [memeImg, setMemeImg] = useState('');

  const fetchMeme = async () => {
    try {
      const response = await axios.get('https://meme-api.com/gimme');
      const memeUrl = response.data.url;
      setMemeImg(memeUrl);
    } catch (error) {
      console.error('Error al obtener el meme:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={fetchMeme}
      >
        Obtener Meme
      </button>
      {memeImg && <img src={memeImg} alt="Meme" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
};

export default MemeComponent;
