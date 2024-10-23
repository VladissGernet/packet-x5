import {Swiper} from '../vendor/swiper.min.js';
import {
  SwiperPrizeDrawOptions,
  SwiperBreakpoints,
  PrizeDrawBreakpoints,
  PAGE_RELOAD_DELAY
} from './constants.js';
// import {debounce} from './../vendor/debounce.js';
import {debounce} from '../vendor/debounce.js';

const onPageResize = () => {
  location.reload();
};
const throttledPageResizing = debounce(onPageResize, PAGE_RELOAD_DELAY);

// Функция для создания экземпляра Swiper
const createSwiper = (container) => {
  return new Swiper(container, {
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

const initSwipers = (containers) => {
  // Добавляем swiper к каждому контейнеру
  containers.forEach((container) => {
    const swiperList = container.querySelector('.prize-draw__sub-list');
    const swiperListItems = swiperList.querySelectorAll('.prize-draw__sub-item');
    // Если количество слайдов равно максимальному количеству слайдов, которое может быть
    // отображено в контейнере, то все равно активируем swiper путем добавления копий слайдов.
    if (SwiperPrizeDrawOptions.SLIDES_PER_VIEW === swiperListItems.length) {
      swiperListItems.forEach((item) => {
        swiperList.appendChild(item.cloneNode(true));
      });
    }
    createSwiper(container);
  });
};

const initPrizeDrawSwiper = () => {
  const containersWithSwiper = document.querySelectorAll('.prize-draw__swiper');
  if (!containersWithSwiper.length) {
    return;
  }

  // Проверка на ширину экрана
  // Swiper активизируется только на мобильной разметке
  if (window.innerWidth < PrizeDrawBreakpoints.TABLET) {
    initSwipers(containersWithSwiper);
  }
  const initialPageWidth = window.innerWidth;

  // Проверка на изменение ширины экрана
  window.addEventListener('resize', () => {
    const newPageWidth = window.innerWidth;
    if (initialPageWidth >= PrizeDrawBreakpoints.MOBILE && newPageWidth < PrizeDrawBreakpoints.MOBILE || initialPageWidth < PrizeDrawBreakpoints.MOBILE && newPageWidth >= PrizeDrawBreakpoints.MOBILE) {
      throttledPageResizing();
    }
  });
};

export {initPrizeDrawSwiper};
