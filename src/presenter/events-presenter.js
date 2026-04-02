import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/events-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #eventsListComponent = new TripEventsListView();
  #eventsPoints = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = this.#pointsModel.points.slice();
    const allDestinations = this.#pointsModel.destinations.map((item) => item.name);
    const pointTypes = this.#pointsModel.offers.map((item) => item.type);

    this.#renderBoard(allDestinations, pointTypes);
  }

  #renderBoard(allDestinations, pointTypes) {
    if (this.#eventsPoints.length === 0) {
      render(new NoPointView(), this.#eventsContainer);
      return;
    }

    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#eventsPoints.length; i++) {
      this.#renderPoint(this.#eventsPoints[i], allDestinations, pointTypes);
    }
  }

  #renderPoint(point, allDestinations, pointTypes) {
    const destination = this.#pointsModel.getDestinationById(point.destination);
    const offersData = this.#pointsModel.getOffersByType(point.type);
    const offersByType = offersData ? offersData.offers : [];
    const offers = offersByType.filter((offer) => point.offers.includes(offer.id));

    const pointComponent = new PointView({
      point,
      destination,
      offers,
      onEditClick: replacePointToEdit
    });

    const editPointComponent = new EditPointView({
      point,
      destination,
      allDestinations,
      pointTypes,
      offersByType,
      onFormSubmit: replaceEditToPoint,
      onRollupClick: replaceEditToPoint
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
      }
    };

    function replacePointToEdit() {
      replace(editPointComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    }

    function replaceEditToPoint() {
      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }

    render(pointComponent, this.#eventsListComponent.element);
  }
}
