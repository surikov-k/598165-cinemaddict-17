import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => (`
    <section class="films"></section>
`);

export default class MainBoardView extends AbstractView{
  get template() {
    return createTemplate();
  }
}
