import TaskList from "../components/task/taskList";
import "../pages/tasks.css";

function Tasks() {

  return (
    <div className="task-list">
        <h2>My Tasks</h2>
        <TaskList/>
    </div>
  );
}

export default Tasks;