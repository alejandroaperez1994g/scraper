interface Configuaration {
development: ENV
}

interface ENV {
    app: APP,
    db: DB
}

interface APP {
    PORT: number | string
}

interface DB{
    uri: string
}


export default Configuaration
