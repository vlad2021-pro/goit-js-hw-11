// import './css/styles.css';
import Notiflix from 'notiflix'
import { getPictures } from './aip.axios'


const searchForm = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more')
const galleryContainer = document.querySelector('.gallery')

let searchPictures = ""
let page = 1;
let PicturesLimit = 40
let totalHits

searchForm.addEventListener('submit', onSubmit)
loadMoreBtn.addEventListener('click', loadMore)

function submitCreateCard(image) {

    const dataCardImages = image.data.hits;
    
    if (dataCardImages.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    else {
        galleryContainer.innerHTML = dataCardImages.reduce((imagesList, { webformatURL, tags, likes, views, comments, downloads }) => {
            const template = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy width=60px" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: <span class=info-item-color>${likes}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Views: <span class=info-item-color>${views}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Comments: <span class=info-item-color>${comments}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: <span class=info-item-color>${downloads}</span></b>
                    </p>
                </div>
                </div>`
            return imagesList + template
        }, '')
    }
}

function loadMoreCreateCard(image) {
    const dataCardImages = image.data.hits
    totalHits = image.data.totalHits
    
    dataCardImages.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
       const string = `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                <div class="info">
                    <p class="info-item">
                    <b>Likes: <span class=info-item-color>${likes}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Views: <span class=info-item-color>${views}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Comments: <span class=info-item-color>${comments}</span></b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: <span class=info-item-color>${downloads}</span></b>
                    </p>
                </div>
                </div>`
        imagesContainer.insertAdjacentHTML('beforeend', string)
    })
}
    async function loadMore() {
    if (page * PicturesLimit >= totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    } else {
        page += 1;
        const images = await getPictures(searchPictures, page, PicturesLimit)
        loadMoreCreateCard(images);
    }
}

async function onSubmit(event) {
    event.preventDefault();
    page = 1;

    loadMoreBtn.classList.add('is-hidden');
    searchPictures = searchForm.searchQuery.value.trim();

    const images = await getPictures(searchPictures, page, PicturesLimit);
submitCreateCard(images);

   loadMoreBtn.classList.remove('is-hidden');
};