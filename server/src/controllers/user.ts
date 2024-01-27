import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//TO ADD USER TO GROUP, EXPENSE, OR PAYMENT
export async function getUserByClerkId(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = await prisma.user.findUnique({ where: { clerkId: id } });
    res.json(data);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

//TO ADD NEW USER TO DB IF FIRST TIME LOGGING INTO APP
export async function addUser(req: Request, res: Response) {
  try {
    const user = req.body;
    const clerkId = user.clerkId;
    const findUser = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });
    if (findUser === null) {
      const savedUser = await prisma.user.create(user);
      res.json(savedUser);
    }
    res.status(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
