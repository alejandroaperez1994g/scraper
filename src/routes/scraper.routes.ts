import {Router} from "express";
import {getPorsheModels, getPorshes} from "../controllers/scraper.controller";


const scraperRouter = Router()


scraperRouter.get("/", (req, res) => {
    res.send("Todo OK")
})
    .post("/scraper", getPorsheModels)
    .post("/scraper2", getPorshes)


export default scraperRouter
