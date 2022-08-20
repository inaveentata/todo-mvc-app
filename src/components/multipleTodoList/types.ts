import { Dispatch, SetStateAction } from "react";

export type TodoItem = {
  id: string;
  text: string;
  isTodoMarked: boolean;
};

export type TodosData = {
  id: string;
  title: string;
  todoItem: TodoItem;
  todos: TodoItem[];
  isActiveTodosTab: boolean;
  isCompletedTodosTab: boolean;
};

export type RenderTodosProps = {
  itemId: string;
  todoList: TodoItem[];
  activeTab: boolean;
  completedTab: boolean;
  todosData: TodosData[];
  setTodosData: Dispatch<SetStateAction<TodosData[]>>;
};
