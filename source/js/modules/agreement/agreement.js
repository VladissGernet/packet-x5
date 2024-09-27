const initAgreement = () => {
  const agreements = document.querySelectorAll('.agreement');
  return agreements && agreements.length && agreements.forEach((agreement) => {
    const checkbox = agreement.querySelector('input[type="checkbox"]');
    const submit = agreement.querySelector('.agreement__submit');
    checkbox.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        submit.classList.add('js-agreement-activated');
        submit.disabled = false;
      } else {
        submit.classList.remove('js-agreement-activated');
        submit.disabled = true;
      }
    });

    agreement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
};

export {initAgreement};
