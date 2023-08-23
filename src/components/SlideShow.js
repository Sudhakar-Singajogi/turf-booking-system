import React from "react"; 
import "./Slider.css";

const slides = [
  {
    src: "https://picsum.photos/id/0/500/333",
  },
  {
    src: "https://picsum.photos/id/1/500/333",
  },
  {
    src: "https://picsum.photos/id/2/500/333",
  },
  {
    src: "https://picsum.photos/id/3/500/333",
  },
  {
    src: "https://picsum.photos/id/4/500/333",
  },
  {
    src: "https://picsum.photos/id/5/500/333",
  },
];
const SlideShow = () => {
  const [currentPos, setCurrentPos] = React.useState(0);
  const firstSlide = slides[currentPos];
  const [slide, setSlide] = React.useState(firstSlide); 

  const handleOnClick = (position) => {
    console.log(position);

    switch (position) {
      case "restart":
        setSlide(slides[0]);
        setCurrentPos(0);
        break;
      case "prev":
        let prevSlideCnt = currentPos - 1;
        setSlide(slides[prevSlideCnt]);
        setCurrentPos(prevSlideCnt);
        break;
      case "next":
        let nextSlideCnt = currentPos + 1;
        setSlide(slides[nextSlideCnt]);
        setCurrentPos(nextSlideCnt);
        break;
        default:
    }
  };

  return (
    <>
      <div id="slide" className="slider-container imageSlider text-center">
        <img src={firstSlide.src} className="card-img-top" alt="" />
        <div id="navigation" className="text-center"> 
            <button
              data-testid="button-prev" 
              className={`round left-button prev-next-buttons ${currentPos === 0 && ' button-disabled' }`} 
              onClick={() => handleOnClick("prev")}
            >
            &#8249;
            </button> 
            <button
              data-testid="button-next" 
              className={`round right-button prev-next-buttons ${currentPos === slides.length - 1 && ' button-disabled' }`} 
              onClick={() => handleOnClick("next")}
            >
              &#8250;
            </button> 
        </div>
      </div>
    </>
  );
};

export default SlideShow;
