import { useState } from 'react';
import React from 'react';

interface Todo {
  id: number,
  content: string,
  completed: boolean
}

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');
  
  const handleAddTodo = () => {
    console.log('handleAddTodo');
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      content: text,
      completed: false
    }
    console.log(newTodo);
    setTodos([...todos, newTodo])
    setText('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleEdit = (text: string) => {
    setEditText(text);
    setIsEdit(true);
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  }

  const handleDelete = (id: number) => {
    console.log('handleDelete');
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const handleBlur = (id: number) => {
    const newTodos = todos.map(todo => {if(todo.id === id) todo.content = editText; return todo});
    setTodos(newTodos);
    setIsEdit(false);
  }

  return (
    <div className='w-4/12'>
      <header className="App-header">
        <h1 className='my-4 text-xl'>Todos <span>({todos.length})</span></h1>
      </header>
        <div className='flex justify-around'>
          <input className="py-2 border w-full" placeholder="What needs to be done?" value={text} onChange={(e) => handleChange(e)} />
          <button className='bg-blue-500 py-2 px-3 text-white' onClick={handleAddTodo}>Submit</button>
        </div>
        <main className="flex items-center">
          <ul className="list-reset w-full">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-end py-4 border-b box-border">
                <input type="checkbox" className='mr-2 box-border' />
                {isEdit ? <input type="text" className='mr-auto border-2 border-black box-border' value={editText} onBlur={() => handleBlur(todo.id)} onChange={(e) => handleEditChange(e)} /> : <span className="mr-auto box-border">{todo.content}</span>}
                <button className='mr-2 bg-green-400 px-2 rounded-md text-white box-border' onClick={() => handleEdit(todo.content)}>Edit</button>
                <button className='bg-red-600 rounded-md text-white px-2' onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </main>
        
      
    </div>
  )
}
export default App;
