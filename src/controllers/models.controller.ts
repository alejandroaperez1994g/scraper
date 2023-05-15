import porscheModel from "../models/porsche.model";


export const getAllPorscheModels = async (req, res) => {
    try {
        const models = await porscheModel.find().lean().exec()
        res.status(200).send({models})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }

}


export const getPorscheModelById = async (req, res) => {
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
