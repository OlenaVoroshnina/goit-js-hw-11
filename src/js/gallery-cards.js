export const createGalleryCards = cardInfo => {
  const galleryCardsArr = cardInfo.map(el => {
    return `
      <div class="photo-card">
        <a class="gallery__item" href="${el.largeImageURL}">
          <img class = "photo" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes<br>${el.likes}</b>
          </p>
          <p class="info-item">
            <b>Views<br>${el.views}</b>
          </p>
          <p class="info-item">
            <b>Comments<br>${el.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${el.downloads}</b>
          </p>
        </div>
      </div>
        `;
  }).join('');

  return galleryCardsArr;
};
