import { User } from 'firebase/auth';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { API_STATUSCODE } from '../constants/constant';
import { getAllUsers } from '../firebase/QueryUtils';

interface IUsers {
  emailId: string;
  name: string;
  uid: string;
  status: number;
}

class GeneralStore {
  @observable public text = '';

  @observable public user = null;

  @observable public users: IUsers[] = [];

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

  @action.bound
  public setAllUsers(callback?: any): Promise<{ status: API_STATUSCODE }> {
    let status = API_STATUSCODE.LOADING;

    return new Promise((resolve, reject) => {
      getAllUsers()
        .then((data) => {
          runInAction(() => {
            this.users = data as IUsers[];
            status = API_STATUSCODE.SUCCESS;
            if (callback) {
              callback(data);
            }
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
}
const generalStore = new GeneralStore();
export default generalStore;
