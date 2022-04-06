import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodo } from '../todoSlice';
import { clearAll,filterTodo } from '../../../features/todo-app/todoSlice';

export interface TodoFooterProps {}
type data = {
  id: string;
  content: string;
  status: boolean;
};
export default function TodoFooter(props: TodoFooterProps) {
  const dispatch = useDispatch();
  const todo1 = useSelector(selectTodo);
  const itemleft = todo1.filter((item: data) => item.status === false);
  const itemCom = todo1.filter((item: data) => item.status === true);
  const clearAllComplete = () => {
    dispatch(clearAll(false));
  };
  const handleFilter = (type1:string) => {
    dispatch(filterTodo(type1));
  };
  if (!todo1.length) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center text-sm">
      <div className="flex justify-between pt-2 w-2/6 border  h-10 border-gray-400 pl-1 pr-1 bg-white">
        <div>
          <p>{itemleft.length} item left</p>
        </div>
        <div>
          <input
            type="button"
            value="All"
            className="focus:outline-none focus:ring focus:ring-red-100"
            onClick={()=>{handleFilter('ALL')}}
          />
          <input
            type="button"
            value="Active"
            className="ml-2 mr-2 focus:outline-none focus:ring focus:ring-red-100"
            onClick={()=>{handleFilter('ACTIVE')}}

          />
          <input
            type="button"
            value="Completed"
            className="focus:outline-none focus:ring focus:ring-red-100"
            onClick={()=>{handleFilter('COMPLETE')}}
          />
        </div>
        <div>
          <input type="button" value="Clear completed" onClick={clearAllComplete} className={`${itemCom.length>0 ?'':'hidden'}`}/>
        </div>
      </div>
    </div>
  );
}
