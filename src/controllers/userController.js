import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../middleware/password.js";

const prisma = new PrismaClient();

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default {
  createUser,
};
