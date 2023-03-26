import puppeteer, {Browser} from "puppeteer";


export const scraperWithPuppeteer = async (url: string) => {
    try {
        const browser: Browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)

        const puppeteerData = await page.evaluate(() => {
            const htmlCard = Array.from(document.querySelectorAll(".m-14-model-tile"))
            console.log(htmlCard)
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