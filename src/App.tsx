import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { PlayFill, XCircleFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';

interface Video {
  id: number;
  title: string;
  filename: string;
  thumb: string;
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    backgroundColor: '#331b49',
    border: 'none',
    borderRadius: '8px',
    margin: 'auto',
  },
};

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
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
    <Container>
      <div className="bg-purple text-center text-white py-2 my-4">
        <h1 className="">Lista de Vídeos</h1>
      </div>
      <Row className='justify-content-center'>
        {videos.map((video) => (
          <Col key={video.id} md={4} className="mb-3 text-center col-3">
            <Card>
              <img src={`http://localhost:3001/images/${video.thumb}`} alt="" />
              <h3 className="card-title">{video.title}</h3>
              <Button onClick={() => handleVideoClick(video)} variant="outline-purple">
                <PlayFill size="30" />
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Vídeo"
        style={customStyles}
      >
        <Row className='justify-content-center h-100 position-relative'>
          <Col className='col-auto h-100'>
            {selectedVideo && (
              <ReactPlayer
              url={`http://localhost:3001/video/${selectedVideo.id}`}
              controls
              playing
              width="auto"
              height="100%"
              />
            )}
            <button className='btn btn-fixed-close btn-outline-purple' onClick={closeModal}><XCircleFill size="30"/></button>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
};

export default App;
