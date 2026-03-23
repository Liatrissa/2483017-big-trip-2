import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
});

render(new FiltersView(), filtersContainerElement);

eventsPresenter.init();
