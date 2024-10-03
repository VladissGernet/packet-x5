import {SearchMessage} from './constants';

const initSearchInput = () => {
  const search = document.querySelector('.search');
  if (!search) {
    return;
  }
  const searchInputWrapper = document.querySelector('.search__field');
  const input = search.querySelector('input');
  const help = search.querySelector('p');

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

export {initSearchInput};
