import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  CALCULATE_TOTAL_TASKS,
} from "./actions";

const initialState = { tasks: [], totalTasks: 0 };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const updatedTasks = [...state.tasks, action.payload];
      return { ...state, tasks: updatedTasks, totalTasks: updatedTasks.length };
    }
    case REMOVE_TASK: {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return { ...state, tasks: updatedTasks, totalTasks: updatedTasks.length };
    }
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case CALCULATE_TOTAL_TASKS:
      return {
        ...state,
        totalTasks: state.tasks.length,
      };
    default:
      return state;
  }
};
export default taskReducer;
