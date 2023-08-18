import "./AboutUs.css";
import React, { useRef } from "react";

export const AboutUs = () => {
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="section-2" id="about-us">
      <h1 className="section-heading">About Us</h1>
      <div className="section-heading-line"></div>
      <div className="video-wrapper">
        <video
          ref={videoRef} // Attach the ref to the video element
          src="images/tiffin-video.mp4"
          className="video"
        ></video>
        <div className="controls">
          <div className="video-bar-wrapper">
            <div className="video-bar"></div>
          </div>
          <div className="buttons">
            <button id="play-pause" onClick={togglePlay}>
              {/* Use Font Awesome icon for play/pause */}
              <i
                className={`far ${
                  videoRef.current?.paused
                    ? "fa-play-circle"
                    : "fa-pause-circle"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <p className="section-2-paragraph">
        Tiffin Express is an online platform created to connect people and
        restaurents so that people can choose from a verity of restaurents and
        take the best suitable option for there tiffin service and restaurents
        can get a larger customer base. So its a win win situation for both the
        customers and the restaurents.
      </p>
    </section>
  );
};
