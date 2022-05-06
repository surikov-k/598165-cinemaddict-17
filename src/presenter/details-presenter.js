import DetailsView from '../view/details-view';
import {remove, render} from '../framework/render';

export default class DetailsPresenter {
  #isOpened = false;
  #cards = null;
  #commentsModel = null;
  #detailsView = null;

  constructor(cardsModel, commentsModel) {
    this.#cards = [...cardsModel.cards];
    this.#commentsModel = commentsModel;
  }

  open(detailsCard) {
    if (this.#isOpened) {
      return;
    }
    const detailsComments = this.#getCardComments(detailsCard);
    this.#detailsView = new DetailsView(detailsCard, detailsComments);

    this.#isOpened = true;
    this.#detailsView.toggleScroll();

    this.#detailsView.setCloseHandler(this.#close);

    window.addEventListener('keydown', this.#onEscKeydown);

    render(this.#detailsView, document.body);
  }

  #close = () => {
    this.#isOpened = false;
    window.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#detailsView);
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#detailsView.isInputActive()) {
      evt.preventDefault();
      this.#detailsView.toggleScroll();
      this.#close();
    }
  };

  #getCardComments(card) {
    const comments = [];
    card.comments.forEach((commentId) => {
      comments.push(this.#commentsModel.getComment(commentId));
    });
    return comments;
  }
}
