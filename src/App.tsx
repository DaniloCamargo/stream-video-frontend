import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Video {
  id: number;
  title: string;
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    axios.get<Video[]>('http://localhost:3001/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter lista de vídeos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Vídeos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <button onClick={() => playVideo(video.id)}>
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function playVideo(videoId: number) {
  // Adicione aqui a lógica para reproduzir o vídeo selecionado.
  // Você pode usar bibliotecas de players de vídeo como o video.js, react-player, entre outros.
  console.log(`Reproduzindo o vídeo com ID ${videoId}`);
}

export default App;
