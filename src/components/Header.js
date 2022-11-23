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
        <Link to="/">Home</Link>
      </nav>
      <div id="header-form">
        <form action="" onSubmit={handleSubmit} className="search-form">
          <label htmlFor="search">Search:</label>
          <input
            value={searchValue}
            className="search"
            type="text"
            name="search"
            id=""
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
