import { action, observable } from "mobx";

export default class WatchlistStore {
  constructor(root_store) {
    this.root_store = root_store;
  }
}
