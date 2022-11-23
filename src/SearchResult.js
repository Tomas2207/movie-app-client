import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Movie from './components/Movie';

const SearchResult = ({ movieData, getMovies }) => {
  console.log(movieData);
  const navigate = useNavigate();
  let location = useLocation();
  const [searchValue, setSearchValue] = useState();

  const [loading, setLoadin] = useState(false);

  let URL = `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`;

  useEffect(() => {
    setSearchValue(location.search.split('=')[1]);
    console.log(location.search);
  }, []);

  useEffect(() => {
    setSearchValue(location.search.split('=')[1]);
  }, [location.search]);

  useEffect(() => {
    setLoadin(true);
    getMovies(URL);
    setLoadin(false);
  }, [URL]);

  console.log(searchValue);

  if (searchValue == null) return <div></div>;

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="info title-h2">Result</h2>
      <div className="movie-container">
        {movieData?.map((movie) => {
          return <Movie values={movie} />;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
