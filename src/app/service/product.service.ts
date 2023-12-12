import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Page, ProductState } from '../interface/appstates';
import { Product } from '../interface/product';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly server: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  products$ = (page: number = 0) =>
    <Observable<CustomHttpResponse<Page<Product> & User>>>(
      this.http
        .get<CustomHttpResponse<Page<Product> & User>>(`${this.server}/product/list?page=${page}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  newProduct$ = (product: Product) =>
    <Observable<CustomHttpResponse<ProductState>>>(
      this.http
        .post<CustomHttpResponse<ProductState>>(`${this.server}/product/create`, product)
        .pipe(tap(console.log), catchError(this.handleError))
    );

    searchProducts$ = (name: string = '', page: number = 0) =>
    <Observable<CustomHttpResponse<Page<Product> & User>>>(
      this.http
        .get<CustomHttpResponse<Page<Product> & User>>(`${this.server}/product/search?name=${name}&page=${page}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occured - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
      } else {
        errorMessage = `An error occured - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
