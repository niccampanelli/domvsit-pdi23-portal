export interface IPaginationRequest {
    page?: number
    limit?: number
}

export interface ISortingRequest {
    sortField?: string
    sortOrder?: string
}

export interface IPaginatedResponse<T> {
    currentPage: number
    itemsCount: number
    data: T[]
    total: number
}