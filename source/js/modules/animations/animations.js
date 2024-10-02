import {gsap} from './../../vendor/gsap.min';
import {ScrollTrigger} from './../../vendor/scroll-trigger.min';

gsap.registerPlugin(ScrollTrigger);
const batchArray = [];
const animationOptions = {
  fadeScale: {
    autoAlpha: 1,
    scale: 1,
    duration: 0.3,
    ease: 'back.out(1.5)',
    stagger: 0.1,
  },
  fadeIn: {
    autoAlpha: 1,
    y: 0,
    duration: 0.3,
    stagger: 0.1,
  },
};

const addAnimation = (dataAttribute, animationName, animationOption) => {
  batchArray.push(
      ScrollTrigger.batch(`[data-animate-${dataAttribute}=\'${animationName}\']`, {
        onEnter: () => gsap.to(`[data-animate-${dataAttribute}="${animationName}"] [data-animate-${dataAttribute}]`, animationOption),
        markers: true,
        start: 'top center',
      })
  );
};

const initAnimations = () => {
  // Анимация для блока Participate.
  addAnimation('participate-image', 'fadeScaleParticipateImage', animationOptions.fadeScale);
  addAnimation('participate-text', 'fadeInParticipateText', animationOptions.fadeIn);

  // Анимация для блока prize-draw.
  addAnimation('prize-draw-item', 'fadeScalePrizeDrawItems', animationOptions.fadeScale);
  addAnimation('prize-draw-title', 'fadeInPrizeDrawTitle', animationOptions.fadeIn);

  // хак с помощью которого мы анимируем элементы, если долистали до конца страницы, а тригер не успел сработать
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onLeave: () => {
      batchArray.forEach((array) => {
        array.forEach((batch) => batch.vars.onEnter(batch));
      });
    },
  });
};

export {initAnimations};

