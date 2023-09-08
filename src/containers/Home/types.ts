export type ResponseType = {
    success: string,
    data: {
        location: {
            id: string,
            address: string
        },
        banners: Array<{
            id: "1135",
            url: string
        }>,
        categories: Array<{
            id: string,
            name: string,
            imgUrl: string
        }>,
        freshes: Array<{
            id: string,
            name: string,
            imgUrl: string
            price: string
        }>,
    }
}