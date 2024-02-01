import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//GET ALL TRANSACTIONS FOR USER (by user.id)
export async function getTransactionsByClerkId(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const allTransactionData = await prisma.transaction.findMany({
      where: {
        OR: [{ transactor: id }, { transactee: id, transactor: { not: id } }],
      },
      include: {
        userActor: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        userActee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    //filter expenses in which user is transactor
    const allTransactions = allTransactionData.map((transaction) => {
      if (
        transaction.status === 'pending' &&
        transaction.type === 'expense' &&
        transaction.transactee === id &&
        transaction.transactor === id
      ) {
        return { ...transaction, status: 'active' };
      } else {
        return transaction;
      }
    });

    // Sort transactions by status and type
    const sortedTransactions = {
      pending: {
        expense: allTransactions.filter(
          (transaction) =>
            transaction.status === 'pending' &&
            transaction.type === 'expense' &&
            transaction.transactee === id &&
            transaction.transactor !== id
        ),
        payment: allTransactions.filter(
          (transaction) =>
            transaction.status === 'pending' &&
            transaction.type === 'payment' &&
            transaction.transactee === id
        ),
      },
      active: {
        expense: {
          confirmedExpenses: allTransactions.filter(
            (transaction) =>
              transaction.status === 'active' && transaction.type === 'expense'
          ),
          awaitedPendingExpenseSentToOther: allTransactions.filter(
            (transaction) =>
              transaction.status === 'pending' &&
              transaction.type === 'expense' &&
              transaction.transactor === id &&
              transaction.transactee !== id
          ),
        },
        payment: {
          pendingPaid: allTransactions.filter(
            (transaction) =>
              transaction.status === 'pending' &&
              transaction.type === 'payment' &&
              transaction.transactor === id &&
              transaction.transactee !== id
          ),
          paid: allTransactions.filter(
            (transaction) =>
              transaction.status === 'active' &&
              transaction.type === 'payment' &&
              transaction.transactor === id
          ),
          received: allTransactions.filter(
            (transaction) =>
              transaction.status === 'active' &&
              transaction.type === 'payment' &&
              transaction.transactee === id
          ),
        },
      },
    };

    //RETURN NESTED OBJECT OF SORTED TRANSACTIONS
    return res.json(sortedTransactions);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

//SPLITS TRANSACTIONS AND POSTS TRANSACTION FOR EACH PERSON IN THE SPLIT (body incl: transactee[](incl transactor), amount[])
export async function createTransaction(req: Request, res: Response) {
  try {
    const { transactee, amount, ...otherTransactionProperties } = req.body;
    const savedTransactions = [];

    //iterate through all transactees and post new transaction for each transactee
    for (let i = 0; i < transactee.length; i++) {
      const saveTransaction = await prisma.transaction.create({
        data: {
          transactee: transactee[i],
          amount: amount[i],
          ...otherTransactionProperties,
        },
      });
      savedTransactions.push(saveTransaction);
    }
    console.log(savedTransactions);
    res.json(savedTransactions);
    res.status(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

//DELETE TRANSACTION (delete button gets transaction id to sent to PUT request)
export async function deleteTransaction(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const saved = await prisma.transaction.delete({ where: { id: id } });
    req.body = JSON.stringify({ message: 'Message successfully deleted' });
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

//MOVE TRANSACTION FROM PENDING TO ACTIVE (accept button gets transaction id to send to PUT request)
export async function updateTransactionStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const message = await prisma.transaction.update({
      where: { id: id },
      data: { status: 'active' },
    });
    res.json(message);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

//EDIT TRANSACTION (edit button gets transaction id to send to PUT request -- edit button only visible for user.id = transactor)
export async function editTransaction(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const message = await prisma.transaction.update({
      where: { id: id },
      data: {
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description,
        notes: req.body.notes,
      },
    });
    res.json(message);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
