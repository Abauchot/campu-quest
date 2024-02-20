import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
	if (req.method === 'GET') {
		try {
			const quests = await prisma.quest.findMany();
			res.status(200).json(quests);
		} catch (error) {
			console.error('Failed to retrieve quest:', error);
			res.status(500).json({ message: 'Failed to retrieve quest' });
		}
	} else {
		res.setHeader('Allow', [ 'GET' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}