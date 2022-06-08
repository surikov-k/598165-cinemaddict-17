import AbstractView from '../framework/view/abstract-view';

const getTemplate = (count) => `
    <section class="footer__statistics">
      ${count}
    </section>`;

export default class TotalMoviesView extends AbstractView {
  #count = null;
  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return getTemplate(this.#count);
  }
}
