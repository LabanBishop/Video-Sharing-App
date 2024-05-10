import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoGallery = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    const importVideos = async () => {
      const videoContext = require.context("../../VideoStorage", false, /\.mp4$/);
      const videoFiles = videoContext.keys().map(videoContext);

      const textContext = require.context("../../VideoStorage", false, /\.txt$/);
      const textFiles = textContext.keys().map(textContext);

      const thumbnailsData = await Promise.all(
        videoFiles.map(async (src, index) => {
          const thumbnailURL = await generateThumbnail(src);
          const fileName = extractFileName(src); // Extract file name from path

          // Read corresponding text file
          const textFileContent = await getTextFileContent(textFiles[index]);

          // Extract title, category, and view count
          const title = extractInfo(textFileContent, "Title");
          const category = extractInfo(textFileContent, "Category");
          let viewCount = parseInt(extractInfo(textFileContent, "View Count")); // Convert view count to integer

          return { id: index + 1, thumbnailURL, fileName, title, category, viewCount };
        })
      );

      // Sort thumbnails based on view count
      thumbnailsData.sort((a, b) => b.viewCount - a.viewCount);

      setThumbnails(thumbnailsData);
      setLoading(false); // Set loading to false once thumbnails are loaded
    };

    importVideos();
  }, []);

  const generateThumbnail = async (src) => {
    return new Promise((resolve) => {
      const videoElement = document.createElement("video");
      videoElement.src = src;
      videoElement.onloadeddata = () => {
        videoElement.currentTime = 0.5; // Set time to capture the frame
        videoElement.onseeked = () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const thumbnailURL = canvas.toDataURL("image/jpeg");
          resolve(thumbnailURL);
        };
      };
    });
  };

  // Extract file name from path
  const extractFileName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1].replace(".mp4", "");
  };

  // Read text file content
  const getTextFileContent = async (filePath) => {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
  };

  // Extract information from text file content
  const extractInfo = (text, key) => {
    const match = text.match(new RegExp(`${key}: (.*)`));
    return match ? match[1] : "";
  };

  // Function to update view count in text file
  const updateViewCount = async (filePath, newViewCount) => {
    await fetch(filePath, {
      method: 'PUT', // or 'POST'
      headers: {
        'Content-Type': 'text/plain',
      },
      body: `View Count: ${newViewCount}`,
    });
  };

  // Handle thumbnail click
  const handleThumbnailClick = async (id, viewCount, fileName) => {
    const newViewCount = viewCount + 1;
    const index = thumbnails.findIndex(thumbnail => thumbnail.id === id);
    if (index !== -1) {
      const updatedThumbnails = [...thumbnails];
      updatedThumbnails[index].viewCount = newViewCount;
      setThumbnails(updatedThumbnails);
    }
    const textFilePath = `../../VideoStorage/${fileName}.txt`;
    await updateViewCount(textFilePath, newViewCount);
  };

  // Display loading message while thumbnails are being loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-gallery">
      {thumbnails.map((thumbnail, index) => (
        <div key={index} className="video-item">
          <Link to={`/video/${thumbnail.id}`} onClick={() => handleThumbnailClick(thumbnail.id, thumbnail.viewCount, thumbnail.fileName)}>
            <img
              src={thumbnail.thumbnailURL}
              alt={`Thumbnail of Video ${thumbnail.fileName}`}
              style={{ width: "200px", height: "150px" }}
            />
            <p>{thumbnail.fileName}</p>
            <p>Title: {thumbnail.title}</p>
            <p>Category: {thumbnail.category}</p>
            <p>Views: {thumbnail.viewCount}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;