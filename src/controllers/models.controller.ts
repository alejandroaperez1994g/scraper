import porscheModel, {IPorsche} from "../models/porsche.model";
import {Request, Response} from "express";


export const getAllPorscheModels = async (req: Request, res: Response) => {
    try {
        const models = await porscheModel.find().lean().exec()
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
    try {
        const model = await porscheModel.findById(id).lean().exec()
        res.status(200).send({model})
    } catch (e) {
        res.status(500).send({msg: e})
    }

}


export const createPorsche = async (req: Request, res: Response) => {
    const data: IPorsche = req.body

    try {

        const newPorsche = await porscheModel.create({
            name: data.name,
            image: data.image
        })

        res.status(201).send({newPorsche})

    } catch (error) {
        res.status(500).send({msg: error})
    }
}

