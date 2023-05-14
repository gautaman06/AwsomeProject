import { action, makeObservable, observable } from 'mobx';
import { getGroupsData } from '../firebase/Utils';

interface IGroups {
  category: string;
  createdAt: number;
  debts: boolean;
  members: number;
  name: string;
  setteledUp: boolean;
  uid: string;
  id: string;
}

class GroupsStore {
  @observable public groups: IGroups[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setGroupsList(userId: string): void {
    const response = getGroupsData('groups', userId);
    response
      .then((data) => {
        this.groups = data as IGroups[];
      })
      .catch((err) => console.log(err));
  }
}
const groupsStore = new GroupsStore();
export default groupsStore;
