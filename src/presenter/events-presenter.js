import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/events-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventsListComponent = new TripEventsListView();
  #eventsPoints = [];
  #pointPresenters = new Map();
  #allDestinations = [];
  #pointTypes = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = this.#pointsModel.points.slice();
    this.#allDestinations = this.#pointsModel.destinations.map((item) => item.name);
    this.#pointTypes = this.#pointsModel.offers.map((item) => item.type);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#allDestinations, this.#pointTypes);
  };

  #renderSort() {
    render(new SortView(), this.#eventsContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#eventsContainer);
  }

  #renderNoPoints() {
    render(new NoPointView(), this.#eventsContainer);
  }

  #renderPoints() {
    this.#eventsPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    if (this.#eventsPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#eventsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.#allDestinations, this.#pointTypes);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
