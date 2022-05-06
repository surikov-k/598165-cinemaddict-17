import CardsModel from './model/cards-model';
import CommentsModel from './model/comments-model';
import FilterView from './view/filter-view';
import MainBoardPresenter from './presenter/main-board-presenter';
import MainBoardView from './view/main-board-view';
import ProfileView from './view/profile-view';
import SortView from './view/sort-view';
import {generateCard} from './mock/card';
import {generateComment} from './mock/comment';
import {render} from './render';

const CARDS_COUNT = 12;
const COMMENTS_COUNT = 50;

const cards = Array.from({length: CARDS_COUNT}, generateCard);
const comments = Array.from({length: COMMENTS_COUNT}, generateComment);

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

render(new ProfileView(), header);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

const mainBoardView = new MainBoardView();
render(mainBoardView, siteMainElement);


const mainBoardPresenter = new MainBoardPresenter(
  new CardsModel(cards),
  new CommentsModel(comments)
);

mainBoardPresenter
  .init(mainBoardView.element);

