import {model, Schema} from "mongoose"


const porscheSchema = new Schema({
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


const porscheModel = model("Porsche", porscheSchema)

export default porscheModel
