export type ResponseType = {
    sussess: boolean,
    data: {
        id: string,
        imgUrl: string,
        title: string,
        subtitle: string,
        price: number,
        sales: number,
        origin: string,
        specification: string,
        detail: string,
    },
}

export type CartResponseType = {
    sussess: boolean,
    data: {
        count: number,
    },
}
