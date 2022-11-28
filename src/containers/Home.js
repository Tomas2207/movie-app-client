import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import MovieCarousel from '../components/MovieCarousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import settings from '../utils/Settings';
import { Link } from 'react-router-dom';

const Home = ({ getMovies, movieData, getShows, showData, user, loading }) => {
  const [list, setList] = useState();

  const URL = `${process.env.REACT_APP_BASE_URL}/trending/movie/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
  const TV_URL = `${process.env.REACT_APP_BASE_URL}/trending/tv/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const handleClick = () => {
    getMovies(URL);
    getShows(TV_URL);
  };

  const getWatchlist = () => {
    if (user)
      fetch(`${process.env.REACT_APP_API_URL}/watchlist/${user?._id}`)
        .then((res) => res.json())
        .then((data) => {
          let List = data?.filter((x) => x.in_watchlist === true);
          console.log(List);
          if (List) setList(List);
        });
  };

  useEffect(() => {
    getWatchlist();
    handleClick();
  }, []);

  useEffect(() => {
    getWatchlist();
  }, [user]);

  useEffect(() => {
    console.log('render');
  }, [loading]);

  const movies = movieData?.map((movie, i) => {
    return (
      <div key={i}>
        <Movie values={movie} />
      </div>
    );
  });
  const watchlist = list?.map((movie, i) => {
    return (
      <div key={i}>
        <Movie values={movie} />
      </div>
    );
  });
  const shows = showData?.map((show, i) => {
    return (
      <div key={i}>
        <Movie values={show} />
      </div>
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <MovieCarousel movieData={movieData} />
      <div className=" app__movie-info">
        <h2 className="h2__before title-h2">Trending Movies</h2>
        <div className="slider__container">
          <Slider {...settings} className="slider">
            {movies}
          </Slider>
        </div>
        <h2 className="h2__before title-h2">Watchlist</h2>
        <div className="slider__container">
          {user && list?.length >= 6 && (
            <Slider {...settings} className="slider">
              {watchlist}
            </Slider>
          )}
          {user && list?.length < 6 && (
            <div className="movie-container">{watchlist}</div>
          )}
          {!user && (
            <Link to="/sign" className="hide__watchlist">
              Log In to see your watchlist
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
