import { User } from 'firebase/auth';
import { action, makeObservable, observable } from 'mobx';

class GeneralStore {
  @observable public text = '';

  @observable public user = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setText(value: string): void {
    this.text = value;
  }

  @action.bound
  public setUser(value: User): void {
    this.user = value;
  }
}
const generalStore = new GeneralStore();
export default generalStore;
