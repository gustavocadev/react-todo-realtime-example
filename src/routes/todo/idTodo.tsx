import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSingleTodo } from '../../hooks/useSingleTodo';
import { useSocketContext } from '../../hooks/useSocketContext';
type Props = {};

const idTodo = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const queryTodo = useSingleTodo(params.id as string);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    setEditName(queryTodo.data?.title);
  }, [queryTodo.data]);

  const handleEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as {
      todoName: string;
    };

    if (formData.todoName?.trim().length === 0) return;
    socket.emit('updateTodo', {
      id: params.id,
      title: formData.todoName,
    });

    navigate('/');
  };

  return (
    <div className="px-[20px] sm:px-[100px] xl:px-[400px] my-4">
      <form className="flex flex-col gap-4 " onSubmit={handleEditTodo}>
        <label htmlFor="" className="text-4xl font-bold">
          Update your Todo
        </label>
        <input
          type="text"
          name="todoName"
          className="border p-2 rounded bg-gray-900 border-none"
          autoFocus
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <input type="hidden" name="todoId" />
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-500 rounded py-2 flex items-center justify-center text-black "
          disabled={queryTodo.isLoading}
        >
          {queryTodo.isLoading ? (
            <div
              className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-gray-700 rounded-full disabled:opacity-50"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <h2>Update</h2>
          )}
        </button>
      </form>
    </div>
  );
};
export default idTodo;
