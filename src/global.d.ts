declare global {
  interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  }
  interface Folder {
    products?: Product[];
    _id: string
    name: string
    createdAt?: string
  }
  interface Product {
    _id: string
    name: string
    author: string
    type: string
    size: string
    path: string
    favourite?: boolean
  }
}

export { }
