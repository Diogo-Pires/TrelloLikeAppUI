
import { fetchUserTasks } from "../../services/MainBackendAPIService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const TaskList = () => {
  const { data: tasks = [], error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchUserTasks
  });

  if (error) return toast.error('Error loading tasks');

  return (
    <div>
      {tasks.map((task) => (
        
      <div key={task.id} className="task-card">
        <input type="checkbox" id="task1" />
        <label>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </label>
      </div>
      ))}
    </div>
  );
};

export default TaskList;
