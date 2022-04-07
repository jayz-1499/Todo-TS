import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodo, selectType } from '../todoSlice';
import {
  removeData,
  updateStatus,
  updateContent,
  getData
} from '../../../features/todo-app/todoSlice';

export interface TodoListProps {}
type data = {
  id: string;
  content: string;
  status: boolean;
};

export default function TodoList(props: TodoListProps) {
  const dispatch = useDispatch();
  const todo1 = useSelector(selectTodo);
  const typeData = useSelector(selectType);
  const [hide, setHide] = useState(false);
  const [inputId, setInputID] = useState('');
  const [content, setContent] = useState('');
  const [load, setLoad] = useState(false);
  console.log(todo1);
  const handleDelete = (todo: data) => {
    dispatch(removeData(todo.id));
  };

  useEffect(() => {
     dispatch(getData());
  },[]);
  useEffect(() => {
    if(load){

      localStorage.setItem('todo',JSON.stringify(todo1));
    }else{
      setLoad(true);
    }
  },[todo1]);

  const handleChangeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string,
    todoContent: string
  ) => {
    const action = updateStatus({
      id: todoId,
      content: todoContent,
      status: e.target.checked,
    });
    dispatch(action);
  };
  const handleHide = (todo: data) => {
    setHide(true);
    setInputID(todo.id);
    setContent(todo.content);
  };
  const handleUpdate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idTodo: string,
    content: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const action = updateContent({
        id: idTodo,
        content: content,
      });
      dispatch(action);
      setHide(false);
    }
  };
  const handeChangeNewContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const display = todo1.filter((item: data) => {
    switch (typeData) {
      case 'ACTIVE':
        return !item.status;
      case 'COMPLETE':
        return item.status;
      default:
        return true;
    }
  });
  console.log(typeData);

  return (
    <>
      {display.map((item: data) => (
        <div
          key={item.id}
          className=" flex flex-col justify-center items-center "
        >
          <div className="w-2/6 border border-t-0 h-16 border-gray-400 group bg-white">
            <form className="mt-4 pl-2 pr-2 ">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="h-7 w-7 border border-gray-300 mt-0 align-top float-left mr-2  bg-white"
                  checked={item.status}
                  onChange={(e) => {
                    handleChangeCheckBox(e, item.id, item.content);
                  }}
                />
                <label
                  className={`ml-2 w-3/4 form-check-label inline-block text-gray-800 text-lg ${
                    hide === true && item.id === inputId ? 'hidden' : ''
                  }`}
                  onDoubleClick={() => handleHide(item)}
                >
                  {item.content}
                </label>
                {item.id === inputId && (
                  <input
                    type="text"
                    className={`ml-2 w-3/4 form-check-label inline-block text-gray-800 text-lg ${
                      hide === false && item.id === inputId ? 'hidden' : ''
                    }`}
                    value={content}
                    onChange={handeChangeNewContent}
                    onKeyPress={(e) => handleUpdate(e, item.id, content)}
                    autoFocus
                  />
                )}
                <input
                  type="button"
                  value="X"
                  className="text-red-500 float-right hidden group-hover:block"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}
