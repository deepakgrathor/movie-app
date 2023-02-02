import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    data: "",
  },
  reducers: {
    getData: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      } else {
        state.data = "";
      }
    },
  },
});

export const { getData } = SearchSlice.actions;

export default SearchSlice.reducer;
