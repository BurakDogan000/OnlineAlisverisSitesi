import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Product } from '../product/product';

@Injectable()
export class ProductService {
  path = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }

  getProducts(categoryID:number): Observable<Product[]> {
    console.log(categoryID)

    let newPath = this.path
    if(categoryID)
    {
        newPath +="?categoryID="+categoryID
    }
    return this.http.get<Product[]>(newPath).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<Product>(this.path, product).pipe(
      tap(data=> console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  handleError(err:HttpErrorResponse)
  {
    let errorMessage=""
    if(err.error instanceof ErrorEvent)
    {
      errorMessage = "Bir Hata Oluştu " + err.error.message
    }
    else
    {
      errorMessage = "Sistemsel bir hata oluştu"
    }
    
    return throwError(errorMessage)
  }

}
