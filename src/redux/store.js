import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import bookMarkSlice from "./slices/bookMarkSlice";

const store = configureStore({
  reducer: {
    SearchSlice: searchSlice,
    BookMarkSlice: bookMarkSlice,
  },
});

export default store;
