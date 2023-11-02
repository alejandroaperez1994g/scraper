interface Configuaration {
    development: ENV
}

interface ENV {
    app: APP,
}

interface APP {
    PORT: number | string
}


export default Configuaration
