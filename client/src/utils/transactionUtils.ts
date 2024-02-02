import { TransactionWithRenderType } from '..';

//sort transactions from newest to oldest
export function sortNewestFirst(transaction: TransactionWithRenderType[]) {
  return transaction.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
}
