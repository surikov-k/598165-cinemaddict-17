import {createElement} from '../render';

const createTemplate = () => (`
  <section class="films-list">
    <div class="films-list__container"></div>
    </section>
`);

export default class MainCardsSectionView {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
