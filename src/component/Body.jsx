import React, { useState, useEffect } from "react";

export default function Body() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImages: "https://api.imgflip.com/get_memes"

    });
    const [allMemes, setAllMemes] = useState([])


    // function handleSubmit(event){
    //       event.preventDefault();
    // }

    // function handleChange(event){
    //          setMeme(event.target.value)
    // }

    // function getMemeImage(){
    //      const memesArray= allMemeImage.data.memes
    //      const randomNumber = Math.floor(Math.random()*memesArray.length);
    //      const url = memesArray[randomNumber].url

    //     }

    // useEffect(()=>{
    //      fetch("https://api.imgflip.com/get_memes")
    //      .then(res=>res.json())
    //      .then(data=>setAllMemeImage(data.data.meme))
    // },[])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImages: url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        //     <main>
        // <form className="form" onSubmit={handleSubmit}>
        //   <input
        //    className="form--input"
        //    type="text"
        //    name="topInput"
        //    placeholder="Top-text"
        //    onChange={handleChange}
        //    value={meme.topInput}

        //   />
        //   <input
        //    className="form--input"
        //     type="text"
        //     name="bottomInput"
        //     placeholder="Bottom-text"
        //     onChange={handleChange}
        //     value={meme.bottomInput}
        //   />
        //   <button 
        //   className="form--button"
        //   onClick={getMemeImage}
        //   >
        //     Get a meme image
        //     </button>
        // </form>
        // <img 
        // name="randomImages"
        // src={ameme.randomImages}
        // className="meme--image"
        // />

        // </main>


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
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImages} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}