import BoardPresenter from './presenter/board-presenter';
import CardsModel from './model/cards-model';
import CommentsModel from './model/comments-model';
import MainBoardView from './view/main-board-view';
import ProfilePresenter from './presenter/profile-presenter';
import {generateCard} from './mock/card';
import {generateComment} from './mock/comment';
import {render} from './framework/render';

import {CARDS_COUNT, COMMENTS_COUNT} from './const';

const cards = Array.from({length: CARDS_COUNT}, generateCard);
const comments = Array.from({length: COMMENTS_COUNT}, generateComment);

const cardsModel = new CardsModel(cards);
const commentsModel = new CommentsModel(comments);

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');

document
  .querySelector('.footer__statistics')
  .textContent = cardsModel.cards.length;

const profilePresenter  = new ProfilePresenter(header, cardsModel);
profilePresenter.init();

const mainBoardView = new MainBoardView();
render(mainBoardView, siteMainElement);

const mainBoardPresenter = new BoardPresenter(
  cardsModel,
  commentsModel
);

mainBoardPresenter
  .init(mainBoardView.element);

