import {TableHeightProperties} from './constants.js';

const initTableHeightHandler = () => {
  const tableBody = document.querySelector('.winners__table tbody');
  if (!tableBody) {
    return;
  }
  const {MAX_LINES, VALUE_TO_ADJUST_ROW_HEIGHT} = TableHeightProperties;

  const updateTableBodyMaxHeight = () => {
    const tableData = document.querySelector('.winners__table td');
    const heightValue = (tableData.offsetHeight + VALUE_TO_ADJUST_ROW_HEIGHT) * MAX_LINES;
    tableBody.style.maxHeight = `${heightValue}px`;
  };

  updateTableBodyMaxHeight();
  window.addEventListener('resize', () => {
    updateTableBodyMaxHeight();
  });
};

export {initTableHeightHandler};
