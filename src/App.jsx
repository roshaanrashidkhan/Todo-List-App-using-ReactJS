import './App.css';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddButton from './components/AddButton';
import { useState, useEffect } from 'react';

function App() {
  const [visibility, setVisibility] = useState(false)
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let storedTodo = localStorage.getItem("todos");
    if (storedTodo) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  return (
    <>
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='container w-[85vw] sm:max-w-[450px] py-4 border bg-white rounded-lg'>
        <Header onClick={()=> {setVisibility(true)}} visibility={visibility}/>
        {visibility && < AddButton editingId={editingId} setEditingId={setEditingId} todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} />}
        <ToDoList setEditingId={setEditingId} todos={todos} setTodos={setTodos} setTodo={setTodo} setVisibility={setVisibility} />
      </div>
    </div>
    </>
  );
};

export default App;