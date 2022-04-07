import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';

export interface TodoState {
  todo: [];
  status: 'ALL' | 'ACTIVE' | 'COMPLETE';
}
type data = {
  id: string;
  content: string;
  status: boolean;
};
const getList = ()=>{
  const data = localStorage.getItem('todo');
    if(data === null){
      return '';
    }else{
      return data;
    }
}
export const getData: any = createAsyncThunk('todos/getData', async () => {
 return JSON.parse(getList());
});
const initialState: TodoState = {
  todo: [],
  status: 'ALL',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addData: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      state.todo.push(action.payload);
    },
    removeData: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      const index = action.payload;
      const newac = state.todo.filter((item) => item.id !== index);
      state.todo = newac;
    },
    updateStatus: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      state.todo = state.todo.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    updateContent: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      state.todo.forEach((item) => {
        if (item.id === action.payload.id) {
          item.content = action.payload.content;
        }
      });
    },
    selectAll: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      state.todo.forEach((item) => {
        item.status = action.payload;
      });
    },
    clearAll: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      const newac = state.todo.filter((item) => item.status === action.payload);
      state.todo = newac;
    },
    filterTodo: (
      state: {
        todo: data[];
        status: string;
      },
      action
    ) => {
      state.status = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider.addCase(getData.fulfilled, (state, action) => {
     state.todo = action.payload;
    });
  },
});
export const {
  addData,
  removeData,
  updateStatus,
  updateContent,
  selectAll,
  clearAll,
  filterTodo,
} = todoSlice.actions;
export const selectTodo = (state: any) => state.todos.todo;
export const selectType = (state: any) => state.todos.status;
export default todoSlice.reducer;
