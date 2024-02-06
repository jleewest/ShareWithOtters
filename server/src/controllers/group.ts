import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//TO CREATE A NEW GROUP
export async function postGroup(req: Request, res: Response) {
  try {
    const group = req.body;
    const saveGroup = await prisma.group.create({
      data: { title: group.title, description: group.description },
    });
    const findUserInGroup = await prisma.user_Group.findFirst({
      where: { userId: group.user, groupId: saveGroup.id },
    });
    if (findUserInGroup === null) {
      await prisma.user_Group.create({
        data: { userId: group.user, groupId: saveGroup.id },
      });
      res.status(201).json(saveGroup);
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

//TO EDIT A GROUP (by group id)
export async function editGroup(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updateGroup = await prisma.group.update({
      where: {
        id: id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.json(updateGroup);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}
