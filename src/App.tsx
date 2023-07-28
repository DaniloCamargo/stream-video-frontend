import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';

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
    <Container>
      <h1 className="mt-4">Lista de Vídeos</h1>
      <Row>
        {videos.map((video) => (
          <Col key={video.id} md={4} className="mb-3">
            <Card>
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
