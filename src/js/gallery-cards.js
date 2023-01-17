/*
webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок.
*/

export const createGalleryCards = cardInfo => {
  const galleryCardsArr = cardInfo.map(el => {
    return `
      <div class="photo-card">
        <a class="gallery__item" href="${el.largeImageURL}">
          <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
