import PropTypes from 'prop-types';
import '../styles/LoadingSpinner.css';

function LoadingSpinner({ message }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

LoadingSpinner.defaultProps = {
  message: 'Cargando...'
};

export default LoadingSpinner;
