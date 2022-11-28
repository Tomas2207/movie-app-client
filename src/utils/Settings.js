let settings = {
  slidesToShow: 6,
  draggable: false,
  lazyLoad: true,

  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1520,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default settings;
