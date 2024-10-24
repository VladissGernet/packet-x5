import {SearchMessage} from '../constants';

const initSearchInputValidation = () => {
  const search = document.querySelector('.search');
  if (!search) {
    return;
  }
  const searchInputWrapper = document.querySelector('.search__field');
  const input = search.querySelector('input');
  const help = search.querySelector('p');

  // Проверка на нажатие разрешенных кнопок.
  const isKeyCleared = (keyName) => {
    const clearedKeys = ['Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    return clearedKeys.includes(keyName);
  };

  input.addEventListener('keydown', (evt) => {
    // Проверка на ввод только цифр и на нажатие разрешенных кнопок.
    if (isKeyCleared(evt.key) === false && evt.key.match(/\d/) === null) {
      evt.preventDefault();
    }
  });

  // Управление вывода ошибки.
  const onSearchInputInput = (evt) => {
    search.classList.remove('js-search-error');

    if (evt.target.value.length > 0) {
      search.classList.add('js-search-not-empty');
    } else {
      search.classList.remove('js-search-not-empty');
    }
    search.classList.remove('js-search-error');
    help.textContent = SearchMessage.DEFAULT;
  };
  input.addEventListener('input', onSearchInputInput);

  // Управление кнопкой очистки поля.
  const button = searchInputWrapper.querySelector('button');
  const onButtonClick = () => {
    input.value = '';
    input.focus();
    search.classList.remove('js-search-not-empty');
    search.classList.remove('js-search-error');
    help.textContent = SearchMessage.DEFAULT;
  };
  button.addEventListener('click', onButtonClick);
};

export {initSearchInputValidation};
