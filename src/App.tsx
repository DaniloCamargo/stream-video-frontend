import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

interface Video {
  id: number;
  title: string;
  filename: string;
}

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };
  
  const playVideo = (videoId: number) => {
    const video = videos.find((v) => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
    }
  };

  useEffect(() => {
    axios.get<Video[]>('http://localhost:3001/videos')
      .then((response) => {
        console.log(response)
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
            <button onClick={() => handleVideoClick(video)}>
              {video.title}
            </button>
          </li>
        ))}
      </ul>
      {selectedVideo && (
        <ReactPlayer
          url={`http://localhost:3001/video/${selectedVideo.id}`}
          controls
          playing
        />
      )}
    </div>
  );
};

export default App;
