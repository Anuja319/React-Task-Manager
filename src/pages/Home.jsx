import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTasks, deleteTask } from "../services/api";

import TaskCard from "../components/TaskCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      // Immediately remove from Home page
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <main className="container">
      {/* Page heading */}
      <section className="hero-section">
        <div>
          <h1>Your Tasks</h1>

          <p className="hero-text">
            Create, update and track your tasks easily.
          </p>
        </div>

        <Link to="/create" className="create-button">
          + Create Task
        </Link>
      </section>

      {/* Task summary */}
      <section className="task-summary">
        <div>
          <strong>{tasks.length}</strong>
          <span>Total Tasks</span>
        </div>

        <div>
          <strong>{completedTasks}</strong>
          <span>Completed</span>
        </div>

        <div>
          <strong>{pendingTasks}</strong>
          <span>Pending</span>
        </div>
      </section>

      {/* Task list */}
      <section>
        <div className="section-heading">
          <h2>Your Tasks</h2>

          <span>{tasks.length} tasks</span>
        </div>

        <div className="task-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>

              <p>Create your first task to get started.</p>

              <Link to="/create" className="btn primary-btn">
                Create Task
              </Link>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
