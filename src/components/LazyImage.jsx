import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

function LazyImage({ src, alt, className }) {
  const [imageSrc, setImageSrc] = useState('placeholder.jpg');
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc === 'placeholder.jpg') {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '75%',
        }
      );
      observer.observe(imageRef);
    }
    return () => {
      didCancel = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default memo(LazyImage);
