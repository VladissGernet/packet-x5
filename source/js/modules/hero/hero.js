const initHero = () => {
  const form = document.querySelector('.hero__form');
  if (!form) {
    return;
  }

  const checkbox = form.querySelector('input[type="checkbox"]');
  const submit = form.querySelector('.hero__submit');
  checkbox.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      submit.classList.add('js-submit-activated');
      submit.disabled = false;
    } else {
      submit.classList.remove('js-submit-activated');
      submit.disabled = true;
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

};

export {initHero};
