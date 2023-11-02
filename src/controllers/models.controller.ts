import {prisma} from "../db";
import type {Request, Response} from "express";

export const getAllPorscheModels = async (_: Request, res: Response) => {
    try {
        const models = await prisma.porsche.findMany()
        res.status(200).send({models})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }

}


export const getPorscheModelById = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!id) {
        res.status(400).send({msg: "Id is required"})
    }
    const model = await prisma.porsche.findUnique({
        where: {
            id: id
        }
    })
    // console.dir({model},{depth: Infinity})
    try {
        res.status(200).send({model})
    } catch (e) {
        res.status(500).send({msg: e})
    }


}


