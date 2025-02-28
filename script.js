import taskReducer from "./taskReducer";
import { createStore } from "redux";
import {
  addTask,
  removeTask,
  toggleTask,
  calculateTotalTasks,
} from "./actions";

const store = createStore(taskReducer);

store.subscribe(() => {
  console.log(store.getState());
  renderTasks();
});

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const addTaskBtn = document.querySelector("#addTaskBtn");
const inputRemoveTaskId = document.querySelector("#inputRemoveTaskId");
const removeTaskBtn = document.querySelector("#removeTaskBtn");
const taskList = document.querySelector("#taskList");
const totalTasks = document.querySelector("#totalTasks");

const renderTasks = () => {
  const state = store.getState();
  taskList.innerHTML = state.tasks
    .map(
      (task, index) => `
    <li>
      <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${
        task.id
      }">
      <b>${index + 1}. ${task.title}:</b> ${task.description} ${
        task.completed ? "- Completed" : ""
      }
    </li>
  `
    )
    .join("");

  totalTasks.textContent = `Total Tasks: ${state.totalTasks}`;

  document
    .querySelectorAll("#taskList input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const taskId = Number(event.target.getAttribute("data-id"));
        store.dispatch(toggleTask(taskId));
      });
    });
};

addTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value;
  const description = taskDescription.value;
  if (title && description) {
    const state = store.getState();
    const newId =
      state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1;

    store.dispatch(
      addTask({ id: newId, title, description, completed: false })
    );
    store.dispatch(calculateTotalTasks());
    taskTitle.value = "";
    taskDescription.value = "";
  }
});

removeTaskBtn.addEventListener("click", () => {
  const taskId = Number(inputRemoveTaskId.value.trim());
  if (!isNaN(taskId)) {
    store.dispatch(removeTask(taskId));
    store.dispatch(calculateTotalTasks());
  }
  inputRemoveTaskId.value = "";
});
