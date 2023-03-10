export type ResponseId = {
    id: string | number;
}

export type ResponseCode = {
    code: string;
}

export type Pageable = {
    page?: number;
    size?: number;
}

export type PageResponse<T> = {
    content: T[],
    page?: number;
    size?: number;
    totalPages?: number;
}