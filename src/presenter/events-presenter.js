import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/events-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new TripEventsListView();

  constructor({ eventsContainer, pointsModel }) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventsPoints = this.pointsModel.getPoints().slice();
    const allDestinations = this.pointsModel.getDestinations().map((item) => item.name);
    const pointTypes = this.pointsModel.getOffers().map((item) => item.type);

    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);

    for (let i = 0; i < this.eventsPoints.length; i++) {
      const point = this.eventsPoints[i];
      const destination = this.pointsModel.getDestinationById(point.destination);
      const offersData = this.pointsModel.getOffersByType(point.type);
      const offersByType = offersData ? offersData.offers : [];
      const offers = offersByType.filter((offer) => point.offers.includes(offer.id));

      render(new PointView(point, destination, offers), this.eventsListComponent.getElement());
      render(new EditPointView(point, destination, allDestinations, pointTypes, offersByType), this.eventsListComponent.getElement());
    }
  }
}
