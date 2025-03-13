
import { fetchUserTasks } from "../../services/MainBackendAPIService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingMsg from "../Loading";
import { appCallMaxNumberOfRetries, ExponentialBackoff } from "../../shared/retryPolicyFunctions";

const TaskList = () => {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchUserTasks,
    retry: appCallMaxNumberOfRetries, 
    retryDelay: ExponentialBackoff
  });
  
  useEffect(() => {
    if (error) {
      toast.error('Error loading tasks');
    }
  }, [error]);

  return (
    <div>
      
  <LoadingMsg isLoading={isLoading}></LoadingMsg>
      {!error ? (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <label>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </label>
          </div>
         ))) : (<p>Something wrong happened, please try it again later</p>)
      }
    </div>
  );
};

export default TaskList;
