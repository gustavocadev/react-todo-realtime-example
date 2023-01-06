import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import './index.css';
import { SocketProvider } from './context/socket/SocketProvider';
import IdTodo from './routes/todo/idTodo';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TodoProvider } from './context/todo/TodoProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<App />} index />
      <Route path="todo">
        <Route path=":id" element={<IdTodo />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <TodoProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </TodoProvider>
    </SocketProvider>
  </React.StrictMode>
);
