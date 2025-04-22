import { baseAPIUrl } from '@/app/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(
    private http: HttpClient,
  ) { }

  create(payload: any): Observable<any> {
    return this.http.post(`${baseAPIUrl}/products`, payload).pipe(
      catchError((error) => {
        console.error('Product create failed:', error);
        throw error;
      })
    );
  }

  getProducts(folderId: string, page: number, limit: number): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${baseAPIUrl}/products?fId=${folderId}&page=${page}&limit=${limit}`);
  }

  getRecentProducts(page: number, limit: number): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${baseAPIUrl}/products/recent?page=${page}&limit=${limit}`);
  }

  setFavourite(id: any, favourite: any): Observable<any> {
    return this.http.put(`${baseAPIUrl}/products/${id}`, { favourite: favourite }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  rename(id: string, value: string): Observable<any> {
    return this.http.put(`${baseAPIUrl}/products/${id}`, { name: value }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseAPIUrl}/products/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
