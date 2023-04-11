import {Router} from "express";
import {getAllPorscheModels} from "../controllers/scraper.controller";


const scraperRouter = Router()


scraperRouter.get("/", getAllPorscheModels)


export default scraperRouter
