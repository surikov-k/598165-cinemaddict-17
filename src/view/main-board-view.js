import {createElement} from '../render';

const createTemplate = () => (`
    <section class="films"></section>
`);

export default class MainBoardView {
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
