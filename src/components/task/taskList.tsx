import { useEffect } from "react";
import { useTaskContext } from "../../contexts/taskContext";
import { fetchTasks } from "../../services/api";

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
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
