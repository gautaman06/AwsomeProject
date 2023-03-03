import { action, observable } from 'mobx';

class GeneralStore {
  @observable public theme: string = 'light';

  constructor() {}

  @action.bound
  public setListArray(value: string): void {
    this.theme = value;
  }
}

export default GeneralStore;
