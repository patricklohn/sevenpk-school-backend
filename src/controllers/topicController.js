import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTopic(req,res){
    try {

        const {name} = req.body;
        const content = req.body.content;

        if(!name || !content){
            return res.status(400).json({ message: "name and content are required" });
        }

        if(content.length > 5000){
            return res.status(400).json({ message: "Content cannot be longer than 5000 characters" });
        }

        const newTopic = await prisma.topic.create({
            data: {
                name,
                content: content
            }
        })

        res.status(201).json({
            message: "Topic created successfully",
            category: newTopic,
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await prisma.$disconnect(); // Fecha a conexão do Prisma corretamente
    }
}

export default {
    createTopic
}