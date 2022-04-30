import {generateCard} from '../mock/card';
const CARDS_COUNT = 10;


export default class CardsModel {
  cards = Array.from({length: CARDS_COUNT}, generateCard);

  getCards = () => this.cards;
}
