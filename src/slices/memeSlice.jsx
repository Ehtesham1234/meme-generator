import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  url: "https://api.imgflip.com/get_memes", // Set the initial URL to the API endpoint
  pending: false,
  error: null,
};

export const getMemes = createAsyncThunk("memes/getUser", async () => {
  const { data } = await axios.get(`https://api.imgflip.com/get_memes`);
  return data.data.memes;
});

export const memesReducer = createSlice({
  name: "memes",
  initialState,

  reducers: {
    // You can add other synchronous actions here if needed
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMemes.fulfilled, (state, action) => {
        state.url = getRandomImageUrl(action.payload);
        state.pending = false;
        state.error = null;
      })
      .addCase(getMemes.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getMemes.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

// Helper function to get a random image URL from the received array of memes
function getRandomImageUrl(memes) {
  const randomNumber = Math.floor(Math.random() * memes.length);
  return memes[randomNumber].url;
}

export default memeSlice.reducer;
