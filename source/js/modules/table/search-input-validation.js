import {SearchMessage} from '../constants';

const initSearchInputValidation = () => {
  const search = document.querySelector('.search');
  if (!search) {
    return;
  }
  const searchInputWrapper = document.querySelector('.search__field');
  const input = search.querySelector('input');
  const help = search.querySelector('p');

  // Проверка на ввод только цифр.
  input.addEventListener('keydown', (event) => {
    const isKeyCleared = () => {
      const clearedKeys = ['Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
      return clearedKeys.includes(event.key);
    };

    if (isKeyCleared() === false && event.key.match(/\d/) === null) {
      event.preventDefault();
    }
  });

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
