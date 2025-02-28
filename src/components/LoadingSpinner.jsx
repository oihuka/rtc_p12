import '../styles/components/LoadingSpinner.css';

function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
