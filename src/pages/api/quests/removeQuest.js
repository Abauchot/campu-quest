import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Assuming the ID is sent as a query parameter

    try {
      const quest = await prisma.quest.delete({
        where: {
          id: Number(id), // Ensure the id is a number if your ID field is numeric
        },
      });
      res.status(200).json({ message: 'Quest deleted successfully', quest });
    } catch (error) {
      console.error('Error deleting quest:', error);
      res.status(500).json({ message: 'Error deleting quest' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end('Method Not Allowed');
  }
}
