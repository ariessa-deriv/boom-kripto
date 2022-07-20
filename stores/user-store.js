import { action, observable } from "mobx";

export default class UserStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  user = observable("");
  authenticationState = observable("");

  setUser = (user) => {
    this.user = user;
  };

  setAuthenticationState = (authenticationState) => {
    this.authenticationState = authenticationState;
  };
}
