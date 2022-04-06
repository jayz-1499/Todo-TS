import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addData } from '../../../features/todo-app/todoSlice';
import { selectTodo } from '../todoSlice';
import { selectAll } from '../../../features/todo-app/todoSlice';
export interface TodoFormProps {}
type formValue = {
  id: string;
  content: string;
  status: boolean;
};
export default function TodoForm(props: TodoFormProps) {
  const [contentValue, setContentValue] = useState('');
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  const [allStatus, setAllStatus] = useState(true);

  const itemleft = todo.filter((item: formValue) => item.status === false);

  const handleSubmitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: formValue = {
      id: uuidv4(),
      content: contentValue.trim(),
      status: false,
    };
    const reg = /(.|\s)*\S(.|\s)*/g;
    if (values.content.trim().match(reg)) {
      const action = addData(values);
      dispatch(action);
      setContentValue('');
    }
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(e.target.value);
  };
  const handleStatus = () => {
    // setAllStatus(!allStatus);
    dispatch(selectAll(itemleft.length !== 0));
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="w-2/6">
        <form onSubmit={handleSubmitValue}>
          <input
            type="button"
            value="↓"
            className="h-16 w-1/6 border border-r-0 text-gray-400 border-gray-400 bg-white"
            onClick={handleStatus}
          />
          <input
            type="text"
            placeholder="What need to be done?"
            className="h-16 w-5/6 border-l-0 border-gray-400 italic "
            value={contentValue}
            onChange={handleValueChange}
          />
        </form>
      </div>
    </div>
  );
}
