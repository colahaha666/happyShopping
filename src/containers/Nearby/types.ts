export type ResponseType = {
    success: string,
    data: Array<{
        id: string,
        name: string,
        phone: string,
        adderss: string,
        distance: string,
        latitude: string,
        longitude: string,
    }>
}