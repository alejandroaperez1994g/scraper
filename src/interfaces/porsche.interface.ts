export type PorsheType = {
    model?: string,
    modelImage?: string
    link_url?: string
}

export interface Porsche {
    id: number;
    name: string;
    image: string;
    link_url: string;
    model_series: ModelSeries;
    tech: Tech;
}

export type ModelSeries = string;

export interface Tech {
    price: Price;
    tech_specs: TechSpec[];
    sections: Section[];
}

export type Price = string;

export interface Section {
    name: SectionName;
    title?: Title;
    media?: string[] | string;
    description?: string;
}

export type SectionName =
    "Idea"
    | "Design"
    | "Performance"
    | "Comfort"
    | "Style Edition"
    | "Porsche Finder"
    | "Gallery";

export type Title =
    "The 718 Concept"
    | "Design"
    | "Performance"
    | "Comfort"
    | "718 Style Edition"
    | "Find your Porsche"
    | "Gallery";

export interface TechSpec {
    name: TechSpecName;
    value?: string;
}

export type TechSpecName = "Max Power" | "0-60 mph" | "Top track speed" | "Height" | "Width" | "Length" | "Wheelbase";
