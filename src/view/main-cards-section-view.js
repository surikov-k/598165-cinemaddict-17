import AbstractView from '../framework/view/abstract-view';

const createTemplate = (cardsCount) => {

  const createSectionHeader = (count) => {
    if (count) {
      return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n';
    }
    return '<h2 class="films-list__title">There are no movies in our database</h2>';
  };

  return `<section class="films-list">
    ${createSectionHeader(cardsCount)}
    <div class="films-list__container"></div>
    </section>`;
};


export default class MainCardsSectionView extends AbstractView{
  #cardsCount = null;

  constructor(cardsCount) {
    super();
    this.#cardsCount = cardsCount;
  }

  get template() {
    return createTemplate(this.#cardsCount);
  }
}
