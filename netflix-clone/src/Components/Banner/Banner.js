import React, { useEffect, useState } from 'react';
import axios from "../../Utils/axios"
import requests from "../../Utils/requests"
import "./banner.css"
const Banner = () => {
     const [movie, setMovie] = useState({});  // to create an empty movie
    useEffect(
        () =>{
            (async () =>{
                 try {
                    const request = await axios.get(requests.fetchNetflixOriginals)
                    console.log(request)
                    setMovie(request.data.results[
                          Math.floor(Math.random() * request.data.results.length)
                    ]);
                } catch (error){
                      console.log("error", error);
                }
            })()
    }, []);

     function truncate(str, n){
         return str?.length > n ? str.substr(0, n -1) + '...' : str;
     }

     return (
    <div
    className="banner"
    style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        
    }}
    >
        <div className='banner-contents'>
            <h1 className="banner-title">
               {movie?.title ||  movie?.name || movie?.original_name}
            </h1>
            <div className="banner-buttons">
                <button className="banner-buttop">Play</button>
                <button className="banner-butt">My List</button>
            </div>
            <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
        </div>
     
      <div className="banner-fadeBottom" />{/* </div> */}
    </div>
  )
}

export default Banner;
