import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = galleryItems.map(({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}).join('');

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener('click', event => {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  // Închiderea ferestrei modale cu tasta Escape
  const closeModalOnEscape = event => {
    if (event.code === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', closeModalOnEscape);
    }
  };

  document.addEventListener('keydown', closeModalOnEscape);
});

console.log(galleryItems);



