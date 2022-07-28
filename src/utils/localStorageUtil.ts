import { Todo } from "../types/types";

export const localStorageUtil = {
  getTodos: () => {
    return localStorage.getItem("todos") !== "undefined"
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("todos"))
      : localStorage.clear();
  },
  addTodo: (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};
