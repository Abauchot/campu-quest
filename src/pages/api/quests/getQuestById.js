import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const quest = await prisma.quest.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(quest);
      console.log("Quest fetched successfully", quest);
    } catch (error) {
      console.error("Error fetching quest:", error);
      res.status(500).json({ message: "Error fetching quest" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method Not Allowed");
  }
}