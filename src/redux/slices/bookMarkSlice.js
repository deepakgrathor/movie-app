import { createSlice } from "@reduxjs/toolkit";

const BookMarkSlice = createSlice({
  name: "BookMarkSlice",
  initialState: {
    data: [],
    book: false,
  },
  reducers: {
    AddBookMark: (state, action) => {
      const find = state.data.find((item) => item.id === action.payload.id);
      if (!find) {
        state.data.push({ ...action.payload });
        state.book = true;
      } else {
        state.book = false;
      }
    },
    RemoveBookMark: (state, action) => {
      const newData = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      state.data = newData;
    },
  },
});

export const { AddBookMark, RemoveBookMark } = BookMarkSlice.actions;

export default BookMarkSlice.reducer;
