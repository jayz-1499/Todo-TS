import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  todoSlice  from '../features/todo-app/todoSlice';
export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
