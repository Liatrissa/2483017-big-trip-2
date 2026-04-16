import { render, remove, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #pointsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointComponent = null;

  constructor({ pointsListContainer, pointsModel, onDataChange, onDestroy }) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointComponent !== null) {
      return;
    }

    const allDestinations = this.#pointsModel.destinations;
    const allOffers = this.#pointsModel.offers;
    const pointTypes = allOffers.map((offerItem) => offerItem.type);

    const defaultType = pointTypes[0];
    const defaultDestinationId = allDestinations[0]?.id ?? '';
    const offersData = this.#pointsModel.getOffersByType(defaultType);
    const offersByType = offersData ? offersData.offers : [];
    const destination = this.#pointsModel.getDestinationById(defaultDestinationId);

    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + 60 * 60 * 1000);

    const emptyPoint = {
      basePrice: 50,
      dateFrom: currentDate.toISOString(),
      dateTo: endDate.toISOString(),
      destination: defaultDestinationId,
      isFavorite: false,
      offers: [],
      type: defaultType
    };

    this.#pointComponent = new EditPointView({
      point: emptyPoint,
      destination,
      allDestinations,
      pointTypes,
      offersByType,
      allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onRollupClick: this.#handleRollupClick
    });

    render(this.#pointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#pointComponent);
    this.#pointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleRollupClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
