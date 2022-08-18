import React from 'react';
import SingleTodoList from './components/SingleTodoList';


function App() {
  return (
    <main className="p-5 flex flex-col items-center">
      <header className="text-4xl">
        <h1 className="text-pink-300 text-6xl p-5">todos</h1>
      </header>
      <SingleTodoList />
    </main>
  );
}

export default App;
