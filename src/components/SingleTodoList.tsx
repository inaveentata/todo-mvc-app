import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItems from "./subcomponents/TodoItems";

export type TodoType = {
  id: string;
  text: string;
  isTodoMarked: boolean;
};

const SingleTodoList = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [activeTodos, setActiveTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const [activeTab, setActiveTab] = useState({
    isTodosActive: false,
    isTodosCompleted: false,
  });
  const [todo, setTodo] = useState({
    id: uuid(),
    text: "",
    isTodoMarked: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const deleteTodo = (id: string) => {
    const sortedItems = todoList.filter((item) => item.id !== id);
    setTodoList(sortedItems);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: todo.id,
      text: todo.text,
      isTodoMarked: todo.isTodoMarked,
    };
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
    setTodo({
      id: uuid(),
      text: "",
      isTodoMarked: false,
    });
  };

  const handleStrikeThrough = (id: string) => {
    const sortedItems = todoList.filter((item) => item.id !== id);
    const targetItem = todoList.find((item) => item.id === id);
    const strikeThrough = {
      id: targetItem!.id,
      text: targetItem!.text,
      isTodoMarked: !targetItem!.isTodoMarked,
    };
    setTodoList([...sortedItems, strikeThrough]);
  };

  const showCompleted = () => {
    setActiveTab((prevTabs) => ({
      ...prevTabs,
      isTodosCompleted: true,
      isTodosActive: false,
    }));
    const completed = todoList.filter((item) => item.isTodoMarked === true);
    setCompletedTodos(completed);
  };

  const showActive = () => {
    setActiveTab((prevTabs) => ({
      ...prevTabs,
      isTodosActive: true,
      isTodosCompleted: false,
    }));
    const active = todoList.filter((item) => item.isTodoMarked === false);
    setActiveTodos(active);
  };

  const clearCompleted = () => {
    const active = todoList.filter((item) => item.isTodoMarked === false);
    setTodoList(active);
    setActiveTab((prevTabs) => ({
      ...prevTabs,
      isTodosActive: false,
      isTodosCompleted: false,
    }));
  };

  const itemsLeft = todoList.filter((item) => item.isTodoMarked === false);
  const itemsLeftText =
    itemsLeft.length === 1
      ? `${itemsLeft.length} item left`
      : `${itemsLeft.length} items left`;
  return (
    <section
      className="bg-white shadow-lg 
          border-2 border-gray-50 w-1/2 max-w-2xl"
    >
      <form onSubmit={handleSubmit}>
        <input
          className="placeholder:italic placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-16 w-full outline-none"
          name="text"
          type="text"
          placeholder="What needs to be done ?"
          value={todo.text}
          onChange={handleChange}
        />
      </form>
      <ul className="list-none ">
        {todoList.length && activeTab.isTodosCompleted ? (
          <TodoItems
            todoList={completedTodos}
            handleStrikeThrough={handleStrikeThrough}
            deleteTodo={deleteTodo}
          />
        ) : activeTab.isTodosActive ? (
          <TodoItems
            todoList={activeTodos}
            handleStrikeThrough={handleStrikeThrough}
            deleteTodo={deleteTodo}
          />
        ) : (
          <TodoItems
            todoList={todoList}
            handleStrikeThrough={handleStrikeThrough}
            deleteTodo={deleteTodo}
          />
        )}
      </ul>
      {todoList.length ? (
        <div className="p-2 flex justify-between text-gray-600">
          {itemsLeft.length === 0 ? (
            <span>No active items</span>
          ) : (
            <span>{itemsLeftText}</span>
          )}
          <div>
            <button
              onClick={() =>
                setActiveTab((prevTabs) => ({
                  ...prevTabs,
                  isTodosActive: false,
                  isTodosCompleted: false,
                }))
              }
            >
              All
            </button>
            <button onClick={showActive} className="mx-5">
              Active
            </button>
            <button onClick={showCompleted}>Completed</button>
          </div>
          <button onClick={clearCompleted} className=" hover:underline">
            {/* {completedTodos.length?  "Clear completed" : ''} */}
            Clear completed
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default SingleTodoList;
