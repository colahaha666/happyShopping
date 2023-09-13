export type ResponseType = {
    sussess: boolean,
    data: ProductReponseType
}

export type ProductReponseType = {
    shopId: string,
    shopName: string,
    cardList: Array<{
        productId: string,
        imgUrl: string,
        weight: string
        title: string,
        price: number,
        count: number
    }>
}