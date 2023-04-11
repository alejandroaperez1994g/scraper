import {Request, Response} from "express"
import axios from "axios"
import cheerio from "cheerio"

import {PorsheType} from "../interfaces/porsche.interface"
import {getModelsData, scraperWithPuppeteer} from "../utils/scraper.utils";
import porscheModel from "../models/porsche.model";

export const getPorsheModels = async (req: Request, res: Response) => {
    const {url} = req.body
    const porsheModel: PorsheType[] = []


    if (!url) res.status(400)

    try {
        const {data} = await axios.get(url)

        const $: cheerio.Root = cheerio.load(data);
        $(".m-14-model-tile-link-overview", data).each(function () {
                const modelImage = $(this).find("img").attr("data-image-src")
                const model = $(this).find("img").attr("alt");
                porsheModel.push({
                    model,
                    modelImage
                })
            }
        )
        res.status(200).send(porsheModel)
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }
}


export const getPorshes = async (req: Request, res: Response) => {
    const {url} = req.body

    if (!url) res.status(400)

    try {
        const allModelsData = await scraperWithPuppeteer(url)

        res.status(200).send(allModelsData)
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }
}
export const getPorshesWithData = async (req: Request, res: Response) => {
    const {url} = req.body

    if (!url) res.status(400)

    try {
        const allModelsData = await scraperWithPuppeteer(url)

        const newData = await Promise.all(
            allModelsData.slice(0, 11).map((model) => {
                // if(model.model_series === "718 Models") {
                return getModelsData(model.link_url).then(data => data)
                // }
            })
        );

        const combinedData = allModelsData.slice(0, newData.length).map((model, index) => {
            return {...model, tech: newData[index]}
        })

        // const fake = await getModelsData('https://www.porsche.com/usa/models/718/718-models/718-cayman-style-edition/')

        res.status(200).send(combinedData)
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }
}

export const getAllPorscheModels = async (req, res) => {
    try {
        const models = await porscheModel.find().lean().exec()
        res.status(200).send({models})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: e})
    }

}
