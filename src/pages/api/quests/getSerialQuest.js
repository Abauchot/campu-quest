import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { serialQuest } = req.query;
    
        try {
            const quest = await prisma.quest.findUnique({
                where: {
                    SerialQuest: serialQuest, 
                },
            });
            if (quest) {
                res.status(200).json(quest);
                console.log("Quest fetched successfully", quest);
            } else {
                res.status(404).json({ message: "Quest not found" });
            }
        } catch (error) {
            console.error("Error fetching quest:", error);
            res.status(500).json({ message: "Error fetching quest" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end("Method Not Allowed");
    }
}