import {createElement} from '../render';

const createTemplate = () => (`
    <section class="films"></section>
`);

export default class CardsContainerView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
