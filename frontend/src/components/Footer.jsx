import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-end items-center px-4">
    
        <div className="flex items-center mt-2 md:mt-0">
        <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FA4248] hover:text-orange-300 flex items-center transition-colors duration-200 font-medium"
          >
            <span>Check out my GitHub!</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;