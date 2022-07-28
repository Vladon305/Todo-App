import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { todosActions } from "../store/todos/todosSlice";

const allActions = {
  ...todosActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
