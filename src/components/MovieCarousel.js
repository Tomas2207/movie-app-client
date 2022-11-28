import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const MovieCarousel = ({ movieData }) => {
  return (
    <Carousel
      autoPlay
      interval={3500}
      showThumbs={false}
      infiniteLoop={true}
      showStatus={false}
    >
      {movieData?.map((movie, i) => {
        return (
          <Link key={i} to={{ pathname: `/movie/${movie.id}` }}>
            <div>
              <h2 className="carousel-h2">{movie.title}</h2>
              <div
                className="backdrop"
                style={{
                  backgroundImage: `url("${
                    process.env.REACT_APP_IMG_URL_OG + movie.backdrop_path
                  }")`,
                }}
              ></div>
            </div>
          </Link>
        );
      })}
    </Carousel>
  );
};

export default MovieCarousel;
