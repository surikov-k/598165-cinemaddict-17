import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => (`
  <section class="films-list">
    <div class="films-list__container"></div>
    </section>
`);

export default class MainCardsSectionView extends AbstractView{
  get template() {
    return createTemplate();
  }
}
