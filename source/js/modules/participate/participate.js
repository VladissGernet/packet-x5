const initParticipate = () => {
  const imageWrapper = document.querySelector('.participate__image');
  if (!imageWrapper) {
    return;
  }
  imageWrapper.classList.add('js-participate-image');

  const content = document.querySelector('.participate__content');
  if (!content) {
    return;
  }
  content.classList.add('js-participate-content');
};

export {initParticipate};
