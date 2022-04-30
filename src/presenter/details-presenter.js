import {render} from '../render';
import DetailsView from '../view/details-view';

export default class DetailsPresenter {
  constructor(cards, comments) {
    this.cards = cards;
    this.comments = comments;
  }

  opened = false;

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
    if (this.opened) {
      return;
    }
    this.opened = true;

    const detailsCard = this.cards
      .find((card) => card.id === cardId);

    const detailsComments = this.comments
      .filter((comment) => detailsCard.comments.includes(comment.id));

    const detailsView = new DetailsView(detailsCard, detailsComments);

    detailsView.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', () => {
        this.opened = false;
        detailsView.getElement().remove();
      });

    render(detailsView, document.body);
  }
}
