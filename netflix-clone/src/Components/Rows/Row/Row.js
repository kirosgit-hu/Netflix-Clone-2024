import React, {useEffect, useState} from 'react'
import "./Row.css"
import axios from "../../../Utils/axios";
import movieTrailer from "movie-trailer" //trailer lemaggnet terminal lay npm i movie-trailer blen enchnalen
import YouTube from 'react-youtube' //ye movie id lemaggnet terminal lay npm i react-youtube blen enchnalen

/* import { width } from '@mui/system'; */

const Row = ({ title,fetchUrl,isLargeRow }) => {
     const [movies, setMovie] = useState([]);
     const [trailerUrl, setTrailerUrl] = useState("");

     const base_url = "https://image.tmdb.org/t/p/original";

     useEffect(() => {
         (async () => {
            try {
                console.log(fetchUrl)
                 // by this console.log  we have seen our Api Key is conneced to the current code(Row.js)
                const request = await axios.get (fetchUrl)  /* (`http://localhost:4000/api/${fetchUrl}) */;
                console.log(request) 
                setMovie(request.data.results);
            } catch (error){
                  console.log("error", error);
            }
         })()
     }, [fetchUrl]);  // this fetchUrl is used to render/reload new movies using useEffect

     const handleClick = (movie)=> {
         if(trailerUrl) {
             setTrailerUrl('')
         } else {
             movieTrailer(movie?.title || movie?.name || movie?.original_name)
                  .then((url) => {
                      console.log(url)
                      const urlParams = new URLSearchParams(new URL(url).search)
                                        // yhe mitekmen yemnfelgew Url leyten mawtat snfelg image click adrgen yagegnenew ye youtube link amtten ezi url lay masgebat 
                      console.log(urlParams)
                      console.log(urlParams.get('v')) //yhe malet ye video id..wun malet new
                      setTrailerUrl(urlParams.get('v'));
                  })
         }
        }
         const opts = {
              height: '390',
              width: "100%",
              playerVars: {
                   autoplay: 1,
              
         },
     }
  return (
    <div className="row">
        <h1>{title}</h1>
        <div className="row-posters">
            {movies?.map((movie, index) => (
                <img
                   onClick={() => handleClick(movie)}  // image click snaderk console lay ye yutube url link endiseten  
                   key={index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row-poster ${isLargeRow && "row-posterLarge"}`} 
                    />   // it also works with isSmallRow.. this key is all about migration of movie images from the base url
            ))}
        </div>
         {<div style= {{padding: '10px'}}>  {/* 40px nebere mikeyrew length between row images  Eg: b/n trending & top rated ..  */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
                {/* trailer url kale ke youtube video amtana play arglign malet new */} 
        </div>} 
    </div>
  )
}

export default Row
