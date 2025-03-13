import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../domain/Task";
import { fetchTaskDetails } from "../services/MainBackendAPIService";
import { DatetimeToDateString } from "../shared/DateFunctions";

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const { data: task, isLoading, error } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskDetails(taskId!),
    refetchOnWindowFocus: false
  });

//   const mutation = useMutation(updateTaskDetails, {
//     onSuccess: () => {
//       toast.success("Task updated successfully");
//       queryClient.invalidateQueries(["tasks"]); // To refetch task list after update
//       history.push("/tasks"); // Redirect back to task list page
//     },
//     onError: () => {
//       toast.error("Error updating task");
//     },
//   });

  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setUpdatedTask({ ...task });
    }
  }, [task]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading task details</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUpdatedTask((prev) => ({
      ...prev!,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedTask) {
      //mutation.mutate(updatedTask);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      {(
        <form className="task-form-container" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={task?.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={task?.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Created Date</label>
            <input
              type="date"
              name="createdDate"
              value={DatetimeToDateString(task?.createdAt)}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={DatetimeToDateString(task?.deadline)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status</label>
            <select name="status" value={updatedTask?.status || ""} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default TaskPage;
