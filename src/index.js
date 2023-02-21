import { save, load } from './js/locale-storage';

// HEADER SCRIPTS
import './js/news-data/news-by-search';
import './js/switcher-theme';
import mobileMenu from './js/mobile-menu';
import headerResponsive from './js/headerResponsive';
import NewsApiService from './js/api/news-main-api';
import './js/calendar';
import './js/news-data/news-category';
import './js/news-data/news-search-by-category';
import './js/weather'

// MAIN SCRIPTS
import './js/news-data/news-popular';
import './js/categories';

import favorite from './js/favoriteAddToLS';

mobileMenu();
headerResponsive();

favorite();
