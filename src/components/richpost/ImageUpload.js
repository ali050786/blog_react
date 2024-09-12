import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <button type="button">Upload Image</button>
      </label>
      {image && <img src={image} alt="Uploaded" className="mt-4 max-w-full h-auto" />}
    </div>
  );
};

export default ImageUpload;