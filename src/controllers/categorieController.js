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

async function getAll(req, res) {
  try {
    const category = await prisma.category.findMany();
    res.json(category);
  } catch (error) {
    console.error(error);
  }
}

async function updateCategory(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    const categoryUpdate = await prisma.category.update({
      where: { id },
      data: { title },
    });
    res.json({
      message: "Category updated successfully",
      category: categoryUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteCategory(req, res) {
  try {
    const id = parseInt(req.params.id);

    const categoryDelete = await prisma.category.delete({
      where: { id },
    });

    // if (!id) {
    //   return res.status(404).json({ message: "Category not found" });
    // }

    // if (isNaN(id)) {
    //   return res.status(404).json({ message: "Invalid ID" });
    // }

    
    res.json({
      message: "Category deleted successfully",
      category: categoryDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default {
  createCategorie,
  getAll,
  updateCategory,
  deleteCategory,
};
