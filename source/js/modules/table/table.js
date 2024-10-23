import {getMockWinnersData} from '../get-mock-winners-data';

const INITIAL_TABLE_WEEK_ID = 0;
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
const getWeekId = (selectedDate) => {
  for (const weekId in tableDates) {
    if (tableDates.hasOwnProperty(weekId)) { // Проверяем, является ли свойство собственным
      const keyDate = tableDates[weekId].match(regexDate)[0];
      if (keyDate === selectedDate) {
        return weekId - 1;
      }
    }
  }
  return 0;
};

const generateTable = (tbody, data, tableWeekId) => {
  tbody.innerHTML = '';
  const tableFragment = document.createDocumentFragment();
  for (let i = 0; i < data[tableWeekId].length; i++) {
    const winnerName = document.createElement('td');
    const winnerPhone = document.createElement('td');
    const winnerPrize = document.createElement('td');
    winnerName.textContent = data[tableWeekId][i].name;
    winnerPhone.textContent = data[tableWeekId][i].phone;
    winnerPrize.innerHTML = data[tableWeekId][i].prize;
    const tableRow = document.createElement('tr');
    tableRow.appendChild(winnerName);
    tableRow.appendChild(winnerPhone);
    tableRow.appendChild(winnerPrize);
    tableFragment.appendChild(tableRow);
  }
  tbody.appendChild(tableFragment);
};

const initWinnersTable = () => {
  const section = document.querySelector('.winners--table');
  if (!section) {
    return;
  }
  // Данные победителей. Генерирую таблицу.
  const winnersData = getMockWinnersData();
  const tbody = section.querySelector('tbody');
  // Первоначальное заполнение таблицы.
  generateTable(tbody, winnersData, INITIAL_TABLE_WEEK_ID);

  // Взаимодействие с select.
  const spanText = section.querySelector('.custom-select__text');
  const weekAndDate = section.querySelectorAll('.winners__table p span');
  const onSelectNewOption = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const selectedDate = spanText.textContent.match(regexDate)[0];
        updateWeekAndDate(selectedDate, weekAndDate);
        generateTable(tbody, winnersData, getWeekId(selectedDate));
        return;
      }
    }
  };
  const observer = new MutationObserver(onSelectNewOption);
  observer.observe(spanText, {childList: true, subtree: true});
};

export {initWinnersTable};
