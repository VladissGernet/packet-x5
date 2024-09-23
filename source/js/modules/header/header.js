const initHeader = () => {
  const header = document.querySelector('.header__background');
  if (!header) {
    return;
  }
  const ellipse = header.querySelector('.header__ellipse');
  const image = header.querySelector('.header__background-image');

  ellipse.classList.add('js-ellipse');
  image.classList.add('js-image');
};

export {initHeader};
