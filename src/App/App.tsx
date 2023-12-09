import { useState } from 'react';
import React from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Todo {
  id: number,
  todo: string,
  completed: boolean
}

const queryClient = new QueryClient();

function App() {

  const [text, setText] = useState<string>('');
  const [editId, setEditId] = useState<number>(0);
  const [editText, setEditText] = useState<string>('');

  const fetchTodos = async () => {
    const response = await fetch('https://dummyjson.com/todos/user/1');
    const data = await response.json()
    .catch(error => console.log(error));
    console.log(data);
    return data.todos.map((el: Todo) => ({ ...el, title: el.todo }));
  };
  
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const handleAddTodo = () => {
    const newTodo = {
      todo: text,
      completed: false,
      id: generateRandomId(),
    }
    addTodoMutation.mutate(newTodo);
    setText('');
  }

  //setQueryData is used because we are not fetching data from the server, but simulating the POST request
  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? [...data, newTodo] : data);
      /*return await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        completed: false,
        todo: newTodo.todo,
        userId: 1,
        
          })
        })
        .then(response => response.json())*/
    },
    /*onSuccess: (response) => {
      console.log(response);
      response.id=generateRandomId();
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? [...data, response] : data);
    },*/
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  }

  const deleteMutation = useMutation({// Fetch request is commented out because dealing with not a real server
    mutationFn: async (id: number) => {
      queryClient.setQueryData(['todos'], data.filter((todo: Todo) => todo.id !== id))
      /*return await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())*/  
    },
   /* onSuccess: (response) => {
      console.log(response);
      queryClient.setQueryData(['todos'], data.filter((todo: Todo) => todo.id !== response.id));
    },*/
  });

  const handleBlur = (id: number) => {
    editMutation.mutate(id);
    setEditId(0);
  }

  const editMutation = useMutation({
    mutationFn: async (id: number) => {
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? data.map((todo: Todo) => todo.id === id ? { ...todo, todo: editText } : todo) : data);
      /*return await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: editText,
        })
      })
      .then(response => response.json())*/
    },
    /*onSuccess: (response) => {
      console.log(response);
      const id = response.id;
      const title = response.todo;
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? data.map((todo: Todo) => todo.id === id ? { ...todo, todo: title } : todo) : data);
    },*/
  });

  const handleCheck = (id: number) => {
    checkMutation.mutate(id);
  }

  const checkMutation = useMutation({
    mutationFn: async (id: number) => {
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? data.map((todo: Todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo) : data);
      /*return await fetch(`https://dummyjson.com/todos/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: checked,
        })
      })
      .then(response => response.json())*/
    },
    /*onSuccess: (response) => {
      console.log(response);
      const id = response.id;
      const completed = response.completed;
      queryClient.setQueryData(['todos'], (data: Todo[]) => data ? data.map((todo: Todo) => todo.id === id ? { ...todo, completed: completed } : todo) : data);
    },*/
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleEdit = (text: string, id: number) => {
    console.log(text, id);
    setEditText(text);
    setEditId(id);
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  }

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-4/12'>
        <header className="App-header">
          <h1 className='my-4 text-xl'>Todos <span>({data.length})</span></h1>
        </header>
          <div className='flex justify-around'>
            <input className="py-2 border w-full" placeholder="What needs to be done?" value={text} onChange={(e) => handleChange(e)} />
            <button className='bg-blue-500 py-2 px-3 text-white' onClick={handleAddTodo}>Submit</button>
          </div>
          <main className="flex items-center">
        <ul className="list-reset w-full">
            {data.map((todo) => (
            <li key={todo.id} className="flex items-center justify-end py-4 border-b box-border">
                <input type="checkbox" className='mr-2 box-border' checked={todo.completed} onChange={() => handleCheck(todo.id)} />
                {editId === todo.id ? <input type="text" className='mr-auto border-2 border-black box-border' value={editText} onBlur={() => handleBlur(todo.id)} onChange={(e) => handleEditChange(e)} /> : <span className="mr-auto box-border">{todo.todo}</span>}
                <button className='mr-2 bg-green-400 px-2 rounded-md text-white box-border' onClick={() => handleEdit(todo.todo, todo.id)}>Edit</button>
                <button className='bg-red-600 rounded-md text-white px-2' onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
            ))}
        </ul>
    </main>
      </div>
    </QueryClientProvider>
  )
}

function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}


export default AppProvider;
