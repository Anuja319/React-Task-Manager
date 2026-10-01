import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getTaskById } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="container">
      <div className="details-page">
        <div className="details-header">
          <div>
            <p className="small-heading">TASK DETAILS</p>

            <h1>Task #{task.id}</h1>
          </div>

          <span
            className={`status ${task.completed ? "completed" : "pending"}`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="details-card">
          <div className="detail-item">
            <span>Task Title</span>
            <strong>{task.title}</strong>
          </div>

          <div className="detail-item">
            <span>Task ID</span>
            <strong>{task.id}</strong>
          </div>

          <div className="detail-item">
            <span>User ID</span>
            <strong>{task.userId}</strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <strong>{task.completed ? "Completed" : "Pending"}</strong>
          </div>
        </div>

        <div className="details-actions">
          <Link to="/" className="btn back-btn">
            ← Back to Tasks
          </Link>

          <Link to={`/edit/${task.id}`} className="btn view-btn">
            Edit Task
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TaskDetails;
