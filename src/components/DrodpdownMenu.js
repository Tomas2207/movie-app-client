import { Link } from 'react-router-dom';

const DropdownMenu = ({ logOut, user }) => {
  const DropdownItem = (props) => {
    if (props.link === '/logout')
      return (
        <Link onClick={logOut} className="menu-item">
          <span
            style={{ backgroundImage: `url(${props?.leftIcon})` }}
            className="icon-button"
          ></span>
          {props?.children}
          <span className="icon-right">{props?.rightIcon}</span>
        </Link>
      );
    return (
      <Link to={props.link} className="menu-item">
        <span
          style={{ backgroundImage: `url(${props?.leftIcon})` }}
          className="icon-button"
        ></span>

        {props?.children}
        <span className="icon-right">{props?.rightIcon}</span>
      </Link>
    );
  };
  return (
    <div className="dropdown swing-in-top-fwd">
      <DropdownItem leftIcon={user.img.url} link={'/user'}>
        My Profile
      </DropdownItem>
      <DropdownItem leftIcon={'/img/movies.png'} link={'/my-movies'}>
        My Movies
      </DropdownItem>
      <DropdownItem leftIcon={'/img/bookmark.png'} link={'/watchlist'}>
        Watchlist
      </DropdownItem>
      <DropdownItem leftIcon={'/img/logout.png'} link={'/logout'}>
        LogOut
      </DropdownItem>
    </div>
  );
};

export default DropdownMenu;
