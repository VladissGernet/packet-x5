import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initHeader} from './modules/header';
import {initAgreement} from './modules/agreement.js';
import {initAnimations} from './modules/animations.js';

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
    const updateWeekAndDate = (selectedDate, weekAndDate) => {
      for (const key in tableDates) {
        if (tableDates.hasOwnProperty(key)) { // Проверяем, является ли свойство собственным
          const keyDate = tableDates[key].match(regexDate)[0];
          if (keyDate === selectedDate) {
            const numberOfWeek = key;
            weekAndDate[0].textContent = numberOfWeek + ' неделя';
            weekAndDate[1].textContent = tableDates[key];
            return;
          }
        }
      }
    };

    // table
    const initWinnersTable = () => {
      const section = document.querySelector('.winners--table');
      if (!section) {
        return;
      }
      const weekAndDate = section.querySelectorAll('.winners__table p span');

      // Взаимодействие с select.
      const spanText = section.querySelector('.custom-select__text');
      const onSelectNewOption = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const selectedDate = spanText.textContent.match(regexDate)[0];
            updateWeekAndDate(selectedDate, weekAndDate);
            return;
          }
        }
      };
      const observer = new MutationObserver(onSelectNewOption);
      observer.observe(spanText, {childList: true, subtree: true});

      // Mock данные телефонных номеров победителей.
      const getWinners = () => {
        const VALUE_OF_WINNERS = 20;
        const winners = new Set();
        while (winners.size < VALUE_OF_WINNERS) {
          const newWinnersGroupArray = Math.random().toString(10).match(/(\d{4})(?=(\d{4})|$)/g);
          for (let i = 0; i < newWinnersGroupArray.length && winners.size < VALUE_OF_WINNERS; i++) {
            winners.add(newWinnersGroupArray[i]);
          }
        }
        return winners;
      };
      const getWinnersPhoneNumbers = () => {
        const winners = getWinners();
        const winnersArray = [];
        winners.forEach((value) => {
          winnersArray.push(`7XXXXXX${value}`);
        });
        return winnersArray;
      };
      // Mock данные победителей.
      const PRIZE_DRAW_WEEKS = 7;
      const allWinnersMockData = [];
      for (let i = 0; i < PRIZE_DRAW_WEEKS; i++) {
        const weekWinners = getWinnersPhoneNumbers().map((winnerPhone) => {
          return {
            name: 'Владислав',
            phone: winnerPhone,
            prize: 'Сертификат на покупки в «Пятёрочке»',
          };
        });
        allWinnersMockData.push(weekWinners);
      }
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
