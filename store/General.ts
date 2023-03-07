import { action, makeObservable, observable } from 'mobx';

class GeneralStore {
  @observable public text = '';

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setText(value: string): void {
    this.text = value;
  }
}
const observableGeneralStore = new GeneralStore();
export default observableGeneralStore;
