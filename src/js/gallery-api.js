'use strict';
import axios from 'axios';

export class GalleryAPI{
    static BASE_URL = 'https://pixabay.com/api';
    static API_KEY = '32802326-1cfc711dbce78707f39704a32';

    constructor() {
        this.page = 1;
        this.query = '';
        this.per_page = 40;
    };

    getPhotosByQuery() {
        const searchParams = new URLSearchParams({
            q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: this.per_page,
            key: GalleryAPI.API_KEY,
        });
              
        return axios.get(`${GalleryAPI.BASE_URL}/?${searchParams}`);
    }
};


            