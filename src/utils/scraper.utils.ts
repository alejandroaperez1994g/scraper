import puppeteer, {Browser} from "puppeteer";
import * as fs from "fs";
import porscheModel from "../models/porsche.model";
import {IPorscheDataFromScrapper} from "../interfaces/porsche.interface";


export const scraperWithPuppeteer = async (url: string) => {
    try {
        const browser: Browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)

        const puppeteerData = await page.evaluate(() => {
            const htmlCard = Array.from(document.querySelectorAll(".m-14-model-tile"))
            return htmlCard.map((htmlElement: Element, index: number) => ({
                id: index,
                name: htmlElement.querySelector(".m-14-model-name").textContent,
                image: htmlElement.querySelector("img")?.getAttribute("data-image-src"),
                link_url: htmlElement.querySelector('.m-01-link')?.getAttribute("href"),
                model_series: htmlElement.parentElement.querySelector("h3").textContent
            }))
        })
        await browser.close()

        return puppeteerData
    } catch (e) {
        console.log(e)
    }
}

export const get718ModelsData = async (link: string,): Promise<IPorscheDataFromScrapper> => {

    try {
        const browser: Browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(link)
        await page.click(".m-464-tech-specs")

        const puppeteerData = await page.evaluate(() => {

            return {
                name: document?.querySelector(".m-364-module-headline--title").textContent,
                price: document?.querySelector(".m-364-module-headline--copy").textContent,
                blueprints: document.getElementById("techspecs")?.querySelector(".m-309-image").innerHTML.replace(/"/g, "'"),
                tech_specs: [
                    {
                        name: "Max Power",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[0].textContent
                    },
                    {
                        name: "0-60 mph",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[1].textContent
                    },
                    {
                        name: "Top track speed",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[2].textContent
                    },
                    {
                        name: "Height",
                        value: document?.querySelector(".m-309-car-data--height")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Width",
                        value: document?.querySelector(".m-309-car-data--width")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Length",
                        value: document?.querySelector(".m-309-car-data--length")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Wheelbase",
                        value: document?.querySelector(".m-309-car-data--wheelbase")?.querySelector(".m-309-car-data__value").textContent
                    },
                ],
                sections: [
                    {
                        name: "Idea",
                        title: document.getElementById("idea")?.getAttribute("data-m-02-cn-anchor"),
                        media: JSON.parse(document.getElementById("idea")?.querySelector(".ce-video-player")?.getAttribute("data-model")).sources[0].src,
                        description: document?.querySelector(".m-084-info__copy").textContent
                    },
                    {
                        name: "Design",
                        title: document.getElementById("design")?.getAttribute("data-m-02-cn-anchor"),
                        media: JSON.parse(document.getElementById("design")?.querySelector(".ce-video-player").getAttribute("data-model")).sources[0].src,
                        description: document?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Performance",
                        title: document.getElementById("performance")?.getAttribute("data-m-02-cn-anchor"),
                        media: JSON.parse(document.getElementById("performance")?.querySelector(".ce-video-player")?.getAttribute("data-model")).sources[0].src,
                        description: document?.querySelector("#performance")?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Comfort",
                        title: document.getElementById("comfort")?.getAttribute("data-m-02-cn-anchor"),
                        media: JSON.parse(document.getElementById("comfort")?.querySelector(".ce-video-player").getAttribute("data-model")).sources[0].src,
                        description: document?.querySelector("#comfort")?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Style Edition",
                        title: document.getElementById("style_edition")?.getAttribute("data-m-02-cn-anchor"),
                        media: JSON.parse(document.getElementById("style_edition").querySelector(".ce-video-player")?.getAttribute("data-model")).sources[0].src,
                        description: document?.querySelector("#style_edition")?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Porsche Finder",
                        title: document.getElementById("PorscheFinder")?.getAttribute("data-m-02-cn-anchor") as string,
                        media: document.getElementById("PorscheFinder")?.querySelector(".m-084-content img").getAttribute("data-image-src"),
                        description: document?.querySelector("#style_edition")?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Gallery",
                        title: document.getElementById("gallery")?.getAttribute("data-m-02-cn-anchor"),
                        gallery: Array.from(document.getElementById("gallery")?.querySelectorAll(".m-39-gi-image")).map((div) => div?.getAttribute("data-src")),
                    },
                ]
            }
        })
        await browser.close()

        return puppeteerData

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }

}

const get911CarreraModelsData = async (link: string,) => {

    try {
        const browser: Browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(link)
        await page.click(".m-464-tech-specs")

        const puppeteerData = await page.evaluate(() => {

            return {
                name: document?.querySelector(".m-364-module-headline--title").textContent,
                price: document?.querySelector(".m-364-module-headline--copy").textContent,
                blueprints: document.getElementById("techspecs")?.querySelector(".m-309-image").innerHTML.replace(/"/g, "'"),
                tech_specs: [
                    {
                        name: "Max Power",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[0].textContent
                    },
                    {
                        name: "0-60 mph",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[1].textContent
                    },
                    {
                        name: "Top track speed",
                        value: document?.querySelector(".m-364-module-specs")?.querySelectorAll(".m-364-module-specs-data--title")[2].textContent
                    },
                    {
                        name: "Height",
                        value: document?.querySelector(".m-309-car-data--height")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Width",
                        value: document?.querySelector(".m-309-car-data--width")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Length",
                        value: document?.querySelector(".m-309-car-data--length")?.querySelector(".m-309-car-data__value").textContent
                    },
                    {
                        name: "Wheelbase",
                        value: document?.querySelector(".m-309-car-data--wheelbase")?.querySelector(".m-309-car-data__value").textContent
                    },
                ],
                sections: [
                    {
                        name: "Idea",
                        title: document?.getElementById("911_t_highlights").nextElementSibling?.querySelector(".m-084-info__title")?.textContent,
                        media: JSON.parse(document?.getElementById("911_t_highlights")?.nextElementSibling?.querySelector(".ce-video-player")?.getAttribute("data-model")).sources[0].src,
                        description: document?.getElementById("911_t_highlights")?.nextElementSibling?.querySelector(".m-084-info__copy").textContent
                    },
                    {
                        name: "Exterior",
                        media: document?.getElementById("container1modelseries-911carrera992")?.previousElementSibling.querySelector("img").getAttribute("src"),
                        description: document?.getElementById("container1modelseries-911carrera992").querySelector(".m-308-content__headline").textContent
                    },
                    {
                        name: "Performance",
                        title: document.getElementById("container3modelseries-911carrera992")?.querySelector(".m-308-content__headline")?.textContent,
                        media: JSON.parse(document.getElementById("container3modelseries-911carrera992")?.previousElementSibling?.querySelector(".ce-video-player")?.getAttribute("data-model")).sources[0].src,
                        descriptionList: Array.from(document.getElementById("container3modelseries-911carrera992")?.querySelector(".ce-list-data").querySelectorAll("li")).map((li) => li.textContent)
                    },

                    {
                        name: "Porsche Finder",
                        title: document.getElementById("PorscheFinder")?.getAttribute("data-m-02-cn-anchor"),
                        media: document.getElementById("PorscheFinder")?.querySelector(".m-084-content img").getAttribute("data-image-src"),
                        description: document?.querySelector("#style_edition")?.querySelector(".m-308-content__copy").textContent
                    },
                    {
                        name: "Gallery",
                        title: document.getElementById("gallery")?.getAttribute("data-m-02-cn-anchor"),
                        gallery: Array.from(document.getElementById("gallery")?.querySelectorAll(".m-39-gi-image")).map((div) => div?.getAttribute("data-src")),
                    },
                ]
            }
        })
        await browser.close()

        return puppeteerData

    } catch (e) {
        console.log(e)
    }

}


const getTechData = async (data) => {
    return await Promise.all(
        data.map((model) => {
            if (model.model_series === "718 Models") {
                return get718ModelsData(model.link_url).then(data => data)
            } else {
                return
            }
            // } else if (model.model_series === "911 Carrera & Targa Models") {
            //     return get911CarreraModelsData(model.link_url).then(data => data)
            // }
        })
    );
}

const getAndCombineData = async () => {
    const url = "https://www.porsche.com/usa/models/"
    const allModelsData = await scraperWithPuppeteer(url)

    // const newData = await Promise.all(
    //     allModelsData.slice(0, 11).map((model) => {
    //         // if(model.model_series === "718 Models") {
    //         return getModelsData(model.link_url).then(data => data)
    //         // }
    //     })
    // );
    const newData = await getTechData(allModelsData)
    //const test = removeUndefined(newData)


    return combineTechDataWithModelData(allModelsData, newData)
}

const removeUndefined = (techData) => {
    return techData.map(object => {
        const filterObject = {};
        for (let key in object) {
            if (object[key] !== undefined) {
                filterObject[key] = object[key];
            }
        }
        return filterObject;
    }).filter(object => Object.keys(object).length !== 0);
}


const combineTechDataWithModelData = (dataModels, techData) => {
    return dataModels.map((model, index) => {
        if (techData[index] !== undefined) {
            return {...model, tech: techData[index]}
        } else {
            return
        }
    })
}

export const seedDataInMongoDB = async () => {
    try {
        const porscheModels = await getAndCombineData()
        const filteredData = porscheModels.filter((model) => model?.tech !== undefined)
        await porscheModel.insertMany(filteredData)
        console.log("Data of porsche models inserted in MongoDB")

    } catch (e) {
        console.log(e)
    }

}

const saveDataInJsonFile = async (data) => {
    const json = JSON.stringify(data)
    fs.writeFile('porscheModels.json', json, 'utf8', () => {
        console.log("Data of porsche models saved in json file")

    })
}

