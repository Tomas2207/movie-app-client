import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Movie from '../components/Movie';

const SearchResult = ({ movieData, getMovies, loadingSearch }) => {
  console.log(movieData);
  const navigate = useNavigate();
  let location = useLocation();
  const [searchValue, setSearchValue] = useState();

  const stateHandler = () => {
    if (searchValue == null) console.log(null);
    else getMovies(URL);
  };

  let URL = `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`;

  useEffect(() => {
    stateHandler();
  }, [URL]);

  useEffect(() => {
    setSearchValue(location.search.split('=')[1]);
  }, [location.search]);

  // useEffect(() => {
  //   stateHandler();
  // }, [searchValue]);

  console.log(searchValue);

  if (loadingSearch)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src="/img/reel.png" alt="" className="rotate-center" />
      </div>
    );
  if (movieData?.length === 0)
    return (
      <div className="app__movie-info">
        <h2 className="h2__before h2-title">No results</h2>
      </div>
    );

  return (
    <div className="app__movie-info">
      <h2 className="h2__before title-h2">Result</h2>
      <div className="movie-container">
        {movieData?.map((movie) => {
          return <Movie values={movie} />;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
