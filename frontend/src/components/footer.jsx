import React from 'react';

const Footer = () => {
    return (

        <footer className="fixed flex items-center justify-center bottom-0 z-[1000]  py-5 text-center bg-gray-50 border-t border-gray-200">
            <p>
                Made with <span role="img" aria-label="love">💖</span> By {' '}
                <a 
                    href="https://github.com/nerdyabhi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 no-underline hover:underline"
                >
                    Nerdy Abhi
                </a>
            </p>
        </footer>
    );
};

export default Footer;
