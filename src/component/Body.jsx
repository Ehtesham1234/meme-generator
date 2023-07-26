import React, { useState, useEffect } from "react";

export default function Body() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImages: "https://api.imgflip.com/get_memes",
  });
  const [allMemes, setAllMemes] = useState([]);
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImages: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
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
        <img src={meme.randomImages} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getMemes } from "../slices/memeSlice";

// export default function Body() {
//   const [meme, setMeme] = useState({
//     topText: "",
//     bottomText: "",
//     randomImages: "https://api.imgflip.com/get_memes",
//   });
//   const [allMemes, setAllMemes] = useState([]);

//   const dispatch = useDispatch();
//   const url = useSelector((state) => state.memes.url);

//   useEffect(() => {
//     async function fetchMemes() {
//       try {
//         await dispatch(getMemes()); // Dispatch the getMemes action to fetch data and update the Redux state
//       } catch (error) {
//         // Handle error if needed
//       }
//     }
//     fetchMemes();
//   }, [dispatch]);

//   useEffect(() => {
//     if (url) {
//       setMeme((prevMeme) => ({
//         ...prevMeme,
//         randomImages: url,
//       }));
//     }
//   }, [url]);

//   useEffect(() => {
//     if (allMemes.length > 0) {
//       getMemeImage();
//     }
//   }, [allMemes]);

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
//         {/* Make sure to set the "alt" attribute for the image */}
//         <img src={meme.randomImages} className="meme--image" alt="Meme" />
//         <h2 className="meme--text top">{meme.topText}</h2>
//         <h2 className="meme--text bottom">{meme.bottomText}</h2>
//       </div>
//     </main>
//   );
// }
