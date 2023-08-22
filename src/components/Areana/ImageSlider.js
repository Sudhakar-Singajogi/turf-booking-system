import React, { useState } from 'react';
import './ImageSlider.css'; // Import your CSS file

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="image-slider">
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
      <button className="slider-button" onClick={goToPrevious}>Previous</button>
      <button className="slider-button" onClick={goToNext}>Next</button>
    </div>
  );
};

export default ImageSlider;