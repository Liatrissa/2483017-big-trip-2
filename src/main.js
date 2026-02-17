import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new FiltersView(), filtersContainerElement);

boardPresenter.init();
