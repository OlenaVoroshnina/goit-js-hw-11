import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { GalleryAPI } from './gallery-api';
import { createGalleryCards } from './gallery-cards';

const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const containerGalleryEl = document.querySelector('.gallery');
const searchButtonEl = document.querySelector('.js-search-btn');

const galleryAPI = new GalleryAPI();

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(event) {
    event.preventDefault();


    galleryAPI.query = event.target.elements.searchQuery.value;
    
    galleryAPI.page = 1;

    try {
        const { data } = await galleryAPI.getPhotosByQuery();
        
        console.log(data);
        containerGalleryEl.innerHTML = createGalleryCards(data.hits);
        new SimpleLightbox('.gallery .gallery_item');

        if (data.hits.length === 0 ) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            event.target.reset();
            loadMoreBtnEl.classList.add('is-hidden');
            searchButtonEl.disabled = false;
            containerGalleryEl.innerHTML = '';
            
            return;
        } else {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        };

        if (data.totalHits > galleryAPI.per_page) {
            loadMoreBtnEl.classList.remove('is-hidden');
        }

        const total = Math.ceil(Number(data.totalHits) / Number(galleryAPI.per_page));

        if (total === data.per_page ) {
           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtnEl.classList.add('is-hidden'); 
        }

        const { height: cardHeight } = document.querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });  

    } catch (error) {
        if (!response.ok) {
            if (error.response.status === 404) {
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');                       
            };
            throw new Error(response.status);
        } 
        console.log(error);     
    }
};

async function onLoadMoreBtnClick(event) {
    
    galleryAPI.page += 1;

    try {
        const {data} = await galleryAPI.getPhotosByQuery()
        
        containerGalleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        }); 

        const total = Math.ceil(Number(data.totalHits) / Number(galleryAPI.per_page));
            
            console.log(total);

        if (galleryAPI.page >= total ) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtnEl.classList.add('is-hidden');
        }
        
    } catch (error) {
        if (!response.ok) {
            if (error.response.status === 404) {
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');                       
            };
            throw new Error(response.status);
        } 
        console.log(error);
    }
}

new SimpleLightbox('.gallery .gallery__item', { captionsData: 'alt', captionDelay: 250 });


