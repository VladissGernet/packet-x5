const initSearchInput = () => {
  const searchInputWrapper = document.querySelector('.search__field');
  if (!searchInputWrapper) {
    return;
  }
  const input = searchInputWrapper.querySelector('input');
  const onSearchInputInput = (evt) => {
    searchInputWrapper.classList.remove('js-search-error');

    if (evt.target.value.length > 0) {
      searchInputWrapper.classList.add('js-search-not-empty');
    } else {
      searchInputWrapper.classList.remove('js-search-not-empty');
    }
  };
  input.addEventListener('input', onSearchInputInput);
};

export {initSearchInput};
