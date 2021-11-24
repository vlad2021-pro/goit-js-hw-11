import axios from 'axios'
axios.defaults.baseURL = 'https://pixabay.com/api'


export function getPictures(searchPictures, page, picturesLimit) {
    return axios.get(`/?key=24369719-4937f00e9b76df3c43c2e5aa7&q=${searchPictures}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${ picturesLimit}&page=${page}`)
}