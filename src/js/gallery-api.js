'use strict';

import axios from '"axios"';

export class GalleryAPI{
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '32802326-1cfc711dbce78707f39704a32';

    constructor() {
        this.page = 1;
        this.query = null;
    }

    async  getPhotosByQuery() {
        try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
        } catch (error) {
        console.error(error);
        }
    }
}