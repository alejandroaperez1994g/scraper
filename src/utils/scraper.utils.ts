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
                image: htmlElement.querySelector("img").getAttribute("data-image-src"),
                link_url: htmlElement.querySelector('.m-01-link').getAttribute("href")
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

                const puppeteerData = await page.evaluate(() => {

                    return {
                        price: document.querySelector(".m-364-module-headline--copy").textContent,
                        tech_specs:[
                            {
                                name: "Max Power",
                                value: document.querySelector(".m-364-module-specs").querySelectorAll(".m-364-module-specs-data--title")[0].textContent
                            }
                        ]
                    }
                })
                await browser.close()

                return puppeteerData

        }catch (e) {
            console.log(e)
        }

}