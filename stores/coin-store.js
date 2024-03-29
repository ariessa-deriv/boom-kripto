import { action, observable } from "mobx";

export default class CoinStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  coins = observable([]);

  setCoins = (coins) => {
    this.coins = coins;
  };
}
