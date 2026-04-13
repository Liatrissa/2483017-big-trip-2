import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainerElement,
  filterModel,
  pointsModel,
});

const newPointButtonElement = siteHeaderElement.querySelector('.trip-main__event-add-btn');

function handleNewPointFormClose() {
  newPointButtonElement.disabled = false;
}

function handleNewPointButtonClick() {
  eventsPresenter.createPoint();
  newPointButtonElement.disabled = true;
}

newPointButtonElement.addEventListener('click', handleNewPointButtonClick);

filterPresenter.init();
eventsPresenter.init();
