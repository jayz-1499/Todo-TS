import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoPage from './features/todo-app/todoPage/todoPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <TodoPage />
    </div>
  );
}

export default App;
