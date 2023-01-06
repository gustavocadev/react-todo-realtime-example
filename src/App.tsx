import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSocketContext } from './hooks/useSocketContext';
import type { Todo } from './types/Todo';
import { TodoContext } from './context/todo/TodoContext';

function App() {
  // connect socket
  const { online, socket } = useSocketContext();
  const { todos } = useContext(TodoContext);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoName = formData.get('todoName') as string;
    if (todoName.trim().length === 0) return;

    socket.emit('createTodo', { title: todoName });
    e.currentTarget.reset();
  };

  const handleDeleteTodo = (
    e: React.FormEvent<HTMLFormElement>,
    todoId: string
  ) => {
    e.preventDefault();
    socket.emit('deleteTodo', {
      todoId,
    });
  };

  return (
    <main className="px-[20px] sm:px-[100px] xl:px-[400px] my-4">
      <h2 className="text-center text-4xl font-bold">My Todos</h2>
      <form className="flex gap-2 flex-col" onSubmit={handleAddTodo}>
        <label htmlFor="todo" className="text-3xl font-bold">
          Todo
        </label>

        <input
          type="text"
          name="todoName"
          className="border rounded p-2 w-full text-white bg-gray-900 outline-none border-none"
          autoFocus
          id="todo"
        />
        <button
          type="submit"
          className="bg-purple-500 rounded w-full py-2 px-4 hover:bg-purple-600 text-xl font-semibold text-white"
        >
          Add
        </button>
      </form>
      <ul className="text-xl px-4 mt-4 flex flex-col gap-4">
        {todos?.map((todo, idx) => {
          return (
            <li className="p-4 bg-purple-200 rounded flex flex-col gap-4 sm:gap-1 sm:flex-row justify-between items-center text-black">
              <p>
                {idx + 1}. {todo?.title}
              </p>
              <section className="flex gap-2">
                <form onSubmit={(event) => handleDeleteTodo(event, todo?._id)}>
                  <button
                    className="px-4 py-2 rounded bg-red-300 hover:bg-red-400"
                    type="submit"
                  >
                    Delete
                  </button>
                  <input type="hidden" name="todoId" value={todo?._id} />
                </form>

                <Link
                  to={`/todo/${todo?._id}`}
                  className="px-4 py-2 rounded bg-yellow-200 hover:bg-yellow-300"
                >
                  Edit
                </Link>
              </section>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
