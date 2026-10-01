import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container">
      <div className="empty-state">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>Sorry, the page you are looking for does not exist.</p>

        <Link to="/" className="btn primary-btn">
          Go to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
