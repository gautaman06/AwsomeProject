import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { API_STATUSCODE, STATUSCODE } from '../constants/constant';
import { getGroupsData, getListOfUsersById } from '../firebase/QueryUtils';

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

  @observable public activeGroup: any = null;

  @observable public activeGroupUsers: any[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setGroupsList(userId?: string): Promise<{ status: API_STATUSCODE }> {
    let status = API_STATUSCODE.LOADING;
    return new Promise((resolve, reject) => {
      getGroupsData('groups', userId)
        .then((data) => {
          runInAction(() => {
            const groupsData = data as IGroups[];
            this.groups = groupsData;
            status = API_STATUSCODE.SUCCESS;
            resolve({ status: status });
          });
        })
        .catch((err) => {
          console.error(err);
          status = API_STATUSCODE.FAILED;
          reject({ status: status });
        });
    });
  }
  // public setGroupsList(userId?: string, manualAdd?, payload?): Promise<void> {
  //   // if (manualAdd) {
  //   //   const groupsList = this.groups;
  //   //   groupsList.push(payload);
  //   //   this.groups = groupsList;
  //   //   return this.groups;
  //   // } else {

  //   let status = API_STATUSCODE.LOADING;
  //   const response = getGroupsData('groups', userId);
  //     response
  //       .then((data) => {
  //         runInAction(() => {
  //           const groupsData = data as IGroups[];
  //           this.groups = groupsData;
  //           status = API_STATUSCODE.SUCCESS
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         status=API_STATUSCODE.FALED
  //       });
  //   return {status:status}
  // }

  @action.bound
  public setActiveGroup(group: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.activeGroup = group;
      this.setActiveGroupUsers(group?.users)
        .then((response) => {
          if (response) {
            resolve(response);
          }
        })
        .catch((err) => {
          reject({ status: err });
        });
    });
  }

  @action.bound
  public setActiveGroupUsers(users: any[]): Promise<{ status: API_STATUSCODE }> {
    let status = API_STATUSCODE.LOADING;
    return new Promise((resolve, reject) => {
      getListOfUsersById(users)
        .then((data) => {
          runInAction(() => {
            const usersData = data;
            this.activeGroupUsers = usersData;
            status = API_STATUSCODE.SUCCESS;
            resolve({ status: status });
          });
        })
        .catch((err) => {
          console.error(err);
          status = API_STATUSCODE.FAILED;
          reject({ status: status });
        });
    });
  }

  // @action.bound
  // public setActiveGroupUsers(users: any): void {
  //   this.activeGroupUsers = users;
  // }
}
const groupsStore = new GroupsStore();
export default groupsStore;
