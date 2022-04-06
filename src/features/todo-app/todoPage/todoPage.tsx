import * as React from 'react';
import TodoForm from '../todoForm/todoForm';
import TodoList from '../todoList/todoList';
import TodoFooter from '../todoFooter/todoFooter';

export interface TodoPageProps {}

export default function TodoPage(props: TodoPageProps) {
  return (
    <div className="h-screen w-screen bg-[#f5f5f5]">
        <div className="text-red-200 text-center text-7xl">
          <h1>todos</h1>
        </div>
        <TodoForm />
        <TodoList />
        <TodoFooter />
      </div>
  );
}
