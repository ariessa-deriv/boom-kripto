import { action, observable } from "mobx";

export default class UserStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  user = observable("");

  setUser = (user) => {
    this.user = user;
  };
}
