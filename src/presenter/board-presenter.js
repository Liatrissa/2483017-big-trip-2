import SortView from '../view/sort-view.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    const listElement = this.boardComponent.getElement();
    render(new EditPointView(), listElement);
    render(new AddNewPointView(), listElement);
    for (let i = 0; i < 3; i++) {
      render(new PointView(), listElement);
    }
  }
}
