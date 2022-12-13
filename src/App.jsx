import { useEffect, useState } from 'react'
import './App.css'

import Todo from './components/todo/';

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodo] = useState(() => {
    const storedTodos = localStorage.getItem('@reactTodo:todos');

    if(storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });


  useEffect(() => {
    localStorage.setItem('@reactTodo:todos', JSON.stringify(todos))
  }, [todos]);

  function handleInputChange (e) {
    setTodoInput(e.target.value);
  }

  function addTodo () {
    if(todoInput) {
      setTodo((previousTodo) => [...previousTodo, {id: Math.random(), title: todoInput, completed: false}]);
      setTodoInput('');
    }
  }

  function deleteTodo (id) {
    setTodo((previousTodo) => 
      previousTodo.filter((todo) => todo.id !== id)
    );
  }

  function completeTodo (id) {
    setTodo((previousTodo) => 
      previousTodo.map((todo) => todo.id !== id ? todo : { ...todo, completed: !todo.completed})
    )
  }

  return (
    <div className="App">
      <div className='addLine'>
        <button className='addButton' onClick={addTodo}>
          +
        </button>
        <input 
          type="text" 
          placeholder='Adicionar tarefa' 
          value={todoInput} 
          onChange={handleInputChange}
          className='inputTask'
        />
      </div>

      <span className='count'>
        Tarefas:  {todos.length}
      </span>

      {
        todos.map( todo => (
          <Todo key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))
      }
      
    </div>
  )
}

export default App
