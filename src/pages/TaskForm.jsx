import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { createTask, getTaskById, updateTask } from "../services/api";

import Loading from "../components/Loading";

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadTask = async () => {
      try {
        setLoading(true);

        const data = await getTaskById(id);

        setTitle(data.title);
        setCompleted(data.completed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, isEditMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setError("Task title must contain at least 3 characters.");
      return;
    }

    if (trimmedTitle.length > 100) {
      setError("Task title cannot exceed 100 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const taskData = {
        title: trimmedTitle,
        completed: completed,
        userId: 1,
      };

      if (isEditMode) {
        await updateTask(id, taskData);
        setSuccess("Task updated successfully!");
      } else {
        await createTask(taskData);
        setSuccess("Task created successfully!");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="container">
      <div className="form-page">
        <div className="form-heading">
          <p className="small-heading">TASK MANAGEMENT</p>

          <h1>{isEditMode ? "Edit Task" : "Create New Task"}</h1>

          <p>
            {isEditMode
              ? "Update the information of your task."
              : "Add a new task to your task list."}
          </p>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              maxLength="100"
            />

            <small>{title.length}/100 characters</small>
          </div>

          <div className="checkbox-group">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(event) => setCompleted(event.target.checked)}
            />

            <label htmlFor="completed">Mark task as completed</label>
          </div>

          {error && <div className="form-error">{error}</div>}

          {success && <div className="form-success">{success}</div>}

          <div className="form-actions">
            <Link to="/" className="btn cancel-btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="btn submit-btn"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default TaskForm;
