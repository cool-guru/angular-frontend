import { baseAPIUrl } from '@/app/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {

  constructor(
    private http: HttpClient,
  ) { }

  create(payload: Folder): Observable<any> {
    return this.http.post(`${baseAPIUrl}/folders`, payload).pipe(
      catchError((error) => {
        console.error('Folder create failed:', error);
        throw error;
      })
    );
  }

  getFolders(page: number, limit: number): Observable<PaginatedResponse<Folder>> {
    return this.http.get<PaginatedResponse<Folder>>(`${baseAPIUrl}/folders?page=${page}&limit=${limit}`);
  }

  rename(id: string, value: string): Observable<any> {
    return this.http.put(`${baseAPIUrl}/folders/${id}`, { name: value }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseAPIUrl}/folders/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  
}
