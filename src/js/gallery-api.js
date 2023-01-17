'use strict';

const axios = require('axios').default;

export class GalleryAPI{
    static BASE_URL = 'https://pixabay.com/api';
    static API_KEY = '32802326-1cfc711dbce78707f39704a32';

    constructor() {
        this.page = 1;
        this.query = '';
        this.per_page = 40;
    }

    async  getPhotosByQuery() {
        try {
            const searchParams = new URLSearchParams({
                q: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: this.page,
                per_page: this.per_page,
                key: GalleryAPI.API_KEY,    
            })
         
         
            const response = await axios.get(`${GalleryAPI.BASE_URL}/?${searchParams}`);
            const data = await response.data;

            
            return data;
        
           
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
}


            