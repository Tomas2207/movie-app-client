import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from './DrodpdownMenu';
import Navbar from './Navbar';
import NavItem from './NavItem';

const Header = ({ getMovies, user, getUser }) => {
  const [initialValue, setInitialValue] = useState('');
  const [searchValue, setSearchValue] = useState(initialValue);
  const [User, setUser] = useState(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `?query=${searchValue}`,
    });
    // setSearchValue(initialValue);
  };

  const logOut = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getUser();
      });
  };

  useEffect(() => {
    setUser(user);
    console.log('here');
  }, [user]);

  return (
    <div className="header">
      <nav className="home-a">
        <img src="/img/reel.png" alt="" className="header-reel" />
        <Link to="/" className="header-title">
          MovieApp
        </Link>
      </nav>
      <div id="header-form">
        <form action="" onSubmit={handleSubmit} className="search-form">
          <label htmlFor="search" className="hide__label">
            Search:
          </label>
          <input
            value={searchValue}
            className="search"
            type="text"
            name="search"
            id=""
            placeholder="Search..."
            onChange={handleChange}
          />

          <button className="search-btn">Search</button>
        </form>
      </div>

      {user ? (
        <Navbar>
          {user?.name}
          <NavItem>
            <DropdownMenu user={user} logOut={logOut} />
          </NavItem>
        </Navbar>
      ) : (
        <Link to="/sign">
          <h2 className="nav-h2" style={{ marginRight: '5px' }}>
            Log In
          </h2>
        </Link>
      )}
    </div>
  );
};

export default Header;
