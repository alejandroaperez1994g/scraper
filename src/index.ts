import express from "express"
import morgan from 'morgan'
import axios from "axios"
import cheerio from "cheerio"


const app = express()
const PORT = 4000

type PorsheType = {
    model?: string,
    modelImage?: string
}


app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Todo Ok")
})

app.post("/scrapper", async (req, res) => {
    const {url} = req.body
    const porsheModel:PorsheType[] = []

    try {
        const {data} = await axios.get(url)

        const $ = cheerio.load(data)
        $(".m-14-model-tile-link-overview", data).each(function(){
            const modelImage = $(this).find("img").attr("data-image-src")
            const model = $(this).find("img").attr("alt")
            porsheModel.push({
                model,
                modelImage
            })
        }
        )
    } catch (e) {
        console.log(e)
    }

    res.status(200).send(porsheModel)

})

app.listen(PORT, () => {
    console.log("Server is running")
})