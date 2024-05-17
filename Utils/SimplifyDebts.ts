const minimizeTransaction = (transactions) => {
  let balances = {};

  // Step 1: Calculate total balances
  transactions.forEach((transaction) => {
    let { amount, creditorId, debtorId } = transaction;
    balances[debtorId] = (balances[debtorId] || 0) - amount;
    balances[creditorId] = (balances[creditorId] || 0) + amount;
  });

  // Step 2: Identify pairs
  let pairs = [];
  for (let user in balances) {
    if (balances[user] !== 0) {
      pairs.push(user);
    }
  }

  // Step 3: Sort by amount owed
  pairs.sort((a, b) => balances[a] - balances[b]);

  // Step 4: Settle debts
  let transactionsNeeded = [];
  while (pairs.length > 1) {
    let debtorId = pairs[0];
    let creditorId = pairs[pairs.length - 1];
    let amount = Math.min(Math.abs(balances[debtorId]), balances[creditorId]);

    balances[debtorId] += amount;
    balances[creditorId] -= amount;

    const debtor = transactions.find((item) => item.debtorId === debtorId).debtor;
    const creditor = transactions.find((item) => item.creditorId === creditorId).creditor;

    transactionsNeeded.push({ debtorId, creditorId, amount, debtor, creditor });

    if (balances[debtorId] === 0) {
      pairs.shift();
    }
    if (balances[creditorId] === 0) {
      pairs.pop();
    }
  }

  // Step 5: Return transactions needed to settle debts
  return transactionsNeeded;
};

const formatTransactionHistory = (transactions) => {
  const formattedTransactions = [];

  transactions.forEach((transaction) => {
    const creditor = transaction.paidBy.name;
    const creditorId = transaction.paidBy.id;

    transaction.members.forEach((member) => {
      const debtor = member.name;
      const debtorId = member.id;
      if (creditorId !== debtorId) {
        let amount;
        if (transaction.splitBy === 1) {
          amount = transaction.totalAmount / transaction.members.length;
        } else {
          amount = member.amount;
        }

        formattedTransactions.push({
          debtor,
          debtorId,
          creditor,
          creditorId,
          amount,
        });
      }
    });
  });

  const debtsTransaction = minimizeTransaction(formattedTransactions);
  return debtsTransaction;
};

export { minimizeTransaction, formatTransactionHistory };
