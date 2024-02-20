import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const quests = await prisma.quest.findMany();
      res.status(200).json(quests);
    } catch (error) {
      console.error('Error fetching quests:', error);
      res.status(500).json({ message: 'Error fetching quests' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
