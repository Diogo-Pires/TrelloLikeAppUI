import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../domain/Task";
import { fetchTaskDetails, updateTaskDetails } from "../services/MainBackendAPIService";
import { DatetimeToDateString } from "../shared/DateFunctions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const queryClient = useQueryClient();

  const { data: task, isLoading, error } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskDetails(taskId!),
    refetchOnWindowFocus: false
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Task>();

  if (task) {
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("deadline", task.deadline);
  }

  const mutation = useMutation<Task, Error, Task>({
    mutationFn: updateTaskDetails, 
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["task", taskId] }); 
    },
    onError: (err) => {
      toast.error(`Error updating task: ${err}`);
    },
  });

  const onSubmit = (data: Task) => {  
    const updatedTask = {
      ...data, 
      id: taskId,
    };

    if(!data.deadline){
      delete updatedTask.deadline; 
    }
  
    delete updatedTask.createdAt; 
    mutation.mutate(updatedTask); 
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading task details</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      {(
        <form className="task-form-container" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title</label>
            <input
            type="text"
            {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div>
            <label>Description</label>
            <textarea
            {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label>Created At:</label>
            <input
            type="date"
            value={DatetimeToDateString(task?.createdAt)} 
            disabled
            />
        </div>
        <div>
        <label>Deadline:</label>
        <input 
        type="date" 
        {...register("deadline", { required: "Deadline is required" })} 
        />
         {errors.deadline && <p>{errors.deadline.message}</p>}
        </div>
        <div>
        <label>Status:</label>
        <select {...register("status")}>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Updating..." : "Save"}
      </button>
      </form>
      )}
    </div>
  );
};

export default TaskPage;
