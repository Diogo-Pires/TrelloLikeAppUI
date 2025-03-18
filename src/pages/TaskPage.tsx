import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTaskDetails, updateTaskDetails } from "../services/MainBackendAPIService";
import { DatetimeToDate, DatetimeToDateString } from "../shared/DateFunctions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdateTask } from "../domain/UpdateTask";

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["task", taskId] }); 

  const { data: task, isLoading, error } = useQuery<UpdateTask>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskDetails(taskId!),
    refetchOnWindowFocus: false
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateTask>();

  if (task) {
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("deadline", DatetimeToDateString(task.deadline));
  }

  const mutation = useMutation<UpdateTask, Error, UpdateTask>({
    mutationFn: updateTaskDetails, 
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["task", taskId] }); 
    },
    onError: (err) => {
      toast.error(`Error updating task: ${err}`);
    },
  });

  const onSubmit = (data: UpdateTask) => {  
    const updatedTask = {
      ...data, 
      id: taskId,
    };

    if(!data.deadline){
      delete updatedTask.deadline; 
    }
  
    delete updatedTask.createdAt; 
    mutation.mutate(updatedTask as UpdateTask); 
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
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Save"}
      </button>
      </form>
      )}
    </div>
  );
};

export default TaskPage;
