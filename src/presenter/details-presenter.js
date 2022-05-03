import CommentsModel from '../model/comments-model';
import DetailsView from '../view/details-view';
import {render} from '../render';

export default class DetailsPresenter {
  constructor(cards) {
    this.cards = cards;
    this.commentsModel = new CommentsModel(this.cards);
  }

  isOpened = false;

  init(container) {
    container
      .querySelectorAll('.film-card')
      .forEach((card) => {
        card.addEventListener('click', (evt) => {
          if (!evt.target.classList.contains('film-card__controls-item')) {
            this.open(evt.currentTarget.dataset.cardId);
          }
        });
      });
  }

  open(cardId) {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;

    const detailsCard = this.cards
      .find((card) => card.id === cardId);

    const detailsComments = this.commentsModel.getComments(cardId);

    const detailsView = new DetailsView(detailsCard, detailsComments);

    detailsView.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', () => {
        this.isOpened = false;
        detailsView.getElement().remove();
      });

    render(detailsView, document.body);
  }
}
