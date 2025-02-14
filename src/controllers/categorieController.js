import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategorie(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newCategory = await prisma.category.create({
      data: { title },
    });

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default {
  createCategorie,
};
