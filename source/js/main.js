import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initHeader} from './modules/header/header';
import {initAgreement} from './modules/agreement/agreement.js';
import {gsap} from './vendor/gsap.min';
import {ScrollTrigger} from './vendor/scroll-trigger.min';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    uploadFile();
    uploadImageDrop();
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
    initHeader();
    initAgreement();

    gsap.registerPlugin(ScrollTrigger);
    const batchArray = [];

    const fadeIn = ScrollTrigger.batch('[data-animate=\'fadeIn\']', {
      onEnter: () => gsap.to('[data-animate="fadeIn"] [data-animate-item]', {
        autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1,
      }),
      markers: true,
      start: 'top center',
    });
    batchArray.push(fadeIn);

    const fadeScale = ScrollTrigger.batch('[data-animate=\'fadeScale\']', {
      onEnter: () => gsap.to('[data-animate="fadeScale"] [data-animate-item]', {
        autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)', stagger: 0.1,
      }),
      markers: true,
      start: 'top center',
    });
    batchArray.push(fadeScale);

    // Анимация для блока Participate.

    const fadeScaleParticipateImage = ScrollTrigger.batch('[data-animate-participate-image=\'fadeScaleParticipateImage\']', {
      onEnter: () => gsap.to('[data-animate-participate-image="fadeScaleParticipateImage"] [data-animate-participate-image]', {
        autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)', stagger: 0.1,
      }),
      markers: true,
      start: 'top center',
    });
    batchArray.push(fadeScaleParticipateImage);

    const fadeInParticipateText = ScrollTrigger.batch('[data-animate-participate-text=\'fadeInParticipateText\']', {
      onEnter: () => gsap.to('[data-animate-participate-text="fadeInParticipateText"] [data-animate-participate-text]', {
        autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1,
      }),
      markers: true,
      start: 'top center',
    });
    batchArray.push(fadeInParticipateText);


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

  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
