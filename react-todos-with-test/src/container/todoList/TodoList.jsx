import React, { useState } from 'react';
import Header from './components/Header';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const addItem = () => {
    console.log('addItem');
  };
  return (
    <div>
      <Header addItem={addItem}/>
    </div>
  );
};

export default TodoList;
