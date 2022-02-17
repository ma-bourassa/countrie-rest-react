import { useEffect, useState } from 'react';
import { HiChevronDoubleUp } from 'react-icons/hi';
import './ScrollButton.scss';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    // eslint-disable-next-line
    <div>
      {isVisible && (
        <button className='scroll-button' onClick={scrollToTop} aria-label='Haut de page'>
          <HiChevronDoubleUp />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
