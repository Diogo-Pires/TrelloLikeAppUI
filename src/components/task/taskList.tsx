
import { fetchUserTasks } from "../../services/MainBackendAPIService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingMsg from "../Loading";
import { Switch } from "@radix-ui/react-switch";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchUserTasks,
    refetchOnWindowFocus: false
  });
  
  useEffect(() => {
    if (error) {
      toast.error('Error loading tasks');
    }
  }, [error]);

  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    showCompleted ? task.completedAt : !task.completedAt
  );

  return (
    <div>
      <LoadingMsg isLoading={isLoading}></LoadingMsg>
      {!error ? (
        <>
        <div className="flex items-center gap-2 mb-4">
          <label>Show Completed</label>
          <Switch
            checked={showCompleted}
            onCheckedChange={setShowCompleted} 
            className="switch"
            />
              <span className="switch-thumb"></span>
        </div>
        {filteredTasks.length ? filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <Link to={{
                pathname: `/task/${task.id}`
              }} >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </Link>
          </div>
         )) : (<p>No tasks found...</p>)}
         </>) 
         : (<p>Something wrong happened, please try it again later</p>)
      }
    </div>
  );
};

export default TaskList;
