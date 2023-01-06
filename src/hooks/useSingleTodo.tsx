import { useQuery } from '@tanstack/react-query';

const getTodoById = async (id: string) => {
  const resp = await fetch(`${import.meta.env.VITE_ORIGIN_URL}/api/todo/${id}`);
  const data = await resp.json();
  console.log(data);
  return data;
};

export const useSingleTodo = (id: string) => {
  const query = useQuery(['todo'], () => getTodoById(id), {});
  return query;
};
