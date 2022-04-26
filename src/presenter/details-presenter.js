import {render} from '../render';
import DetailsView from '../view/details-view';

export default class DetailsPresenter {
  opened = false;
  detailsView = new DetailsView();

  init(container) {
    container
      .querySelectorAll('.film-card')
      .forEach((card) => {
        card.addEventListener('click', () => {
          this.open(this.detailsView);
        });
      });
  }

  open() {
    if (this.opened) {
      return;
    }
    this.opened = true;

    this.detailsView.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', () => {
        this.opened = false;
        this.detailsView.getElement().remove();
      });

    render(this.detailsView, document.body);
  }
}
