import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItems from "./subcomponents/TodoItems";

export type TodoItem = {
  id: string;
  text: string;
  isTodoMarked: boolean;
};

const SingleTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
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

  const clearCompleted = () => {
    const active = todoList.filter((item) => item.isTodoMarked === false);
    setTodoList(active);
    setActiveTab({
      isTodosActive: false,
      isTodosCompleted: false,
    });
  };

  const itemsLeft = todoList.filter((item) => item.isTodoMarked === false);
  const itemsLeftText =
    itemsLeft.length === 1
      ? `${itemsLeft.length} item left`
      : `${itemsLeft.length} items left`;
  
  let renderTodos: TodoItem[]
  if (activeTab.isTodosActive) {
    renderTodos = todoList.filter((item) => item.isTodoMarked === false);
  } else if (activeTab.isTodosCompleted) {
    renderTodos = todoList.filter((item) => item.isTodoMarked === true);
  } else {
    renderTodos = todoList;
  }
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
        {
          <TodoItems
            todoList={renderTodos}
            handleStrikeThrough={handleStrikeThrough}
            deleteTodo={deleteTodo}
          />
        }
      </ul>
      {todoList.length ? (
        <div className="p-2 flex justify-between text-gray-500">
          {itemsLeft.length === 0 ? (
            <span>No active items</span>
          ) : (
            <span>{itemsLeftText}</span>
          )}
          <div>
            <button
              onClick={() =>
                setActiveTab({
                  isTodosActive: false,
                  isTodosCompleted: false,
                })
              }
              className={` px-1 rounded-sm ${
                !activeTab.isTodosActive && !activeTab.isTodosCompleted && "border-[1.5px] border-pink-300"
              } `}
            >
              All
            </button>
            <button
              onClick={() =>
                setActiveTab({
                  isTodosActive: true,
                  isTodosCompleted: false,
                })
              }
              className={`mx-5 px-1 rounded-sm ${
                activeTab.isTodosActive && "border-[1.5px] border-pink-300"
              } `}
            >
              Active
            </button>
            <button
              onClick={() =>
                setActiveTab({
                  isTodosActive: false,
                  isTodosCompleted: true,
                })
              }
              className={`px-1 rounded-sm ${
                activeTab.isTodosCompleted && "border-[1.5px] border-pink-300"
              }`}
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted} className=" hover:underline">
            Clear completed
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default SingleTodoList;
