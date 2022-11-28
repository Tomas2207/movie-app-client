import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from '../components/Movie';

const MyMovies = ({ user }) => {
  const navigate = useNavigate();
  if (!user) navigate('/');

  const [list, setList] = useState();

  const getWatchlist = () => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/watchlist/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        let List = data?.filter((x) => x.rating > 0);

        if (List) setList(List);
        console.log(List);
      });
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <div>
      <h2 className=" h2__before title-h2">MyMovies</h2>
      {list && Object.keys(list).length !== 0 ? (
        <div className="movie-container">
          {list?.map((value) => {
            return <Movie values={value} />;
          })}
        </div>
      ) : (
        <h2>No movies here... Add some!</h2>
      )}
    </div>
  );
};

export default MyMovies;
