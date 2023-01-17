import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
const axios = require('axios').default;

import { GalleryAPI } from './gallery-api';
import { createGalleryCards } from './gallery-cards';



const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const containerGalleryEl = document.querySelector('.gallery');
const searchButtonEl = document.querySelector('.js-search-btn');


const galleryAPI = new GalleryAPI();





searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit(event) {
    event.preventDefault();
    // searchButtonEl.disabled = true;

    galleryAPI.query = event.target.elements.searchQuery.value;
    console.log(galleryAPI.query);
    galleryAPI.page = 1;

    

    galleryAPI.getPhotosByQuery()
        .then(data => {

            // if (galleryAPI.query = '') {
            //     searchButtonEl.disabled = false;
            // }
            console.log(data);
            containerGalleryEl.innerHTML = createGalleryCards(data.hits);

            if (data.hits.length === 0 ) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                event.target.reset();
                searchButtonEl.disabled = false;
                containerGalleryEl.innerHTML = '';
                return;
            } else {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            };

            if (data.totalHits > galleryAPI.per_page) {
                loadMoreBtnEl.classList.remove('is-hidden');
            }
            // const total = Math.ceil(Number(data.totalHits) / Number(galleryAPI.per_page));
            
            // console.log(total);
            // if (data.totalHits === galleryAPI.per_page) {
            //     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            //     loadMoreBtnEl.classList.add('is-hidden');
            // }

            const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
            });
           
            
        })
};

// var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

function onLoadMoreBtnClick(event) {
    
    galleryAPI.page += 1;

    galleryAPI.getPhotosByQuery()
        .then(data => {
            containerGalleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
            }); 

            if (data.hits.length === 0) {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                loadMoreBtnEl.classList.add('is-hidden');
            }
            
        })
    

}

new SimpleLightbox('.gallery .gallery__item', {captionsData: 'alt', captionDelay: 250});
