import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import ExpandMovie from './containers/ExpandMovie/ExpandMovie';
import Header from './components/Header';
import Sign from './containers/Sign';
import SearchResult from './containers/SearchResult';
import Watchlist from './containers/Watchlist';
import ErrorBoundary from './ErrorBoundary';
import Profile from './containers/Profile';
import MyMovies from './containers/MyMovies';

const RouterSwitch = () => {
  const [movieData, setMovieData] = useState();
  const [showData, setShowData] = useState();
  const [user, setUser] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const getMovies = (url) => {
    setLoadingSearch(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('movie data', data);
        setMovieData(data);
        setLoadingSearch(false);
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
                user={user}
                loading={loadingSearch}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchResult
                getMovies={getMovies}
                movieData={movieData?.results}
                loadingSearch={loadingSearch}
              />
            }
          />

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
          <Route path="/my-movies" element={<MyMovies user={user} />} />
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
