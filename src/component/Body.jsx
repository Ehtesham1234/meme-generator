// import React, { useState, useEffect } from "react";

// export default function Body() {
//   const [meme, setMeme] = useState({
//     topText: "",
//     bottomText: "",
//     randomImages: "https://api.imgflip.com/get_memes",
//   });
//   const [allMemes, setAllMemes] = useState([]);
//   useEffect(() => {
//     async function getMemes() {
//       const res = await fetch("https://api.imgflip.com/get_memes");
//       const data = await res.json();
//       setAllMemes(data.data.memes);
//     }
//     getMemes();
//   }, []);

//   function getMemeImage() {
//     const randomNumber = Math.floor(Math.random() * allMemes.length);
//     const url = allMemes[randomNumber].url;
//     setMeme((prevMeme) => ({
//       ...prevMeme,
//       randomImages: url,
//     }));
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setMeme((prevMeme) => ({
//       ...prevMeme,
//       [name]: value,
//     }));
//   }

//   return (
//     <main>
//       <div className="form">
//         <input
//           type="text"
//           placeholder="Top text"
//           className="form--input"
//           name="topText"
//           value={meme.topText}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Bottom text"
//           className="form--input"
//           name="bottomText"
//           value={meme.bottomText}
//           onChange={handleChange}
//         />
//         <button className="form--button" onClick={getMemeImage}>
//           Get a new meme image 🖼
//         </button>
//       </div>
//       <div className="meme">
//         <img src={meme.randomImages} className="meme--image" />
//         <h2 className="meme--text top">{meme.topText}</h2>
//         <h2 className="meme--text bottom">{meme.bottomText}</h2>
//       </div>
//     </main>
//   );
// }

//With redux ToolKitn
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMeme, fetchMemes } from "../slices/memeSlice";

export default function Body() {
  const meme = useSelector((state) => state.meme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * meme.allMemes.length);
    const url = meme.allMemes[randomNumber].url;
    dispatch(setMeme({ randomImages: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(setMeme({ [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img
          src={meme.randomImages}
          className="meme--image"
          alt="Random Meme"
        />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
