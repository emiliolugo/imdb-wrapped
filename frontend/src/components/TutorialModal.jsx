import React from 'react';
import { motion } from 'motion/react';

const TutorialModal = ({ setTutorialOpen }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#020136] text-[#d4d4dc] rounded-lg p-6 max-w-md w-full border border-[#FA4248]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#FA4248]">IMDb Data Export</h2>
          <button 
            onClick={() => setTutorialOpen(false)}
            className="text-[#d4d4dc] hover:text-[#FA4248]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-center mb-4">
          Click on your IMDb profile &gt; Your Ratings &gt; Exports &gt; Open Exports Page &gt; then finally download the csv file when it is ready
        </p>
        
        <button
          onClick={() => setTutorialOpen(false)}
          className="mt-2 w-full bg-[#FA4248] text-white p-2 rounded-full font-semibold"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TutorialModal;