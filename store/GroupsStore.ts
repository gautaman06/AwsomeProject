import { action, makeObservable, observable } from 'mobx';
import { getFirebaseData } from '../Utils/Utils';

class GroupsStore {
  @observable public groups: any[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setListArray(): void {
    const response = getFirebaseData('groups');
    response
      .then((data) => {
        this.groups = data;
      })
      .catch((err) => console.log(err));
  }
}
const observableGroupsStore = new GroupsStore();
export default observableGroupsStore;
