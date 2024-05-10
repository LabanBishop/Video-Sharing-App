import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const textContext = require.context("../../VideoStorage", false, /\.txt$/);
        const textFiles = textContext.keys().map(textContext);

        const fetchedVideoData = await Promise.all(textFiles.map(async (textFile, index) => {
          const response = await fetch(textFile);
          const text = await response.text();
          const lines = text.split('\n');
          if (lines.length > 1) {
            const categories = lines[1].split(',').map(category => category.trim());
            return { id: index + 1, title: lines[0], categories };
          }
          return null;
        }));

        const videoDataObject = {};
        fetchedVideoData.forEach(video => {
          if (video) {
            videoDataObject[video.id] = video;
          }
        });

        setVideoData(videoDataObject);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    if (Object.keys(videoData).length > 0) {
      const currentVideoCategories = videoData[id]?.categories || [];
      const relatedVideos = Object.values(videoData).filter(video => {
        return video.id !== parseInt(id) && video.categories.some(category => currentVideoCategories.includes(category));
      });
      setRelatedVideos(relatedVideos);
    }
  }, [id, videoData]);

  const generateVideoSource = (id) => {
    const videoContext = require.context("../../VideoStorage", false, /\.mp4$/);
    const videoFiles = videoContext.keys().map(videoContext);
    const video = videoFiles[id - 1];

    return video;
  };

  const generateThumbnail = (videoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth / 2; // Half width for thumbnail
    canvas.height = videoElement.videoHeight / 2; // Half height for thumbnail
    canvas.getContext("2d").drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  };

  const videoSrc = generateVideoSource(id);

  if (!videoSrc) {
    return <div>Video not found</div>;
  }

  const currentVideo = videoData[id];

  return (
    <div className="video-player-container">
      <video controls className="video-player" id="videoPlayer">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{currentVideo ? currentVideo.title : ""}</p>
      <p>{currentVideo ? currentVideo.categories.join(', ') : ""}</p>
      {relatedVideos.length > 0 && (
        <div>
          <h2>Related Videos:</h2>
          <ul>
            {relatedVideos.map(video => (
              <li key={video.id}>
                <a href={`/video/${video.id}`}>
                  <img src={generateThumbnail(document.getElementById("videoPlayer"))} alt="Thumbnail" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;