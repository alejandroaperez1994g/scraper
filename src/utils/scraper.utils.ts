import puppeteer, {Browser} from "puppeteer";


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

export const getModelsData = async (link: string) => {

        try{
                const browser: Browser = await puppeteer.launch()
                const page = await browser.newPage()
                await page.goto(link)
                await page.click(".m-464-tech-specs")

                const puppeteerData = await page.evaluate(() => {

                    return {
                        price: document?.querySelector(".m-364-module-headline--copy").textContent,
                        // blueprints: document.getElementById("techspecs")?.querySelector(".m-309-image").innerHTML.replace(/"/g, "'"),
                        tech_specs:[
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
                        sections:[
                            {
                                name: "Idea",
                                title:document.getElementById("idea")?.getAttribute("data-m-02-cn-anchor"),
                                media: JSON.parse(document.getElementById("idea")?.
                               querySelector(".ce-video-player")?.
                                getAttribute("data-model")).sources[0].src,
                                description: document?.querySelector(".m-084-info__copy").textContent
                            },
                            {
                                name: "Design",
                                title:document.getElementById("design")?.getAttribute("data-m-02-cn-anchor"),
                                media: JSON.parse(document.getElementById("design")?.
                               querySelector(".ce-video-player").
                                getAttribute("data-model")).sources[0].src,
                                description: document?.querySelector(".m-308-content__copy").textContent
                            },
                            {
                                name: "Performance",
                                title:document.getElementById("performance")?.getAttribute("data-m-02-cn-anchor"),
                                media: JSON.parse(document.getElementById("performance")?.
                               querySelector(".ce-video-player")?.
                                getAttribute("data-model")).sources[0].src,
                                description: document?.querySelector("#performance")?.
                               querySelector(".m-308-content__copy").textContent
                            },
                            {
                                name: "Comfort",
                                title:document.getElementById("comfort")?.getAttribute("data-m-02-cn-anchor"),
                                media: JSON.parse(document.getElementById("comfort")?.
                                querySelector(".ce-video-player").
                                getAttribute("data-model")).sources[0].src,
                                description: document?.querySelector("#comfort")?.
                                querySelector(".m-308-content__copy").textContent
                            },
                            {
                                name: "Style Edition",
                                title:document.getElementById("style_edition")?.getAttribute("data-m-02-cn-anchor"),
                                media: JSON.parse(document.getElementById("style_edition").
                                querySelector(".ce-video-player")?.
                                getAttribute("data-model")).sources[0].src,
                                description: document?.querySelector("#style_edition")?.
                                querySelector(".m-308-content__copy").textContent
                            },
                            {
                                name: "Porsche Finder",
                                title:document.getElementById("PorscheFinder")?.getAttribute("data-m-02-cn-anchor"),
                                media: document.getElementById("PorscheFinder")?.querySelector(".m-084-content img").getAttribute("data-image-src"),
                                description: document?.querySelector("#style_edition")?.
                               querySelector(".m-308-content__copy").textContent
                            },
                            {
                                name: "Gallery",
                                title:document.getElementById("gallery")?.getAttribute("data-m-02-cn-anchor"),
                                media: Array.from(document.getElementById("gallery")?.querySelectorAll(".m-39-gi-image")).
                                map((div)=> div?.getAttribute("data-src")),
                            },
                        ]
                    }
                })
                await browser.close()

                return puppeteerData

        }catch (e) {
            console.log(e)
        }

}