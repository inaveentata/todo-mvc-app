import React from 'react'
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { RenderTodosProps } from './types';



const RenderTodoItems = ({itemId, todoList, activeTab, completedTab, todosData,setTodosData}: RenderTodosProps) => {
    

    const handleStrikeThrough = (itemId: string, todoId: string) => {
     const targetList = todosData.find((item) => item.id === itemId);

     const sortTodoItems = targetList!.todos.filter(
       (item) => item.id !== todoId
     );
     const targetTodoItem = targetList!.todos.find((item) => item.id === todoId);

     const strikeThrough = {
       id: targetTodoItem!.id,
       text: targetTodoItem!.text,
       isTodoMarked: !targetTodoItem!.isTodoMarked,
     };

     setTodosData((prevData) => {
       return prevData.map((todo) => {
         if (todo.id !== itemId) {
           return todo;
         }
         return {
           ...todo,
           todos: [...sortTodoItems, strikeThrough],
         };
       });
     });
   };


  const deleteTodo = (itemId: string, todoId: string) => {
    const targetList = todosData.find((item) => item.id === itemId);

    const sortTodoItems = targetList!.todos.filter((item) => item.id !== todoId);

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          todos: [...sortTodoItems],
        };
      });
    });
  };



    let todoItems;
    if (activeTab) {
      todoItems = todoList.filter((item) => item.isTodoMarked === false);
    } else if (completedTab) {
      todoItems = todoList.filter((item) => item.isTodoMarked === true);
    } else {
      todoItems = todoList;
    }
    return (
      <>
        {todoItems.map((todo) => (
          <span
            key={todo.id}
            className="flex items-center justify-between px-3 border-b-[1px]"
          >
            <li
              className={`${
                todo.isTodoMarked && "line-through text-gray-300"
              } cursor-pointer py-3 pl-4 text-2xl tracking-wider capitalize`}
              onClick={() => handleStrikeThrough(itemId, todo.id)}
            >
              <span className="flex items-center ">
                {todo.isTodoMarked ? (
                  <BsCheckCircle
                    color="green"
                    style={{
                      marginRight: "1rem",
                      fontSize: "2rem",
                    }}
                  />
                ) : (
                  <BsCircle
                    style={{
                      color: "#e2e8f0",
                      marginRight: "1rem",
                      fontSize: "2rem",
                    }}
                  />
                )}
                {todo.text}
              </span>
            </li>
            <span
              onClick={() => deleteTodo(itemId, todo.id)}
              className=" cursor-pointer 
            opacity-50 hover:opacity-100 "
            >
              <RiCloseLine color="#f43f5e" size={20} />
            </span>
          </span>
        ))}
      </>
    );
  };



export default RenderTodoItems