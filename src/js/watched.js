import refs from './refs';
import rendering from './rendering-of-watched';
// import storage from './libraryControll';
// import createQueueListFn from './queueList';

// localStorage.clear();

document.addEventListener('click', addToLocaleStorage);

function addToLocaleStorage(event) {
  if (event.target.classList.contains('js-watched')) {
    if (localStorage.getItem('watched') === null) {
      pushToStorage();
      changeBtnTxt();
    } else if (
      !localStorage
        .getItem('watched')
        .includes(`${document.querySelector('.card__img').src}`)
    ) {
      pushToStorage();
      changeBtnTxt();
    } else if (
      localStorage
        .getItem('watched')
        .includes(`${document.querySelector('.card__img').src}`)
    ) {
      deleteFromStorage();
      originalBtnTxt();
    }
    function pushToStorage() {
      const currentFilm = {
        poster_path: document.querySelector('.card__img').src,
        release_date: event.target.dataset.release_date,
        original_title: document.querySelector('.card__title').textContent,
        vote_average: document.querySelector('.js-vote').textContent,
      };
      const store =
        localStorage.getItem('watched') != null
          ? JSON.parse(localStorage.getItem('watched'))
          : [];
      store.push(currentFilm);

      // storage.deleteFilm(currentFilm, storage.queue);
      // createQueueListFn();

      localStorage.setItem('watched', JSON.stringify(store));
    }
    function changeBtnTxt() {
      document.querySelector('.js-watched').textContent = 'already watched';
      document
        .querySelector('.js-watched')
        .setAttribute('style', 'background: #ff6b08; color:#ffffff; border:0;');
    }
    function deleteFromStorage() {
      const currentFilm = {
        poster_path: document.querySelector('.card__img').src,
        release_date: event.target.dataset.release_date,
        original_title: document.querySelector('.card__title').textContent,
        vote_average: document.querySelector('.js-vote').textContent,
      };
      const store = JSON.parse(localStorage.getItem('watched'));
      const deleteMovieFromArray = store.filter(
        film => film.poster_path != currentFilm.poster_path,
      );
      localStorage.setItem('watched', JSON.stringify(deleteMovieFromArray));
    }
    function originalBtnTxt() {
      document.querySelector('.js-watched').textContent = 'add to watched';
      document
        .querySelector('.js-watched')
        .setAttribute(
          'style',
          'background: transparent; color:#33333; border:1px solid #333333;',
        );
    }
  }
}

document.addEventListener('click', showAllWatched);

function showAllWatched(event) {
  if (event.target.dataset.index === 'watched') {
    refs.galleryRef.textContent = '';
    if (localStorage.getItem('watched')) {
      const dataArray = JSON.parse(localStorage.getItem('watched'));
      rendering(dataArray);
    } else {
      refs.galleryRef.insertAdjacentHTML(
        'afterbegin',
        'No Watched moovies to show',
      );
    }
  }
}
