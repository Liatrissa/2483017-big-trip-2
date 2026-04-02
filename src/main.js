import {render} from './framework/render.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filtersContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FiltersView({ filters }), filtersContainerElement);

eventsPresenter.init();
