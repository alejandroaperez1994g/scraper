export interface IPorsche718DataFromScrapper {
    name: string;
    price: string;
    blueprints: string;
    tech_specs: TechSpec[];
    sections: Section[]
}


export interface Section{
  name: string;
  title: string;
  media?: string | undefined;
  description?: string | undefined;
  gallery?: string[] | undefined;
}

export interface TechSpec {
    name: string;
    value: string;
}

