import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTasks,
  getGoals,
  addTask,
  addGoal,
  removeTask,
  removeGoal,
} from "./api";

import { setTasks } from "./redux/taskSlice";
import { setGoals } from "./redux/goalSlice";

import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.list);
  const goals = useSelector((state) => state.goals.list);

  const [task, setTask] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  const [goal, setGoal] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const tasksData = await getTasks();
      const goalsData = await getGoals();

      dispatch(setTasks(tasksData));
      dispatch(setGoals(goalsData));
    } catch (error) {
      console.log("Error cargando datos:", error);
    }
  };

  // ================= TASKS =================

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!task || !taskDeadline) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addTask(task, taskDeadline);

      setTask("");
      setTaskDeadline("");

      loadData();
    } catch (error) {
      console.log("Error agregando tarea:", error);
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      await removeTask(id);
      loadData();
    } catch (error) {
      console.log("Error eliminando tarea:", error);
    }
  };

  // ================= GOALS =================

  const handleAddGoal = async (e) => {
    e.preventDefault();

    if (!goal || !goalDeadline) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addGoal(goal, goalDeadline);

      setGoal("");
      setGoalDeadline("");

      loadData();
    } catch (error) {
      console.log("Error agregando meta:", error);
    }
  };

  const handleRemoveGoal = async (id) => {
    try {
      await removeGoal(id);
      loadData();
    } catch (error) {
      console.log("Error eliminando meta:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">To Do List</h1>

      {/* ================= TASKS ================= */}

      <div className="card p-4 mb-5">
        <h2 className="mb-4">Tareas</h2>

        <form onSubmit={handleAddTask}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nueva tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-3"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Agregar tarea
          </button>
        </form>

        <hr />

        {tasks.length === 0 ? (
          <p>No hay tareas</p>
        ) : (
          tasks.map((taskItem) => (
            <div
              key={taskItem._id}
              className="d-flex justify-content-between align-items-center border p-3 mb-2 rounded"
            >
              <div>
                <strong>{taskItem.task}</strong>
                <p className="mb-0">
                  Fecha límite: {taskItem.deadline}
                </p>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => handleRemoveTask(taskItem._id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {/* ================= GOALS ================= */}

      <div className="card p-4">
        <h2 className="mb-4">Metas</h2>

        <form onSubmit={handleAddGoal}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nueva meta"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-3"
            value={goalDeadline}
            onChange={(e) => setGoalDeadline(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Agregar meta
          </button>
        </form>

        <hr />

        {goals.length === 0 ? (
          <p>No hay metas</p>
        ) : (
          goals.map((goalItem) => (
            <div
              key={goalItem._id}
              className="d-flex justify-content-between align-items-center border p-3 mb-2 rounded"
            >
              <div>
                <strong>{goalItem.goal}</strong>

                <p className="mb-0">
                  Fecha límite: {goalItem.deadline}
                </p>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => handleRemoveGoal(goalItem._id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;