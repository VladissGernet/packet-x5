import {SearchMessage} from './../constants';

const initSearchPhoneField = () => {
  const searchPhoneField = document.querySelector('.hero__search');
  const table = document.querySelector('.winners__table');
  if (!searchPhoneField || !table) {
    return;
  }

  const tbody = table.querySelector('tbody');

  const hideAllRows = (tableRows) => {
    tableRows.forEach((row) => {
      row.style.display = 'none';
    });
  };

  const getLastFourNumbers = (value) => {
    const result = value.textContent.match(/(\d{4})$/);
    if (result !== null) {
      return result[0];
    }
    return false;
  };

  const compareNumber = (pattern, value) => {
    const regexpWithPatternFromSearchField = new RegExp(pattern);
    return value.match(regexpWithPatternFromSearchField) !== null;
  };

  const findNumber = (pattern) => {
    const tableRows = tbody.querySelectorAll('tr');
    const tableData = tbody.querySelectorAll('td');
    hideAllRows(tableRows);
    let isAnyNumberAcceptable = false;

    tableData.forEach((item) => {
      const number = getLastFourNumbers(item);
      if (number !== false) {
        const isNumberAcceptable = compareNumber(`^${pattern}`, number);
        if (isNumberAcceptable) {
          isAnyNumberAcceptable = true;
          item.closest('tr').style.display = 'table-row';
        }
      }
    });
    return isAnyNumberAcceptable;
  };

  const search = document.querySelector('.search');
  const searchFieldHelp = search.querySelector('p');

  searchPhoneField.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = searchPhoneField.querySelector('input').value;
    if (findNumber(inputValue) === false) {
      search.classList.add('js-search-error');
      searchFieldHelp.textContent = SearchMessage.ERROR;
    } else {
      search.classList.remove('js-search-error');
      searchFieldHelp.textContent = SearchMessage.DEFAULT;
    }
  });
};

export {initSearchPhoneField};
