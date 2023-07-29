// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   url: "https://api.imgflip.com/get_memes", // Set the initial URL to the API endpoint
//   pending: false,
//   error: null,
// };

// export const getMemes = createAsyncThunk("memes/getUser", async () => {
//   const { data } = await axios.get(`https://api.imgflip.com/get_memes`);
//   return data.data.memes;
// });

// export const memesReducer = createSlice({
//   name: "memes",
//   initialState,

//   reducers: {
//     // You can add other synchronous actions here if needed
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(getMemes.fulfilled, (state, action) => {
//         console.log(action.payload);
//         state.url = getRandomImageUrl(action.payload);
//         state.pending = false;
//         state.error = null;
//       })
//       .addCase(getMemes.pending, (state) => {
//         state.pending = true;
//         state.error = null;
//       })
//       .addCase(getMemes.rejected, (state, action) => {
//         state.pending = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Helper function to get a random image URL from the received array of memes
// function getRandomImageUrl(memes) {
//   const randomNumber = Math.floor(Math.random() * memes.length);
//   return memes[randomNumber].url;
// }

// export default memeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMemes = createAsyncThunk("meme/fetchMemes", async () => {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  return data.data.memes;
});

const initialState = {
  topText: "",
  bottomText: "",
  randomImages: "https://api.imgflip.com/get_memes",
  allMemes: [],
};

const memeSlice = createSlice({
  name: "meme",
  initialState,
  reducers: {
    setMeme(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        // You can handle loading state here if needed
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.allMemes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        // You can handle error state here if needed
      });
  },
});

export const { setMeme } = memeSlice.actions;
export default memeSlice.reducer;
