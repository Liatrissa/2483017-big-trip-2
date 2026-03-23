import { DESTINATIONS } from '../mock/destinations.js';
import { OFFERS } from '../mock/offers.js';
import { POINTS } from '../mock/points.js';

export default class PointsModel {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = DESTINATIONS;
    this.offers = OFFERS;
    this.points = POINTS;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((item) => item.type === type);
  }
}
