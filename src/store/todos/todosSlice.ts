import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/types";

const initialState = {
  todos: [] as Todo[],
  doneTodos: [] as Todo[],
  doingTodos: [] as Todo[],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => action.payload !== todo.id);
    },
    editTodo: (state, action) => {
      state.todos.forEach((todo, i) => {
        if (todo.id === action.payload.id) {
          state.todos[i].text = action.payload.text;
        }
      });
    },
    setDone: (state, action) => {
      state.todos.forEach((todo, i) => {
        if (todo.id === action.payload) {
          state.todos[i].done = true;
        }
      });
    },
    setDoing: (state, action) => {
      state.todos.forEach((todo, i) => {
        if (todo.id === action.payload) {
          state.todos[i].done = false;
        }
      });
    },
    setDoneTodos: (state, action: PayloadAction<Todo[]>) => {
      state.doneTodos = action.payload;
    },
    setDoingTodos: (state, action: PayloadAction<Todo[]>) => {
      state.doingTodos = action.payload;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const todosActions = todosSlice.actions;
