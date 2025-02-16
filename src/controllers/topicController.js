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

async function getTopics(req,res){
    
    try {
        const getAllTopics = await prisma.topic.findMany();
        res.status(200).json(getAllTopics);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await prisma.$disconnect(); // Fecha a conexão do Prisma corretamente
    }
    
}

async function getTopic(req,res){
    try {
        const id = parseInt(req.params.id);
        const getTopic = await prisma.topic.findMany({where:{id}});
        res.status(200).json(getTopic);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await prisma.$disconnect(); // Fecha a conexão do Prisma corretamente
    }
}

async function deleteTopic(req,res){
    try {
        const {id} = parseInt(req.params)
        const topicDelete = await prisma.topic.delete({where:{id:id}});
        req.status(200).json({
            message: "topic deleted successfully",
            topic: topicDelete
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server Error"});        
    } finally {
        await prisma.$disconnect();
    }
}

export default {
    createTopic,
    getTopics,
    getTopic,
    deleteTopic,
}