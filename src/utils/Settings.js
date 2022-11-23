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
      breakpoint: 1430,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1130,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default settings;
