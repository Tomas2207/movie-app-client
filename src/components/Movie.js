import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Movie = ({ values }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(values.id);
    navigate({
      pathname: `/movie/${values.id}`,
    });
  };

  if (values.poster_path !== null)
    return (
      <div className="movie">
        <img
          className="movie-preview"
          onClick={handleClick}
          src={process.env.REACT_APP_IMG_URL + values.poster_path}
          alt="poster"
        />
      </div>
    );
};

export default Movie;
