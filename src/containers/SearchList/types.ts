export type ResponseType = {

    sussess: boolean,
    data: Array<{
        id: string,
        keyword: string,
        imgUrl: string,
        title: string,
        price: number,
        sales: number,
    }>,

}