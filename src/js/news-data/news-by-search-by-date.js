import Notiflix from 'notiflix';
import { load } from '../locale-storage';
import onWindowResize from './function-of-resize-render';

// import { getTotalNews } from '../pagination_m';

// кількість карток новин на сторінці
const newsPerPage = onWindowResize();
const DEFAULT_BASE_URL = 'https://static01.nyt.com/';
const DEFAULT_PHOTO = "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png";
const DEFAULT_CAPTION = "photo";
const refs = {
	mainNewsList: document.querySelector('.js-list-new'),
}

let docs = null;
let datesString = [];
let selectedDate = null;
let dateForRender = [];
let amountOfFilterCards = 0;

export function getResponseForFilterByDateBySearch(response) {
    docs = response;
}

export function getDatesBySearch(requestDate) {

    for (let date of requestDate) {

    const dataNormal = new Date(date);
    let day = dataNormal.getDate();
    let month = dataNormal.getMonth() + 1;
    let year = dataNormal.getFullYear();
        
		const dateString = `${day}/${month}/${year}`;
		datesString.push(dateString);
		
		const dayForRender = (dataNormal.getDate()).toString().padStart(2, 0);
        const monthForRender = (dataNormal.getMonth() + 1).toString().padStart(2, 0);
		dateForRender.push(`${dayForRender}/${monthForRender}/${year}`);
  }
  
}

export function getCalendarDateBySearch(currentDate) {
  if (docs) {
           filterByDate(currentDate); 
    }
}

function filterByDate(currentDate) {
    selectedDate = currentDate;
    clearmainNewsListContainer();
    renderMainNewsList();
}

function renderMainNewsList() {
	let markup = '';
  if (docs.length > newsPerPage) {
      for (let i = 0; i < newsPerPage; i++) {
         
        if (datesString[i] === selectedDate) {
			amountOfFilterCards += 1;
			markup += `
			<li class="list-news__item">
		<div class="news-card" id="${docs[i]._id}">
			<span class="read-card-text visually-hidden"> Already read
				<svg width="18" heigth="18" viewBox="0 0 32 32">
					<path fill="#00dd73" style="fill: var(--color1, #00dd73)"
						d="M28.78 6.39c-0.277 0.008-0.54 0.124-0.733 0.323l-16.313 16.313-6.713-6.713c-0.098-0.102-0.216-0.184-0.346-0.24s-0.27-0.086-0.412-0.088c-0.142-0.001-0.283 0.025-0.414 0.079s-0.251 0.133-0.351 0.233c-0.1 0.1-0.18 0.22-0.233 0.351s-0.081 0.272-0.079 0.414c0.001 0.142 0.031 0.282 0.087 0.412s0.138 0.248 0.24 0.346l7.467 7.467c0.2 0.2 0.471 0.312 0.754 0.312s0.554-0.112 0.754-0.312l17.067-17.067c0.154-0.15 0.259-0.343 0.302-0.553s0.021-0.429-0.063-0.627c-0.084-0.198-0.225-0.366-0.406-0.482s-0.393-0.175-0.607-0.168z">
					</path>
				</svg>
			</span>

			<div class='news-card__image-wrapper'>
				<img class="news-card__image"
					src="${docs[i].multimedia.length == 0 ? DEFAULT_PHOTO : DEFAULT_BASE_URL + docs[i].multimedia[0].url}"
					alt="${docs[i].multimedia.length == 0 ? DEFAULT_CAPTION : docs[i].keywords[0].value}"
					height="395" />

				<button type="button" class="js-to-fav add-fav-btn">
					<span class='fav-btn-text'>Add to favorite</span>
					<svg class="news-card__icon" viewBox="0 0 32 32" width="16" height="16">
						<path fill="none" stroke="#4440f7"
							d="M9.331 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z">
						</path>
					</svg>
				</button>
			</div>


			<p class="news-card__category">${docs[i].section_name}</p>

			<h3 class="news-card__title">${docs[i].headline.main}</h3>

			<p class="news-card__text">${docs[i].abstract}</p>

		</div>
		<div class="news-card__details">
			<span class="news-card__date">${dateForRender[i]}</span>
			<a class="news-card__news-link link" href="${docs[i].web_url}" target="_blank">Read more</a>
		</div>
	</li>`;
        };
    };
  }

  else {
      for (let i = 0; i < docs.length; i++) {
        if (datesString[i] === selectedDate) {
			amountOfFilterCards += 1;
			markup += `
		<li class="list-news__item">
		<div class="news-card" id="${docs[i]._id}">
			<span class="read-card-text visually-hidden"> Already read
				<svg width="18" heigth="18" viewBox="0 0 32 32">
					<path fill="#00dd73" style="fill: var(--color1, #00dd73)"
						d="M28.78 6.39c-0.277 0.008-0.54 0.124-0.733 0.323l-16.313 16.313-6.713-6.713c-0.098-0.102-0.216-0.184-0.346-0.24s-0.27-0.086-0.412-0.088c-0.142-0.001-0.283 0.025-0.414 0.079s-0.251 0.133-0.351 0.233c-0.1 0.1-0.18 0.22-0.233 0.351s-0.081 0.272-0.079 0.414c0.001 0.142 0.031 0.282 0.087 0.412s0.138 0.248 0.24 0.346l7.467 7.467c0.2 0.2 0.471 0.312 0.754 0.312s0.554-0.112 0.754-0.312l17.067-17.067c0.154-0.15 0.259-0.343 0.302-0.553s0.021-0.429-0.063-0.627c-0.084-0.198-0.225-0.366-0.406-0.482s-0.393-0.175-0.607-0.168z">
					</path>
				</svg>
			</span>

			<div class='news-card__image-wrapper'>
				<img class="news-card__image"
					src="${docs[i].multimedia.length == 0 ? DEFAULT_PHOTO : DEFAULT_BASE_URL + docs[i].multimedia[0].url}"
					alt="${docs[i].multimedia.length == 0 ? DEFAULT_CAPTION : docs[i].keywords[0].value}"
					height="395" />

				<button type="button" class="js-to-fav add-fav-btn">
					<span class='fav-btn-text'>Add to favorite</span>
					<svg class="news-card__icon" viewBox="0 0 32 32" width="16" height="16">
						<path fill="none" stroke="#4440f7"
							d="M9.331 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z">
						</path>
					</svg>
				</button>
			</div>


			<p class="news-card__category">${docs[i].section_name}</p>

			<h3 class="news-card__title">${docs[i].headline.main}</h3>

			<p class="news-card__text">${docs[i].abstract}</p>

		</div>
		<div class="news-card__details">
			<span class="news-card__date">${dateForRender[i]}</span>
			<a class="news-card__news-link link" href="${docs[i].web_url}" target="_blank">Read more</a>
		</div>
	</li>`;
          }
    };
	};
	// getTotalNews(amountOfFilterCards);
    refs.mainNewsList.insertAdjacentHTML('beforeend', markup);
  const arrayItem = refs.mainNewsList.children;
  const arrayRead = load('read')
  const arrayFav = load('favorite')
  const readId = arrayRead.map(item => item.id)
  const favId = arrayFav.map(item => item.id)

  Array.from(arrayItem).map(item => {
    if (readId.includes(item.firstElementChild.id)) {
      const card = item.firstElementChild;
      card.style.opacity = 0.7;
      card.firstElementChild.classList.remove('visually-hidden');
    }
    if (favId.includes(item.firstElementChild.id)) {
		const Btn = item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild
		Btn.classList.remove('js-to-fav');
        Btn.classList.add('js-from-fav');
      Btn.firstElementChild.textContent = "Remove from favorites";
      Btn.lastElementChild.firstElementChild.setAttribute('fill', '#4b48da');
      Btn.lastElementChild.firstElementChild.setAttribute('style', "fill: var(--color1, #4b48da)");
    }
  });
    if (markup = '') {
        Notiflix.Notify.info('Sorry, no matches for this request!')
    }
    return 
}

function clearmainNewsListContainer(){
	refs.mainNewsList.innerHTML = '';
	return
}

export { dateForRender };