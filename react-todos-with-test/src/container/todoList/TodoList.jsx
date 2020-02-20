import React, { useState } from 'react';
import Header from './components/Header';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  return (
    <div>
      <Header/>
    </div>
  );
};

export default TodoList;
