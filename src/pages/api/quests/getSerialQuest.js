import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const quests = await prisma.quest.findMany({
                select: {
                    serialQuest: true, // Sélectionne uniquement le champ SerialQuest
                },
            });
            if (quests.length > 0) {
                res.status(200).json(quests);
                console.log("Quests fetched successfully", quests);
            } else {
                res.status(404).json({ message: "No quests found" });
            }
        } catch (error) {
            console.error("Error fetching quests:", error);
            res.status(500).json({ message: "Error fetching quests", error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end("Method Not Allowed");
    }
}
