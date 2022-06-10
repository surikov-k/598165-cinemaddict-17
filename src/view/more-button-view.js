import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => (`
  <button class="films-list__show-more">Show more</button>
`);

export default class MoreButtonView extends AbstractView {

  get template() {
    return createTemplate();
  }

  setClickHandler(callback)  {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
