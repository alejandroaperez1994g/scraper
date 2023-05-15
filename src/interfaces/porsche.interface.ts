export interface IPorscheDataFromScrapper {
    name: string,
    price: string,
    blueprints: string,
    tech_specs: IPorscheDataSpecs[],
    sections: IPorscheDataSections[]
}

interface IPorscheDataSpecs {
    name: string,
    value: string
}

interface IPorscheDataSections {
    name: string,
    title: string,
    gallery?: string[] | undefined
    media?: string | undefined,
    description?: string
}
