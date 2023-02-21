import { action, observable } from 'mobx';

class ListStore {
  @observable public listArray: string[] = [];

  constructor() {}

  @action.bound
  public setListArray(value: string[]): void {
    this.listArray = value;
  }
}

export default ListStore;
