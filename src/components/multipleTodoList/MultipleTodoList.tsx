import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BsPlus } from "react-icons/bs";
import RenderTodoItems from "./RenderTodoItems";
import FormInputs from "./FormInputs";
import ItemsStatus from "./ItemsStatus";
import {  TodosData } from "./types";


const MultipleTodoList = () => {
  const [todosData, setTodosData] = useState<TodosData[]>([
    {
      id: uuid(),
      title: "",
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    },
  ]);
  const deleteList = (itemId: string) => {
    setTodosData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const addList = () => {
    const list = {
      id: uuid(),
      title: "",
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    };
    setTodosData((prevData) => [...prevData, list]);
  };

  return (
    <>
      <div className="">
        <div
          className={` 
         sm: w-full
        ${todosData.length > 1 && "lg:columns-2"}
        ${todosData.length > 2 && "2xl:columns-3"}
          gap-10 [column-fill:_balance] `}
        >
          {todosData.length
            ? todosData.map((item) => {
                return (
                  <section
                    className="bg-white  shadow-lg border-2 mx-auto border-gray-50 mb-5 break-inside-avoid max-w-2xl"
                    key={item.id}
                  >
                    <FormInputs
                      title={item.title}
                      itemId={item.id}
                      itemText={item.todoItem.text}
                      todosData={todosData}
                      setTodosData={setTodosData}
                    />
                    <ul>
                      <RenderTodoItems
                        itemId={item.id}
                        todoList={item.todos}
                        activeTab={item.isActiveTodosTab}
                        completedTab={item.isCompletedTodosTab}
                        todosData={todosData}
                        setTodosData={setTodosData}
                      />
                    </ul>
                    {item.todos.length ? (
                      <div className="p-2 flex justify-between text-gray-600">
                        <ItemsStatus
                          itemId={item.id}
                          todoList={item.todos}
                          activeTab={item.isActiveTodosTab}
                          completedTab={item.isCompletedTodosTab}
                          todosData={todosData}
                          setTodosData={setTodosData}
                        />
                      </div>
                    ) : null}
                    {todosData.length > 1 && (
                      <button
                        className="tracking-wider w-full bg-pink-300 hover:bg-pink-400 duration-[0.3s] hover:ease-linear"
                        onClick={() => deleteList(item.id)}
                      >
                        Delete List
                      </button>
                    )}
                  </section>
                );
              })
            : null}
        </div>
      </div>
      <button
        onClick={addList}
        className="rounded-md border-[2px] hover:border-pink-400 hover:bg-transparent bg-pink-300 py-2 w-24 mt-20 active:translate-y-[2px] 
         duration-[0.3s] hover:ease-linear"
      >
        <span className="flex">
          <BsPlus size={25} />
          Add List
        </span>
      </button>
    </>
  );
};

export default MultipleTodoList;
