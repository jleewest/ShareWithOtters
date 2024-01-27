import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//TO GET ALL GROUPS THAT USER BELONGS TO (id = user clerk ID)
export async function getGroupsByClerkId(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = await prisma.user_Group.findMany({ where: { userId: id } });
    res.json(data);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

//TO ADD USER TO A GROUP (body=userID and groupID)
export async function addUserToGroup(req: Request, res: Response) {
  try {
    const userWithGroup = req.body;
    const saveUserToGroup = await prisma.user_Group.create(userWithGroup);
    res.json(saveUserToGroup);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

//TO REMOVE USER FROM A GROUP (pass in GroupId and ClerkId as parameters)
export async function deleteUserFromGroup(req: Request, res: Response) {
  try {
    const userWithGroup = req.body;
    const { GroupId, ClerkId } = userWithGroup;
    const deleteUserFromGroup = await prisma.user_Group.deleteMany({
      where: { groupId: GroupId, userId: ClerkId },
    });
    res.json({
      message: 'Group successfully deleted from User',
      deleteUserFromGroup,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
