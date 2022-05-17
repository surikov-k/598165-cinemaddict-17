import {CARDS_COUNT, COMMENTS_COUNT} from './const';
import CardsModel from './model/cards-model';
import CommentsModel from './model/comments-model';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import MainBoardView from './view/main-board-view';
import ProfileView from './view/profile-view';
import {generateCard} from './mock/card';
import {generateComment} from './mock/comment';
import {generateFilter} from './mock/filter';
import {render} from './framework/render';

const cards = Array.from({length: CARDS_COUNT}, generateCard);
const comments = Array.from({length: COMMENTS_COUNT}, generateComment);
const filter = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

render(new ProfileView(), header);
render(new FilterView(filter), siteMainElement);

const mainBoardView = new MainBoardView();
render(mainBoardView, siteMainElement);

const mainBoardPresenter = new BoardPresenter(
  new CardsModel(cards),
  new CommentsModel(comments)
);

mainBoardPresenter
  .init(mainBoardView.element);

