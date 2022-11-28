import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StarRating = ({ user, movieData }) => {
  const [check, setCheck] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const navigate = useNavigate();
  const [loading, setLoadin] = useState(false);

  //Functions

  const handleCheck = (e) => {
    for (let i = 0; i < check.length; i++) {
      if (i === parseInt(e.target.value)) {
        check[i] = true;
        console.log('jackpot');
      } else {
        check[i] = false;
      }
    }
    postRating(e.target.value);
    setCheck([...check]);
  };

  const checkRating = async () => {
    const watchlist = await fetch(
      `${process.env.REACT_APP_API_URL}/watchlist/movie/${movieData?.id}`
    );
    const response = await watchlist.json();
    console.log('res', response);

    const Movie = await response.find((x) => x.user === user?._id);
    console.log(Movie);

    if (Movie && Movie.rating) {
      check[Movie.rating] = true;
      setCheck([...check]);
    }
  };

  const postRating = async (rating) => {
    if (!user) navigate('/sign');

    let databody = {
      id: movieData?.id,
      poster_path: movieData.poster_path,
      rating: rating,
    };

    const watchlist = await fetch(
      `${process.env.REACT_APP_API_URL}/watchlist/movie/${movieData?.id}`
    );
    const response = await watchlist.json();
    const Movie = await response.find((x) => x.user === user._id);
    console.log(Movie);

    if (Movie) {
      fetch(`${process.env.REACT_APP_API_URL}/watchlist/${Movie._id}`, {
        method: 'PATCH',
        body: JSON.stringify(databody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (user) {
            console.log(data.message);
          } else navigate('/sign');
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/watchlist/${user._id}`, {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (user) {
            console.log(data.message);
          } else navigate('/sign');
        });
    }
  };

  //Hooks

  useEffect(() => {
    checkRating();
  }, [movieData]);

  useEffect(() => {
    checkRating();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <fieldset class="rating">
        <input
          onChange={handleCheck}
          type="radio"
          id="star5"
          name="rating"
          value="9"
          checked={check[9] === true}
        />
        <label class="full" for="star5" title="Awesome - 5 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star4half"
          name="rating"
          value="8"
          checked={check[8] === true}
        />
        <label
          class="half"
          for="star4half"
          title="Pretty good - 4.5 stars"
        ></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star4"
          name="rating"
          value="7"
          checked={check[7] === true}
        />
        <label class="full" for="star4" title="Pretty good - 4 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star3half"
          name="rating"
          value="6"
          checked={check[6] === true}
        />
        <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star3"
          name="rating"
          value="5"
          checked={check[5] === true}
        />
        <label class="full" for="star3" title="Meh - 3 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star2half"
          name="rating"
          value="4"
          checked={check[4] === true}
        />
        <label
          class="half"
          for="star2half"
          title="Kinda bad - 2.5 stars"
        ></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star2"
          name="rating"
          value="3"
          checked={check[3] === true}
        />
        <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star1half"
          name="rating"
          value="2"
          checked={check[2] === true}
        />
        <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="star1"
          name="rating"
          value="1"
          checked={check[1] === true}
        />
        <label class="full" for="star1" title="Sucks big time - 1 star"></label>
        <input
          onChange={handleCheck}
          type="radio"
          id="starhalf"
          name="rating"
          value="0"
          checked={check[0] === true}
        />
        <label
          class="half"
          for="starhalf"
          title="Sucks big time - 0.5 stars"
        ></label>
      </fieldset>
    </div>
  );
};

export default StarRating;
