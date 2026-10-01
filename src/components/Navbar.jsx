import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          ✓ Task Manager
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/create" className="nav-create">
            + Create Task
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
