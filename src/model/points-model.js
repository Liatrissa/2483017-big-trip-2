import { DESTINATIONS } from '../mock/destinations.js';
import { OFFERS } from '../mock/offers.js';
import { POINTS } from '../mock/points.js';

export default class PointsModel {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = DESTINATIONS;
    this.#offers = OFFERS;
    this.#points = POINTS;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type);
  }
}
