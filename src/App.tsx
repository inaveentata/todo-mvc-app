import React from "react";
import MultipleTodoList from "./components/multipleTodoList/MultipleTodoList";

function App() {
  return (
    <main className="p-5 flex flex-col items-center">
      <header className="text-4xl">
        <h1 className="text-pink-300 text-7xl p-5">todos</h1>
      </header>
      <MultipleTodoList />
    </main>
  );
}

export default App;
