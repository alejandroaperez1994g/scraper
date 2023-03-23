import { Router } from "express";
import { getPorsheModels } from "../controllers/scraper.controller";


const scraperRouter = Router()


scraperRouter.post("/scraper",getPorsheModels)
scraperRouter.get("/",(req,res)=>{
    res.send("Todo OK")
})







export default scraperRouter