import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeEventDate } from '../utils/point.js';

function createEditPointTemplate(state) {
  const {
    id,
    type,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    destination,
    allDestinations,
    pointTypes,
    offersByType
  } = state;

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-${id}" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => ` <div class="event__type-item">
                          <input ${pointType === type ? 'checked' : ''}
                          id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
                          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${id}">${pointType}</label>
                        </div>`).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}" required>
                    <datalist id="destination-list-${id}">
                    ${allDestinations.map((item)=> `<option value="${item.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY HH:mm')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input
                      class="event__input event__input--price"
                      id="event-price-${id}"
                      type="number"
                      name="event-price"
                      value="${basePrice}"
                      min="0"
                      required
                    >
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${offersByType.map((offer) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${offer.id}-${id}"
                        type="checkbox"
                        name="event-offer-${offer.id}"
                        value="${offer.id}"
                        ${offers.includes(offer.id) ? 'checked' : ''}>

                        <label class="event__offer-label" for="event-offer-${offer.id}-${id}">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">${destination.name}</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destination.pictures.map((picture) => `<img class="event__photo"
                        src="${picture.src}" alt="${picture.description}">`).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleRollupClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    point,
    destination,
    allDestinations,
    pointTypes,
    offersByType,
    allOffers,
    onFormSubmit,
    onDeleteClick,
    onRollupClick
  }) {
    super();

    this._setState(EditPointView.parsePointToState({
      point,
      destination,
      allDestinations,
      pointTypes,
      offersByType,
      allOffers
    }));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleRollupClick = onRollupClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point, destination, offersByType) {
    this.updateElement(EditPointView.parsePointToState({
      point,
      destination,
      allDestinations: this._state.allDestinations,
      pointTypes: this._state.pointTypes,
      offersByType,
      allOffers: this._state.allOffers
    }));
  }

  _restoreHandlers() {
    const rollupButton = this.element.querySelector('.event__rollup-btn');
    const pointTypeGroup = this.element.querySelector('.event__type-group');
    const destinationInput = this.element.querySelector('.event__input--destination');
    const priceInput = this.element.querySelector('.event__input--price');
    const offersContainer = this.element.querySelector('.event__available-offers');
    const resetButton = this.element.querySelector('.event__reset-btn');

    this.element.addEventListener('submit', this.#formSubmitHandler);
    resetButton.addEventListener('click', this.#deleteClickHandler);
    rollupButton.addEventListener('click', this.#rollupClickHandler);
    pointTypeGroup.addEventListener('change', this.#pointTypeChangeHandler);
    destinationInput.addEventListener('input', this.#destinationChangeHandler);

    priceInput.addEventListener('input', this.#priceInputHandler);
    offersContainer.addEventListener('change', this.#offersChangeHandler);

    this.#setDatepickers();
  }

  #pointTypeChangeHandler = (evt) => {
    const newType = evt.target.value;
    const newOffersByType = this._state.allOffers?.find((offer) => offer.type === newType)?.offers ?? [];

    this.updateElement({
      type: newType,
      offersByType: newOffersByType,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.target.setCustomValidity('');

    const selectedDestination = this._state.allDestinations.find(
      (item) => item.name === evt.target.value
    );

    if (!selectedDestination) {
      return;
    }

    this._setState({
      destination: selectedDestination
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #offersChangeHandler = (evt) => {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const offerId = evt.target.value;
    const currentOffers = this._state.offers;

    const updatedOffers = evt.target.checked
      ? [...currentOffers, offerId]
      : currentOffers.filter((id) => id !== offerId);

    this._setState({
      offers: updatedOffers
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const destinationInput = this.element.querySelector('.event__input--destination');
    const priceInput = this.element.querySelector('.event__input--price');

    const selectedDestination = this._state.allDestinations.find(
      (item) => item.name === destinationInput.value
    );

    if (!selectedDestination) {
      destinationInput.setCustomValidity('Выберите город из списка');
      destinationInput.reportValidity();
      return;
    }

    destinationInput.setCustomValidity('');

    if (!/^\d+$/.test(priceInput.value)) {
      priceInput.setCustomValidity('Введите корректную цену');
      priceInput.reportValidity();
      return;
    }

    priceInput.setCustomValidity('');

    this.#handleFormSubmit(EditPointView.parseStateToPoint({
      ...this._state,
      destination: selectedDestination,
      basePrice: Number(priceInput.value)
    }));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  static parsePointToState({ point, destination, allDestinations, pointTypes, offersByType, allOffers }) {
    return {
      ...point,
      destination,
      allDestinations,
      pointTypes,
      offersByType,
      allOffers
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    point.destination = state.destination.id;

    delete point.allDestinations;
    delete point.pointTypes;
    delete point.offersByType;
    delete point.allOffers;

    return point;
  }
}
