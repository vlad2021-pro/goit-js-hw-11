import axios from 'axios'
axios.defaults.baseURL = 'https://pixabay.com/api'


export function getPictures(searchPictures, page, picturesLimit) {
    return axios.get(`/?key=11408941-3cf7894bd0fa3b9fec7ed7cf5q=${searchPictures}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${ picturesLimit}&page=${page}`)
}