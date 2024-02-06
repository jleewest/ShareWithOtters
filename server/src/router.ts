import express from 'express';
const router = express.Router();
import { getUserByClerkId, addUser, getAllUsers } from './controllers/user';
import {
  getTransactionsByClerkId,
  createTransaction,
  deleteTransaction,
  updateTransactionStatus,
  editTransaction,
  getAllTransactions,
} from './controllers/transaction';
import { postGroup, editGroup } from './controllers/group';
import {
  getGroupsByClerkId,
  addUserToGroup,
  deleteUserFromGroup,
  getUsersByGroup,
} from './controllers/user-group';

//USER ROUTES
router.get('/user/:id', getUserByClerkId);
router.get('/user', getAllUsers);
router.post('/user', addUser);

//TRANSACTION ROUTES
router.get('/transaction/:groupId/:userId', getTransactionsByClerkId);
router.get('/transactions', getAllTransactions);
router.post('/transaction', createTransaction);
router.delete('/transaction/delete/:id', deleteTransaction);
router.put('/transaction/accept/:id', updateTransactionStatus);
router.put('/transaction/edit/:id', editTransaction);

//GROUP ROUTES
router.post('/group', postGroup);
router.put('/group/edit/:id', editGroup);

//USER_GROUP ROUTES
router.get('/user-group/:id', getGroupsByClerkId);
router.get('/user-group/users/:groupId', getUsersByGroup);
router.post('/user-group', addUserToGroup);
router.delete('/user-group/delete', deleteUserFromGroup);

router.get('/*', (_, res) => {
  res.status(404).send('RAWR! Requested resource not found 🦖\n');
});

export default router;
