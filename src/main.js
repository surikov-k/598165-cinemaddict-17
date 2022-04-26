import CardsContainerPresenter from './presenter/cards-container-presenter';
import CardsContainerView from './view/cards-container-view';
import FilterView from './view/filter-view';
import ProfileView from './view/profile-view';
import SortView from './view/sort-view';
import {render} from './render';

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

render(new ProfileView(), header);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

const cardsContainerView = new CardsContainerView();
render(cardsContainerView, siteMainElement);
new CardsContainerPresenter()
  .init(cardsContainerView.getElement());

