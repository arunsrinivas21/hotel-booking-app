import React, { useState } from 'react';
import { Grid, Image, Modal, Button, Icon } from 'semantic-ui-react';

interface ImageItem {
  src: string;
  alt: string;
}

const ImageGallery: React.FC = () => {
  // Sample images array with type annotation
  const images: ImageItem[] = [
    { src: '/hotel1.jpg', alt: 'Image 1' },
    { src: '/hotel2.jpg', alt: 'Image 2' },
    { src: '/hotel3.jpg', alt: 'Image 3' },
    // Add more images as needed
  ];

  // State for modal visibility and current image index with type annotations
  const [open, setOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Function to open modal with the clicked image
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  // Navigation functions for modal
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <Grid columns={3} doubling stackable>
        {images.map((img, index) => (
          <Grid.Column key={index}>
            <Image 
              src={img.src} 
              alt={img.alt} 
              onClick={() => handleImageClick(index)} 
              style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '10px' }}
            />
          </Grid.Column>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeIcon
      >
        <Modal.Header>{images[currentImageIndex].alt}</Modal.Header>
        <Modal.Content image>
          <Image size='large' src={images[currentImageIndex].src} wrapped />
          <Modal.Description>
            <Button.Group fluid>
              <Button onClick={prevImage}>&lt; Previous</Button>
              {/* <Button.Or /> */}
              <Button onClick={nextImage}>Next &gt;</Button>
            </Button.Group>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ImageGallery;