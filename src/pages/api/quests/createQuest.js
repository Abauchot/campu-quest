
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { Name, SerialQuest } = req.body;
  
      try {
        const quest = await prisma.quest.create({
          data: {
            name: Name,
            serialQuest: SerialQuest,
          },
        });
  
        res.status(200).json(quest);
      } catch (error) {
        console.error('Error creating quest:', error);
        res.status(500).json({ message: 'Error creating quest' });
      }
    } else {
      // Only POST method is allowed
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
