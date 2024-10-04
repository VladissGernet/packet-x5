import {Swiper} from './../vendor/swiper.min.js';
import {SwiperPrizeDrawOptions, SwiperBreakpoints} from './constants.js';

const initPrizeDrawSwiper = () => {
  return new Swiper('.prize-draw-swiper', {
    slidesPerView: SwiperPrizeDrawOptions.SLIDES_PER_VIEW,
    spaceBetween: SwiperPrizeDrawOptions.SPACE_BETWEEN_DEFAULT,
    loop: true,
    breakpoints: {
      [SwiperBreakpoints.MOBILE_MIN]: {
        spaceBetween: SwiperPrizeDrawOptions.SPACE_BETWEEN_MOBILE_MIN,
      },
      [SwiperBreakpoints.MOBILE]: {
        spaceBetween: SwiperPrizeDrawOptions.SPACE_BETWEEN_MOBILE,
      },
      [SwiperBreakpoints.TABLET]: {
        spaceBetween: SwiperPrizeDrawOptions.SPACE_BETWEEN_DEFAULT,
      },
    },
  });
};

export {initPrizeDrawSwiper};
