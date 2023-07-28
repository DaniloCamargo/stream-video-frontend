import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';

interface Video {
  id: number;
  title: string;
  filename: string;
  thumb: string;
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
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter lista de vídeos:', error);
      });
  }, []);

  return (
    <Container className="text-center">
      <div className="bg-purple text-white py-2 my-4">
        <h1 className="">Lista de Vídeos</h1>
      </div>
      <Row>
        {videos.map((video) => (
          <Col key={video.id} md={4} className="mb-3">
            <Card>
              <img src={`http://localhost:3001/images/${video.thumb}`} alt="" />
              <h3 className="card-title">{video.title}</h3>
              <Button onClick={() => handleVideoClick(video)} variant="outline-primary">
                <PlayFill size="30" />
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedVideo && (
        <ReactPlayer
          url={`http://localhost:3001/video/${selectedVideo.id}`}
          controls
          playing
          className="mt-4"
        />
      )}
    </Container>
  );
};

export default App;
