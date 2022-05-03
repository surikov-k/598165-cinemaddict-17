import CommentsModel from '../model/comments-model';
import DetailsView from '../view/details-view';
import {render} from '../render';

export default class DetailsPresenter {
  #isOpened = false;
  #cards = null;
  #commentsModel = null;
  #detailsView = null;
  #commentInput = null;

  constructor(cards) {
    this.#cards = cards;
    this.#commentsModel = new CommentsModel(this.#cards);
  }

  open(cardId) {
    if (this.#isOpened) {
      return;
    }
    this.#isOpened = true;
    this.#toggleScroll();

    const detailsCard = this.#cards
      .find((card) => card.id === cardId);

    const detailsComments = this.#commentsModel.getComments(cardId);

    this.#detailsView = new DetailsView(detailsCard, detailsComments);
    this.#commentInput = this.#detailsView.element
      .querySelector('.film-details__comment-input');

    this.#detailsView.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', () => {
        this.#close();
      });

    window.addEventListener('keydown', this.#onEscKeydown);

    render(this.#detailsView, document.body);
  }

  #close = () => {
    this.#isOpened = false;
    window.removeEventListener('keydown', this.#onEscKeydown);
    this.#detailsView.element.remove();
    this.#toggleScroll();
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#isInputActive()) {
      evt.preventDefault();
      this.#close();
    }
  };

  #isInputActive = () => document.activeElement === this.#commentInput;

  #toggleScroll = () => {
    document.body.classList.toggle('hide-overflow');
  };
}
