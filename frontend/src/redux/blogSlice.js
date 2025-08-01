import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    blog: null,
  },
  reducers: {
    //actions

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
