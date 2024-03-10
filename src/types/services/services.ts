export interface IPaginationRequest {
    page?: number
    limit?: number
}

export interface ISortingRequest<T> {
    sortField?: T
    sortOrder?: string
}

export interface IPaginatedResponse<T> {
    currentPage: number
    itemsCount: number
    data: T[]
    total: number
}