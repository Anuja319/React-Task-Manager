function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>

      <h2>Something went wrong</h2>

      <p>{message}</p>

      <p>Please check your internet connection and try again.</p>
    </div>
  );
}

export default ErrorMessage;
