import CardsModel from './model/cards-model';
import CommentsModel from './model/comments-model';
import FilterView from './view/filter-view';
import MainBoardPresenter from './presenter/main-board-presenter';
import MainBoardView from './view/main-board-view';
import ProfileView from './view/profile-view';
import SortView from './view/sort-view';
import {render} from './render';

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

render(new ProfileView(), header);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

const mainBoardView = new MainBoardView();
render(mainBoardView, siteMainElement);

const mainBoardPresenter = new MainBoardPresenter(new CardsModel(), new CommentsModel());

mainBoardPresenter
  .init(mainBoardView.element);

