import React, { useState } from 'react';
import { motion } from 'motion/react';

const FormUpload = ({ onFileSubmit, setUploadOpen }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    setIsDragging(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://imdb-wrapped-backend.onrender.com/upload-file', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      const resultArray = Object.entries(data).map(([key, value]) => ({ key, value }));
      onFileSubmit(resultArray);
    } catch (err) {
      setError("Error submitting file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#02013A] p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#d4d4dc] mb-4 text-center">Upload Your IMDb Ratings</h2>
        <form onSubmit={handleSubmit}>
          <div
            className={`border-2 border-dashed ${
              isDragging ? 'border-[#FA4248]' : 'border-[#d4d4dc]'
            } p-8 rounded-lg mb-4 text-center cursor-pointer`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p className="text-[#d4d4dc] mb-2">
              {file ? file.name : 'Drag & drop your CSV file here'}
            </p>
            <p className="text-sm text-[#d4d4dc] opacity-70">or</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".csv"
            />
            <label
              htmlFor="file-upload"
              className="mt-2 inline-block bg-[#FA4248] text-[#d4d4dc] py-2 px-4 rounded cursor-pointer"
            >
              Browse Files
            </label>
          </div>
          {error && <p className="text-[#FA4248] mb-4">{error}</p>}
          <div className="flex gap-x-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-transparent border border-[#d4d4dc] text-[#d4d4dc] py-2 rounded"
              onClick={() => setUploadOpen(false)}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-[#FA4248] text-[#d4d4dc] py-2 rounded flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                "Upload & Analyze"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FormUpload;