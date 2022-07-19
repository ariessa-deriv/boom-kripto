import React from "react";
import CoinStore from "./coin-store";
import WatchlistStore from "./watchlist-store";

class RootStore {
  constructor() {
    this.coin_store = new CoinStore(this);
    this.watchlist_store = new WatchlistStore(this);
  }
}

let stores_context;

export const useStores = () => {
  if (!stores_context) {
    const root_store = new RootStore();

    stores_context = React.createContext({
      coin_store: root_store.coin_store,
      watchlist_store: root_store.watchlist_store,
    });
  }

  return React.useContext(stores_context);
};
