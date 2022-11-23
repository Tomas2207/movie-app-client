import { useEffect, useState } from 'react';
import './App.css';
import Movie from './components/Movie';
import MovieCarousel from './components/MovieCarousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import settings from './utils/Settings';

const Home = ({ getMovies, movieData, getShows, showData }) => {
  console.log(showData);
  const [loading, setLoadin] = useState(false);

  const URL = `${process.env.REACT_APP_BASE_URL}/trending/movie/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
  const TV_URL = `${process.env.REACT_APP_BASE_URL}/trending/tv/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const handleClick = () => {
    setLoadin(true);
    getMovies(URL);
    setLoadin(false);
    getShows(TV_URL);
  };

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [loading]);

  const movies = movieData?.map((movie) => {
    return (
      <div>
        <Movie values={movie} />
      </div>
    );
  });
  const shows = showData?.map((show) => {
    return (
      <div>
        <Movie values={show} />
      </div>
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <MovieCarousel movieData={movieData} />
      <h2 className="info title-h2">Trending Movies</h2>
      <div className="slider-container">
        <Slider {...settings} className="slider">
          {movies}
        </Slider>
      </div>
      {/* <h2 className="info title-h2">Trending Shows</h2>
      <div className="slider-container">
        <Slider {...settings} className="slider">
          {shows}
        </Slider>
      </div> */}

      {/* <h2 className="info title-h2">Trending</h2>
      <div className="movie-container">
        {movieData?.map((movie) => {
          return <Movie values={movie} />;
        })}
      </div> */}
    </div>
  );
};

export default Home;
