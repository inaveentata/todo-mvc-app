import React from 'react'
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { TodoItem } from '../SingleTodoList';

type TodoItemProps = {
  todoList: TodoItem[];
  handleStrikeThrough: (id: string) => void;
  deleteTodo:(id: string)=> void
}

const TodoItems = ({ todoList, handleStrikeThrough, deleteTodo }: TodoItemProps) => {
  
  return (
    
    <>
      {
        todoList.length > 0 &&
    todoList.map((item) => (
      <span
        key={item.id}
        className="flex items-center justify-between px-3 border-b-[1px]"
      >
        <li
          onClick={() => handleStrikeThrough(item.id)}
          className={`${
            item.isTodoMarked && "line-through text-gray-300"
          } cursor-pointer  py-3 pl-4 text-2xl`}
        >
          <span className="flex items-center ">
            {item.isTodoMarked ? (
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
            {item.text}
          </span>
        </li>
        <span
          onClick={() => deleteTodo(item.id)}
          className=" cursor-pointer 
            opacity-50 hover:opacity-100 "
        >
          <RiCloseLine color="#f43f5e" size={20} />
        </span>
      </span>
    ))
      }
    </>
  )
}

export default TodoItems