import {model, Schema, Model} from "mongoose"

export interface IPorsche {
    name: string
    image: string
    link_url: string
    model_series: string
    tech: ITech
}

interface ITech{
    price: String
    blueprints: string
    tech_specs: ITechSpecs[]
    sections: ISection[]
}

interface ITechSpecs {
    name: string
    value: string
}

interface ISection {
    name: String,
    title: String,
    media: String,
    gallery: IGallery
    description: string
}

interface IGallery{
    type: string[]
    required: boolean
}

const porscheSchema = new Schema<IPorsche, Model<IPorsche>>({
    name: String,
    image: String,
    link_url: String,
    model_series: String,
    tech: {
        price: String,
        blueprints: String,
        tech_specs: [
            {
                name: String,
                value: String
            }
        ],
        sections: [
            {
                name: String,
                title: String,
                media: String,
                gallery: {
                    type: [String],
                    required: false
                },
                description: String,
                //descriptionList: [String]
            }
        ]
    }
})


const porscheModel = model<IPorsche>("Porsche", porscheSchema)

export default porscheModel
