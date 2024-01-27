import express from 'express';
const router = express.Router();
import { getUserByClerkId, addUser } from './controllers/user';
//import transactionController from './controllers/transaction';
//import groupController from './controllers/group';
//import userGroupController from './controllers/user-group';

//USER ROUTES
router.get('/user/:id', getUserByClerkId);
router.post('/user', addUser);

//TRANSACTION ROUTES
//router.get('/transaction/accept', transactionController.getAllAcceptedTransactions);
//router.get('/transaction/pending', transactionController.getAllPendingTransactions);
//router.post('/transaction', transactionController.createTransaction);
//router.delete('/transaction/:id', transactionController.deleteTransaction);
//router.put('/transaction/:id/accept', transactionController.updateTransactionStatus);
//router.put('/transaction/:id/edit', transactionController.editTransaction);

//GROUP ROUTES
//router.post('/group', groupController.postGroup);
//router.delete('/group/:id/delete', groupController.deleteGroup);
//router.put('/group/:id/edit', groupController.editGroup);

//USER_GROUP ROUTES
//router.get('/user-group/:id', userGroupController.getGroupsByClerkId);
//router.post('/user-group', userGroupController.postGroupToUser);
//router.delete('/user-group/delete', userGroupController.deleteUserFromGroup);

router.get('/*', (_, res) => {
  res.status(404).send('RAWR! Requested resource not found 🦖\n');
});

export default router;
