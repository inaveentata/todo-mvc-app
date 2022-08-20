import React, { Dispatch, SetStateAction } from 'react'
import { v4 as uuid } from "uuid";
import { TodosData } from "./types";

type FormInputProps = {
  title: string;
  itemId: string;
  itemText: string;
  todosData: TodosData[];
  setTodosData: Dispatch<SetStateAction<TodosData[]>>;
};

const FormInputs = (
    { title, itemId, itemText,todosData,setTodosData }: FormInputProps) => {
      
    
    const handleTitle = (
        id: string,
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const { name, value } = e.target;
        setTodosData((prevData) => {
          return prevData.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return {
              ...todo,
              [name]: value,
            };
          });
        });
      };
      const handleChange = (
        id: string,
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const { name, value } = e.target;
        setTodosData((prevData) => {
          return prevData.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return {
              ...todo,
              todoItem: { ...todo.todoItem, [name]: value },
            };
          });
        });
      };

      const handleSubmit = (
        id: string,
        e: React.FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();
        const targetList = todosData.find((item) => item.id === id);
        const newTodo = {
          id: targetList!.todoItem.id,
          text: targetList!.todoItem.text,
          isTodoMarked: targetList!.todoItem.isTodoMarked,
        };

        setTodosData((prevData) => {
          return prevData.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return {
              ...todo,
              todos: [...todo.todos, newTodo],
            };
          });
        });

        setTodosData((prevData) => {
          return prevData.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return {
              ...todo,
              todoItem: { id: uuid(), text: "", isTodoMarked: false },
            };
          });
        });
      };
  return (
    <React.Fragment>
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => handleTitle(itemId, e)}
        placeholder="Title"
        className="capitalize tracking-wide text-center font-medium placeholder:font-medium text-blue-700 placeholder:text-gray-200 px-3 border-b-[1px] text-4xl shadow-md border-gray-200 h-16 w-full outline-none"
      />
      <form
        onSubmit={(e) => {
          handleSubmit(itemId, e);
        }}
      >
        <input
          className="placeholder:italic placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-12 w-full outline-none tracking-wider"
          placeholder="What needs to be done ?"
          name="text"
          type="text"
          value={itemText}
          onChange={(e) => handleChange(itemId, e)}
        />
      </form>
    </React.Fragment>
  );
}

export default FormInputs