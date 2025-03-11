import TaskList from "../components/task/TaskList";
import "../pages/tasks.css";

function TasksPage() {

  return (
    <div className="task-list">
        <h2>My Tasks</h2>
        <TaskList/>
    </div>
  );
}

export default TasksPage;