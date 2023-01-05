import { useQuery } from '@tanstack/react-query';

const getTodoById = async (id: string) => {
  const resp = await fetch(
    `https://node-todo-realtime-app.onrender.com/api/todo/${id}`
  );
  const data = await resp.json();
  return data;
};

export const useSingleTodo = (id: string) => {
  const query = useQuery(['todo'], () => getTodoById(id));
  return query;
};
