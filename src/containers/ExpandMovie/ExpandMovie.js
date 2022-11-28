import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Movie from '../../components/Movie';
import StarRating from '../../components/StarRating';
import settings from '../../utils/Settings';

const ExpandComponent = ({ getMovies, movieData, user }) => {
  let { id } = useParams();
  const [credits, setCredits] = useState();
  const [director, setDirector] = useState();
  const [actors, setActors] = useState();
  const [arrayLimit, setArrayLimit] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [similar, setSimilar] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ratingLoad, setRatingLoad] = useState(false);

  //env
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const imgUrl = process.env.REACT_APP_IMG_URL;
  const imgUrlOg = process.env.REACT_APP_IMG_URL_OG;

  //URLs

  const URL = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
  const IMG_URL_OG = imgUrlOg + movieData?.backdrop_path;
  const IMG_URL = imgUrl + movieData?.poster_path;
  const creditUrl = `${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
  const similarUrl = `${baseUrl}/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

  const score = movieData?.vote_average;
  const year = movieData?.release_date;
  const totalMinutes = movieData?.runtime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  //Functions

  const getCredits = (url) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCredits(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilar = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSimilar(data.results);
      });
  };

  const Credits = (array) => {
    console.log('credit', credits);
    let directorArray = array.crew.find((x) => x.job === 'Director');
    console.log('director', directorArray);
    setDirector(directorArray);
    let castArray = array.cast?.filter(
      (x) => x.known_for_department === 'Acting'
    );
    if (!arrayLimit && castArray.length > 10) castArray.length = 10;
    setActors(castArray);
  };

  const showFullCast = () => {
    setArrayLimit(!arrayLimit);
  };

  const addToWatchlist = async () => {
    if (!user) navigate('/sign');
    setLoading(true);
    let databody = {
      id: movieData?.id,
      poster_path: movieData.poster_path,
      in_watchlist: true,
    };

    const watchlist = await fetch(
      `${process.env.REACT_APP_API_URL}/watchlist/movie/${movieData?.id}`
    );
    const response = await watchlist.json();
    const Movie = response.find((x) => x.user === user._id);
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
          setLoading(false);
          if (user) setInWatchlist(true);
          else navigate('/sign');
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
          setLoading(false);
          if (user) setInWatchlist(true);
          else navigate('/sign');
        });
    }
  };

  const getWatchlist = async () => {
    setRatingLoad(true);
    fetch(`${process.env.REACT_APP_API_URL}/watchlist/movie/${movieData?.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data?', data);
        const Movie = data.find((x) => x.user === user?._id);
        console.log(Movie);
        if (
          Movie !== null &&
          Movie?.user === user?._id &&
          Movie?.in_watchlist === true
        ) {
          console.log(Movie?.user, user?._id);
          setInWatchlist(true);
        } else setInWatchlist(false);
        setRatingLoad(false);
      });
  };

  const deleteFromWatchlist = () => {
    setLoading(true);
    let databody = {
      id: movieData?.id,
      poster_path: movieData.poster_path,
      in_watchlist: false,
    };
    fetch(`${process.env.REACT_APP_API_URL}/watchlist/movie/${movieData?.id}`)
      .then((res) => res.json())
      .then((data) => {
        const Movie = data.find((x) => x.user === user._id);
        console.log(Movie);
        if (Movie !== null && Movie?.user === user?._id) {
          fetch(`${process.env.REACT_APP_API_URL}/watchlist/${Movie._id}`, {
            method: 'PATCH',
            body: JSON.stringify(databody),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
              setInWatchlist(false);
            });
        }
      });
  };

  //------------------------------------------

  //Hooks
  useEffect(() => {
    if (credits) Credits(credits);
  }, [credits]);

  useEffect(() => {
    getCredits(creditUrl);
  }, [arrayLimit]);

  useEffect(() => {
    getCredits(creditUrl);
    getMovies(URL);
    getSimilar(similarUrl);
  }, []);

  useEffect(() => {
    getCredits(creditUrl);
    getMovies(URL);
    getSimilar(similarUrl);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getWatchlist();
  }, [movieData]);

  return (
    <div>
      <div
        className="backdrop"
        style={{
          backgroundImage: `url("${IMG_URL_OG}")`,
        }}
      ></div>
      <div className="app__movie-info">
        <h2 className="h2__before">{score?.toFixed(2)}/10</h2>
        <div className="poster">
          <img src={IMG_URL} alt="" />
          <div>
            <h2>{movieData?.title}</h2>
            <div>
              <span>{year?.substr(0, 4)}</span>
              <span>
                {hours}h {minutes}m
              </span>
            </div>
            <br />
            {!ratingLoad && (
              <div>
                <StarRating user={user} movieData={movieData} />
              </div>
            )}

            <br />
            <h2 className="h2__before">Overview</h2>
            <p>{movieData?.overview}</p>
            {!inWatchlist && !loading && (
              <button onClick={addToWatchlist}>Add to Watchlist</button>
            )}
            {inWatchlist && !loading && (
              <div>
                <h2 className="error">In watchlist</h2>
                <button onClick={deleteFromWatchlist}>Remove</button>
              </div>
            )}
            {loading && (
              <button className="loading-btn">
                <img src="/img/reel.png" alt="" className="rotate-center" />
              </button>
            )}
          </div>
        </div>
        <div className="info-section">
          <h2 className="h2__before">Genres</h2>
          {movieData?.genres?.map((genre, i) => {
            return <div key={i}>{genre.name}</div>;
          })}
          {director && <h2 className="h2__before">Director</h2>}
          <div className="actor">
            {director?.profile_path ? (
              <img src={`${imgUrl + director?.profile_path}`} alt="" />
            ) : (
              <img src="/img/placeholder.png" alt="placeholder" />
            )}
            {director?.name}
          </div>

          <h2 className="h2__before">Cast</h2>
          {actors?.map((actor) => {
            return (
              <div className="actor">
                {actor.profile_path ? (
                  <img
                    src={`${
                      process.env.REACT_APP_IMG_URL + actor.profile_path
                    }`}
                    alt=""
                  />
                ) : (
                  <img src="/img/placeholder.png" alt="placeholder" />
                )}

                {actor.name}
              </div>
            );
          })}
          {!arrayLimit ? (
            <button onClick={showFullCast}>Show Full Cast</button>
          ) : (
            <button onClick={showFullCast}> Hide Cast</button>
          )}
          <h2 className="h2__before title-h2">Similar Movies</h2>
        </div>
        <div className="slider__container">
          <Slider {...settings} className="slider">
            {similar?.map((movie) => {
              return (
                <div>
                  <Movie values={movie} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExpandComponent;
