import {createElement} from '../render';

const createTemplate = () => (`
  <button class="films-list__show-more">Show more</button>
`);

export default class MoreButtonView {
  #element;

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
