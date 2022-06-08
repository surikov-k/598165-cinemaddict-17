import BoardPresenter from './presenter/board-presenter';
import CardsModel from './model/cards-model';
import CommentsModel from './model/comments-model';
import MainBoardView from './view/main-board-view';
import ProfilePresenter from './presenter/profile-presenter';
import {render} from './framework/render';

const AUTHORIZATION = 'Basic 9sd8f7a9sdf7';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';


import CardsApiServices from './services/cards-api-services';
import CommentsApiService from './services/comments-api-service';
import TotalMoviesPresenter from './presenter/total-movies-presenter';


const cardsModel = new CardsModel(new CardsApiServices(
  END_POINT,
  AUTHORIZATION
));

const commentsModel = new CommentsModel(new CommentsApiService(
  END_POINT,
  AUTHORIZATION
));

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


const profilePresenter  = new ProfilePresenter(header, cardsModel);
profilePresenter.init();

const mainBoardView = new MainBoardView();
render(mainBoardView, siteMainElement);

const mainBoardPresenter = new BoardPresenter(
  cardsModel,
  commentsModel
);

new TotalMoviesPresenter(footer, cardsModel);

mainBoardPresenter
  .init(mainBoardView.element);
cardsModel.init();
