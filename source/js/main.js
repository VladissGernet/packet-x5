import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initHeader} from './modules/header/header';
import {initAgreement} from './modules/agreement/agreement.js';
import {initAnimations} from './modules/animations/animations.js';

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
    initAnimations();

    const tableDates = {
      '1': '02.08.23 - 09.08.23',
      '2': '09.08.23 - 16.08.23',
      '3': '16.08.23 - 23.08.23',
      '4': '23.08.23 - 30.08.23',
      '5': '30.08.23 - 07.09.23',
      '6': '07.09.23 - 14.09.23',
      '7': '14.09.23 — 21.09.23',
    };
    const regexDate = /(\d{2}\.\d{2}\.(\d{2}|\d{4}))/;

    // table
    const initWinnersTable = () => {
      const section = document.querySelector('.winners--table');
      if (!section) {
        return;
      }

      // Взаимодействие с select.
      const spanText = section.querySelector('.custom-select__text');
      const callbackName = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const selectedDate = spanText.textContent.match(regexDate)[0];


            console.log(selectedDate);
          }
        }
      };
      const observer = new MutationObserver(callbackName);
      observer.observe(spanText, {childList: true, subtree: true});

    };

    initWinnersTable();

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
