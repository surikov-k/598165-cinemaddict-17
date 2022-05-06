import AbstractView from '../framework/view/abstract-view';

const createTemplate = (title) => (`
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container"></div>
   </section>
`);

export default class ExtraCardsSectionView extends AbstractView{
  #title = null;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createTemplate(this.#title);
  }
}
