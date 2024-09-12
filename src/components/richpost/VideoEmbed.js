import React, { useState } from 'react';

const VideoEmbed = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the URL to extract the video ID
    // and generate the appropriate embed code
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2">Embed Video</button>
    </form>
  );
};

export default VideoEmbed;