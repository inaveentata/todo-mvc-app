import React from "react";
import { TodoItem, RenderTodosProps } from "./types";

type ItemsSatausProps = RenderTodosProps
const ItemsStatus = ({
  itemId, todoList,
  activeTab,
  completedTab,
  todosData,
  setTodosData,
}: ItemsSatausProps) => {
  const clearCompletedTodos = (itemId: string) => {
    const targetList = todosData.find((item) => item.id === itemId);

    const sortTodoItems = targetList!.todos.filter(
      (item) => item.isTodoMarked === false
    );

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

  const allTodos = (itemId: string) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: false,
          isCompletedTodosTab: false,
        };
      });
    });
  };

  const activeTodos = (itemId: string) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: true,
          isCompletedTodosTab: false,
        };
      });
    });
  };

  const completedTodos = (itemId: string) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: false,
          isCompletedTodosTab: true,
        };
      });
    });
  };

function itemsLength(items: TodoItem[]) {
  const itemsLeft = items.filter((item) => item.isTodoMarked === false);
  return (
    <>
      {itemsLeft.length === 0 ? (
        <span>No active items</span>
      ) : itemsLeft.length === 1 ? (
        <span>{`${itemsLeft.length} item left`}</span>
      ) : (
        <span>{`${itemsLeft.length} items left`}</span>
      )}
    </>
  );
}

  return (
      <React.Fragment>
        {itemsLength(todoList)}
      <div>
        <button
          onClick={() => allTodos(itemId)}
          className={` px-1 rounded-sm ${
            !activeTab && !completedTab && "border-[1.5px] border-pink-300"
          } `}
        >
          All
        </button>
        <button
          onClick={() => activeTodos(itemId)}
          className={`mx-5 px-1 rounded-sm ${
            activeTab && "border-[1.5px] border-pink-300"
          } `}
        >
          Active
        </button>
        <button
          onClick={() => completedTodos(itemId)}
          className={` px-1 rounded-sm ${
            completedTab && "border-[1.5px] border-pink-300"
          } `}
        >
          Completed
        </button>
      </div>
      <button
        onClick={() => clearCompletedTodos(itemId)}
        className=" hover:underline"
      >
        Clear completed
      </button>
    </React.Fragment>
  );
};

export default ItemsStatus;
