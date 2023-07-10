import React from 'react'
import { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from "react-router-dom";
import {BiPlay} from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apikey = "7e5122f42b3d47b2f9c1deaf4e1d2214"
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => (
    <img className="card" src={img} alt="cover" />
)

const Row = ({ title, arr = [] }) => (
    <div className='row'>
        <h2>{title}</h2>

        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />


                ))
            }
        </div>
    </div>
);


const Home = () => {
    const [upcomingmovies, setupcomingmovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchupcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
            console.log(results);
            setupcomingmovies(results);
        };
        const fetchnowPlaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`)
            console.log(results);
            setNowPlayingMovies(results);
        };
        const fetchpopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
            console.log(results);
            setPopularMovies(results);
        };
        const fetchtopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
            console.log(results);
            setTopRatedMovies(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
            setGenre(genres);
            console.log(genres);
        };

getAllGenre();
        fetchupcoming();
        fetchnowPlaying();
        fetchpopular();
        fetchtopRated();

    }, [])


    return (
        <section className='home'>
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay/>Play </button>
                    <button>My List<AiOutlinePlus /> </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingmovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies}/>
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />

            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Home