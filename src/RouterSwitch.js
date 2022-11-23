import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ExpandMovie from './ExpandMovie';
import Header from './components/Header';
import Sign from './Sign';
import SearchResult from './SearchResult';
import Watchlist from './Watchlist';
import ErrorBoundary from './ErrorBoundary';
import Profile from './Profile';

const RouterSwitch = () => {
  const [movieData, setMovieData] = useState();
  const [showData, setShowData] = useState();
  const [user, setUser] = useState();

  const getMovies = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('movie data', data);
        setMovieData(data);
      });
  };
  const getShows = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowData(data);
      });
  };

  const getUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cache: 'no-cache',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('user', data);
        const User = data;
        if (User) setUser(User);
        else setUser(null);
      });
  };

  const logout = () => {
    setUser(false);
  };

  const userState = () => {
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header getMovies={getMovies} user={user} getUser={logout} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                getMovies={getMovies}
                getShows={getShows}
                movieData={movieData?.results}
                showData={showData?.results}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchResult
                getMovies={getMovies}
                movieData={movieData?.results}
              />
            }
          />
          {/* <Route
            path="/movie/:id"
            element={
              <ExpandMovie
                getMovies={getMovies}
                movieData={movieData}
                user={user}
              />
            }
          /> */}
          <Route
            path="/movie/:id"
            element={
              <ErrorBoundary>
                <ExpandMovie
                  getMovies={getMovies}
                  movieData={movieData}
                  user={user}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/sign"
            element={<Sign userState={userState} user={user} />}
          />
          <Route path="/watchlist" element={<Watchlist user={user} />} />
          <Route
            path="/user"
            element={<Profile user={user} userState={userState} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouterSwitch;
