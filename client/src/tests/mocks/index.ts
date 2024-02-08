export const mocks = {
  //mock empty transacton
  emptyTransactions: [],

  //mock users
  users: [
    {
      clerkId: 'user_2bdVteG6kJ57UH59qHiylqJpJwc',
      firstName: 'Jerry',
      lastName: 'Fredrick',
      email: 'test@gmail.com',
    },

    {
      clerkId: 'clerkid2',
      firstName: 'Sam',
      lastName: 'Thompson',
      email: 'testing@gmail.com',
    },
  ],

  //mock groups
  group: [
    {
      group: {
        title: 'Fam Vacay',
        description: 'just the sibs',
      },
    },
    { group: { title: 'Greece trip', description: 'friendship' } },
  ],

  //mock user_groups
  user_group: [
    {
      userId: 'clerkid1',
      groupId: 1,
    },
    { userId: 'clerkid2', groupId: 1 },
  ],

  //mock transactions
  transactions: [
    {
      type: 'expense',
      date: '2024-01-19',
      transactor: 'clerkid1',
      transactee: ['clerkid2'],
      description: 'Hotel',
      amount: [100],
    },
    {
      type: 'payment',
      date: '2024-01-19',
      transactor: 'clerkid1',
      transactee: ['clerkid2'],
      description: 'Hotel',
      amount: [200],
    },
    {
      type: 'payment',
      date: '2024-01-19',
      transactor: 'clerkid1',
      transactee: ['clerkid1', 'clerkid2'],
      description: 'Hotel',
      amount: [100, 200],
    },
  ],

  //mock edit transaction
  editTransaction: {
    date: '2024-02-19',
    description: 'Bank',
    amount: 300,
    notes: 'Hello',
  },
};
