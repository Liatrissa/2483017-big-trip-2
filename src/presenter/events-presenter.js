import { render, remove } from '../framework/render.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/events-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #eventsListComponent = new TripEventsListView();
  #pointPresenters = new Map();
  #allDestinations = [];
  #pointTypes = [];
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor({ eventsContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#eventsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints.sort(sortPointDay);
  }

  init() {
    this.#allDestinations = this.#pointsModel.destinations;
    this.#pointTypes = this.#pointsModel.offers.map((item) => item.type);

    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id)?.init(data, this.#allDestinations, this.#pointTypes);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#allDestinations = this.#pointsModel.destinations;
        this.#pointTypes = this.#pointsModel.offers.map((item) => item.type);
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #sortPoints(sortType) {
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#eventsContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventsContainer);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints(points);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#eventsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.#allDestinations, this.#pointTypes);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
