import {Request, Response} from "express"
import axios from "axios"
import cheerio from "cheerio"

import {PorsheType} from "../models/porshe.model"
import {scraperWithPuppeteer} from "../utils/scraper.utils";


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

    }


}