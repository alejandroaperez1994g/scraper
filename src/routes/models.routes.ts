import {Router} from "express";
import {getAllPorscheModels, getPorscheModelById} from "../controllers/models.controller";


const porscheRouter = Router()


porscheRouter
    .get("/", getAllPorscheModels)
    .get("/:id", getPorscheModelById)


export default porscheRouter
