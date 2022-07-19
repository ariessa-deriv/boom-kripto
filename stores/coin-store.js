import { action, observable } from "mobx";

export default class CoinStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  coins = observable([]);
  // filtered_coins = observable([]);
  search = observable("");

  setCoins = (coins) => {
    this.coins = coins;
  };

  setSearch = (search) => {
    this.search = search;
  };

  // setFilteredCoins = (filtered_coins) => {
  //   this.filtered_coins = filtered_coins;
  // };
}
