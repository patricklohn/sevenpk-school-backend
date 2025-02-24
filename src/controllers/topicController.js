import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTopic(req, res) {
  try {
    const { name, category, content } = req.body;
    const user = req.user?.id; // Pega o ID do usuário autenticado

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!name || !content || !category) {
      return res
        .status(400)
        .json({ message: "name, content, and category are required" });
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(category) },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (typeof content !== "string" || content.length > 5000) {
      return res
        .status(400)
        .json({ message: "Content cannot be longer than 5000 characters" });
    }

    const newTopic = await prisma.topic.create({
      data: {
        name,
        content,
        category: {
          connect: { id: Number(category) }, // Conecta à categoria existente
        },
        user: {
          connect: { id: Number(user) }, // Conecta ao usuário existente
        },
      },
    });

    res.status(201).json({
      message: "Topic created successfully",
      topic: newTopic,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getTopics(req, res) {
  try {
    const getAllTopics = await prisma.topic.findMany();
    res.status(200).json(getAllTopics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getTopic(req, res) {
  try {
    const id = parseInt(req.params.id);
    const getTopic = await prisma.topic.findMany({ where: { id } });
    res.status(200).json(getTopic);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteTopic(req, res) {
  try {
    const id = parseInt(req.params.id);
    const topicDelete = await prisma.topic.delete({ where: { id } });
    res.status(200).json({
      message: "topic deleted successfully",
      topic: topicDelete,
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTopic(req, res) {
  try {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const content = req.body.content;

    if (!name || !content) {
      return res.status(400).json({ message: "name and content are required" });
    }

    if (typeof content !== "string" || content.length > 5000) {
      return res
        .status(400)
        .json({ message: "Content cannot be longer than 5000 characters" });
    }

    const editTopic = await prisma.topic.update({
      where: { id: id },
      data: {
        name,
        content,
      },
    });

    res
      .status(200)
      .json({ message: "Topic updated successfully", topic: editTopic });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  createTopic,
  getTopics,
  getTopic,
  deleteTopic,
  updateTopic,
};
