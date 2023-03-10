import { action, makeObservable, observable } from 'mobx';

class ListStore {
  @observable public listArray: string[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setListArray(value: string[]): void {
    this.listArray = value;
  }
}
const observableListStore = new ListStore();
export default observableListStore;
