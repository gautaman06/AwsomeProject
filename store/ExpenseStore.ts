import { action, makeObservable, observable, runInAction } from 'mobx';
import { addDocument, getExpenseList } from '../firebase/QueryUtils';

class ExpenseStore {
  @observable public expenseList = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  public setExpenseList(userId?: string, groupId?): void {
    const response = getExpenseList('expense', userId, groupId);
    response
      .then((data) => {
        runInAction(() => {
          const expenseList = data as any;
          this.expenseList = expenseList;
        });
      })
      .catch((err) => console.log(err));
  }

  @action.bound
  public addExpense(payload: any): void {
    addDocument('expense', payload);
    // const response = getExpenseList('expense', userId, ' 643EJI1EEYDjTxDiKTaR ');
    // response
    //   .then((data) => {
    //     runInAction(() => {
    //       const expenseList = data as any;
    //       this.expenseList = expenseList;
    //       console.log(expenseList);
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }
}
const expenseStore = new ExpenseStore();
export default expenseStore;
