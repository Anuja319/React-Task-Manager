import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">

      {/* Task Header */}
      <div className="task-card-header">
        <span className="task-number">
          Task #{task.id}
        </span>

        <span
          className={`status ${
            task.completed ? "completed" : "pending"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Task Title */}
      <h2>{task.title}</h2>

      {/* Action Buttons */}
      <div className="task-card-footer">

        <Link
          to={`/tasks/${task.id}`}
          className="btn view-btn"
        >
          View Details
        </Link>

        <Link
          to={`/edit/${task.id}`}
          className="btn edit-btn"
        >
          Edit
        </Link>

        <button
          type="button"
          className="btn delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;

