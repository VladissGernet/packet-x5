import {SearchMessage} from './../constants';

const initSearchPhoneField = () => {
  const searchPhoneField = document.querySelector('.hero__search');
  const table = document.querySelector('.winners__table');
  if (!searchPhoneField || !table) {
    return;
  }
  const tbody = table.querySelector('tbody');
  const searchFieldHelp = searchPhoneField.querySelector('p');
  const searchPhoneInput = searchPhoneField.querySelector('input');
  const tableRows = tbody.querySelectorAll('tr');
  const tableData = tbody.querySelectorAll('td');
  const searchFieldClearButton = searchPhoneField.querySelector('button');

  const hideAllRows = () => {
    tableRows.forEach((row) => {
      row.style.display = 'none';
    });
  };

  const showAllRows = () => {
    tableRows.forEach((row) => {
      row.style.display = 'table-row';
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
    hideAllRows();
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

  searchPhoneField.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (findNumber(searchPhoneInput.value) === false) {
      searchPhoneField.classList.add('js-search-error');
      searchFieldHelp.textContent = SearchMessage.ERROR;
    } else {
      searchPhoneField.classList.remove('js-search-error');
      searchFieldHelp.textContent = SearchMessage.DEFAULT;
    }
  });

  // Возврат выдачи к дефолтному состоянию при полной очистке поля.
  searchPhoneInput.addEventListener('keyup', (evt) => {
    if (evt.key === 'Backspace' && evt.target.value === '') {
      showAllRows();
    }
  });
  searchFieldClearButton.addEventListener('click', () => {
    showAllRows();
  });
};

export {initSearchPhoneField};
