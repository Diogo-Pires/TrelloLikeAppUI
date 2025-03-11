import { useEffect } from "react";
import { useTaskContext } from "../../contexts/TaskContext";
import { fetchTasks } from "../../services/MainBackendAPIService";

const TaskList = () => {
  const { tasks, setTasks } = useTaskContext();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    getTasks();
  }, [setTasks]);

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
