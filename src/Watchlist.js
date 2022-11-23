import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from './components/Movie';

const Watchlist = ({ user }) => {
  const navigate = useNavigate();
  if (!user) navigate('/');

  const [list, setList] = useState();

  const getWatchlist = () => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/watchlist/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        const List = data;
        if (List) setList(List);
        console.log(List);
      });
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <div>
      <h2 className=" info title-h2">Watchlist</h2>
      {list && Object.keys(list).length !== 0 ? (
        <div className="movie-container">
          {list?.map((value) => {
            return <Movie values={value} />;
          })}
        </div>
      ) : (
        <h2>Watchlist is empty... Add something!</h2>
      )}
    </div>
  );
};

export default Watchlist;
