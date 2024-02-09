# ShareWithOtters

ShareWithOtters is an application designed to alleviate the stress of tracking and sharing expenses between people. Anything from managing household finances, road-tripping with friends, or splitting a restaurant bill, ShareWithOtters is here to help.

### Features:

- Create groups and invite others to join your shared-expense group

- Add expenses, with the ability to auto calculate an even split

- Add payment when you reimburse another

- Keep track of how much you owe each individual in the group and how much each individual owes you

- Graphical representation of expenses and payments over time

- Ability to 'accept' transactions that others send to you -- only accepted transactions appear in your 'Recent Transactions' table, ensuring that you can approve all transactions and discover any errors before they are added to your transaction history.

- All users in a transaction can add notes

- Only users who create the transaction can edit the expense or payment amount

## Getting Started

- The ShareWithOtters folder contains a full-stack application with two sub-folders: client and server. Inside each of them, run `npm install` to install the required dependencies.

- You will need to create your own authorization account and project folder with Clerk: https://clerk.com/

- This application uses Dotenv to store configurations for this code. You will need to create a `.env` file in both the client and server root of your project and then add your personal environment variables for the following:

  - <u>Client</u>: `VITE_CLERK_PUBLISHABLE_KEY` (this will be equal to the publishable key you are provided in Clerk) and `VITE_BASE_URL` (this will be equal to your server localhost or url).

    - <u>Server</u>: `PORT` (this will be your server port) and `DATABASE_URL` (this will be configured with Postgres through Prisma). An example of your DATABASE_URL may look like: `"postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"` (postgresql://USER:PASSWORD@HOST:PORT/DATABASE NAME?schema=SCHEMA NAME)

- Once your environment is set up, you can use the command `npm run dev` from each root folder to run the code. Notice that both the client and the server need to be running for the application to work.

## Tech Stack

- <u>Frontend</u>: Vite-React-Typescript, Clerk, Chart.js, Material UI, Vanilla CSS

- <u>Backend</u>: Node.js, Express, Prisma, Postgres

- <u>Testing</u>: Vitest, Cypress

## Contributors

Jenna Westendorf:

- GitHub: [jleewest (Jenna Westendorf) · GitHub](https://github.com/jleewest)

- LinkedIn: [Jenna Westendorf | LinkedIn](https://www.linkedin.com/in/jenna-westendorf/)

Giovanny Garcia:

- GitHub: [GGar99 · GitHub](https://github.com/GGar99)
