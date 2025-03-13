import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../domain/Task";
import { fetchTaskDetails } from "../services/MainBackendAPIService";

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const queryClient = useQueryClient();

  const { data: task, isLoading, error } = useQuery<Task>({
        queryKey: ["task", taskId],
        queryFn: () => fetchTaskDetails(taskId!)
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
        console.log('test:', task)
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
        <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="description"
              value={task?.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Completed Date</label>
            <input
              type="date"
              name="completedDate"
              value={task?.completedAt?.toLocaleDateString()}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Created Date</label>
            <input
              type="date"
              name="createdDate"
              value={task?.createdAt?.toLocaleDateString()}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={task?.deadline?.toLocaleDateString()}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={task?.status}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Completed</label>
            <input
              type="checkbox"
              name="completed"
              checked={!!task?.completedAt}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default TaskPage;
